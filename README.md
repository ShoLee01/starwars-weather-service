# ms-starwars-weather

API Serverless en AWS Lambda que combina datos de la API de Star Wars (SWAPI) con datos meteorológicos de WeatherAPI, usando NestJS y Clean Architecture.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Flujo principal](#flujo-principal)
- [Requisitos previos](#requisitos-previos)
- [Instalación y despliegue](#instalación-y-despliegue)
- [Configuración de entorno](#configuración-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
  - [Autenticación](#autenticación)
  - [GET /fusionados](#get-fusionados)
  - [POST /almacenar](#post-almacenar)
  - [GET /historial](#get-historial)
  - [Documentación Swagger](#documentación-swagger)
- [Caché con DynamoDB TTL](#caché-con-dynamodb-ttl)
- [Autenticación JWT](#autenticación-jwt)
- [Rate limiting](#rate-limiting)
- [Variables de entorno](#variables-de-entorno)
- [Licencia](#licencia)

---

## Descripción

Esta API RESTful se implementa en AWS Lambda usando Serverless Framework. Integra:

- **SWAPI** (https://swapi.dev/) para datos de planetas.
- **WeatherAPI** (https://api.weatherapi.com/) para datos meteorológicos.
- **DynamoDB** como caché de 30 minutos y almacenamiento de historial.
- **JWT** para proteger endpoints sensibles.
- **Rate limiting** para evitar abusos.
- **Swagger** para documentación interactiva.

---

## Arquitectura

Se adopta la **Clean Architecture** con capas desacopladas:

```
Controllers -> Use Cases / Servicios de dominio -> Entidades / DTOs -> Infraestructura (DynamoDB, HttpClient)
```

- **Controllers**: reciben peticiones HTTP, validan con DTOs y llaman a los casos de uso.
- **Use Cases**: orquestan la lógica de negocio (cacheo, llamadas externas, fusión, almacenamiento).
- **Entidades / DTOs**: representan modelos de datos y validaciones (class-validator, class-transformer).
- **Infraestructura**:
  - `HttpClientService` para SWAPI y WeatherAPI.
  - `StorageService` con DynamoDBDocumentClient (TTL 30 min).
  - `JwtAuthGuard` y `ThrottlerGuard`.

---

## Flujo principal

1. Cliente -> `GET /api/v1/fusionados`
2. JWT Guard valida el token.
3. Throttler Guard comprueba rate limiting (2 llamadas cada 20 s).
4. Controller invoca `FusionUseCases.getFusion()`.
5. Use Case:
   - `StorageService.getPlanetCached(id)`: si existe y no expiró, devuelve caché.
   - Si no, llama a `PlanetService.findPlanet(id)` y `WeatherService.getByCoords(...)`.
   - Normaliza datos mediante DTOs y class-transformer.
   - `StorageService.savePlanet(id, fusion)`: guarda en DynamoDB con TTL 30 min.
   - `StorageService.createFusion(...)`: registra en tabla de historial.
6. Controller devuelve objeto `Fusion`.

---

## Requisitos previos

- Node.js v20
- AWS CLI configurada (opcional local)
- Cuenta AWS con permisos para Lambda y DynamoDB
- Serverless Framework CLI (v4)

---

## Instalación y despliegue

```bash
git clone <url-del-repo>
cd ms-starwars-weather
npm ci
npm run build
npx serverless deploy --stage dev
```

URL base de la API:

```
https://2xa1igtkdb.execute-api.us-east-1.amazonaws.com/api/v1
```

---

## Configuración de entorno

El archivo `src/config/configuration.ts` utiliza variables:

```ts
export default () => ({
  swapi: { baseUrl: process.env.SWAPI_BASE_URL! },
  weather: {
    baseUrl: process.env.WEATHER_API_URL!,
    apiKey: process.env.WEATHER_API_KEY!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!,
  },
  aws: { region: process.env.AWS_REGION! },
});
```

| Variable            | Descripción                                    |
|---------------------|------------------------------------------------|
| SWAPI_BASE_URL      | `http://swapi.dev/api`                         |
| WEATHER_API_URL     | `https://api.weatherapi.com/v1/`               |
| WEATHER_API_KEY     | Clave de WeatherAPI                            |
| JWT_SECRET          | Secreto para JWT                               |
| JWT_EXPIRES_IN      | Expiración de token (e.g. `1d`)                |
| AWS_REGION          | Región AWS (e.g. `us-east-1`)                  |
| PLANET_CACHE_TABLE  | Nombre de tabla DynamoDB para caché de planetas|
| FUSION_CACHE_TABLE  | Nombre de tabla para historial de fusiones     |
| CUSTOM_TABLE_NAME   | Nombre de tabla para datos personalizados      |
| USER_CACHE_TABLE    | Nombre de tabla para usuarios                  |

---

## Estructura del proyecto

```
src/
   config/
   controllers/
   core/
     dtos/
     entities/
   frameworks/
     dynamodb-service/
   security/
   services/
   shared/
   user-cases/
   utils/
   app.module.ts
   handler.ts
   main.ts
```

---

## Endpoints

### Autenticación

- **POST** `/api/v1/auth/register`
- **POST** `/api/v1/auth`

### GET /fusionados

Protegido con JWT y rate limiting (5 llamadas/20 s).

**Ejemplo**:
```
GET /api/v1/fusionados
```
**Respuesta**:
```json
{
  "planet": { /* PlanetResultDto */ },
  "weather": { /* NormalizedCurrentDto */ },
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

### POST /almacenar

**Ejemplo**:
```json
POST /api/v1/almacenar
{
  "data": {...}
}
```
**Respuesta**:
```json
{ "message":"Guardado correctamente" }
```

### GET /historial

**Ejemplo**:
```
GET /api/v1/historial?page=1&limit=10
```
**Respuesta**:
```json
{
  "items":[ /* Fusion[] */ ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

### Documentación Swagger

`https://2xa1igtkdb.execute-api.us-east-1.amazonaws.com/api/v1/docs`

---

## Caché con DynamoDB TTL

- TTL 30 minutos en tabla de planetas.
- `marshallOptions`: `convertClassInstanceToMap`, `removeUndefinedValues`.

---

## Autenticación JWT

- Implementada con Passport JWT.
- Guard global `JwtAuthGuard`.

---

## Rate limiting

- `@nestjs/throttler` (2 peticiones/20 s).
- Mensaje: Límite alcanzado: espera 20 segundos antes de reintentar.
---

## Licencia

MIT License
