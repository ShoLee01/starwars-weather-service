import { Injectable } from '@nestjs/common';

interface Coords { lat: number; lon: number; }

@Injectable()
export class PlanetLocationService {
  private readonly map: Record<string, Coords> = {
    "Tatooine":       { lat: 34.020882,  lon:  -6.841650 },   // Rabat, Marruecos
    "Alderaan":       { lat: 46.948090,  lon:   7.447440 },   // Berna, Suiza
    "Yavin IV":       { lat:-15.826691,  lon: -47.921820 },   // Brasilia, Brasil
    "Hoth":           { lat:-34.603722,  lon: -58.381592 },   // Buenos Aires, Argentina
    "Dagobah":        { lat:   6.927079,  lon:  79.861244 },   // Colombo, Sri Lanka
    "Bespin":         { lat:-16.489689,  lon: -68.119294 },   // La Paz, Bolivia
    "Endor":          { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Naboo":          { lat:  51.507351,  lon:  -0.127758 },   // Londres, Reino Unido
    "Coruscant":      { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Kamino":         { lat:   4.175496,  lon:  73.509347 },   // Malé, Maldivas
    "Geonosis":       { lat:  31.945363,  lon:  35.928371 },   // Amman, Jordania
    "Utapau":         { lat:  -6.162000,  lon:  35.751600 },   // Dodoma, Tanzania
    "Mustafar":       { lat:  41.902783,  lon:  12.496366 },   // Roma, Italia
    "Kashyyyk":       { lat: -35.280937,  lon: 149.130009 },   // Canberra, Australia
    "Polis Massa":    { lat: -33.448891,  lon: -70.669266 },   // Santiago, Chile
    "Mygeeto":        { lat:  64.183471,  lon: -51.721570 },   // Nuuk, Groenlandia
    "Felucia":        { lat:  -6.208763,  lon: 106.845599 },   // Yakarta, Indonesia
    "Cato Neimoidia": { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Saleucami":      { lat:  39.933400,  lon:  32.859700 },   // Ankara, Turquía
    "Stewjon":        { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Eriadu":         { lat:  39.904202,  lon: 116.407394 },   // Pekín, China
    "Corellia":       { lat:  35.689487,  lon: 139.691711 },   // Tokio, Japón
    "Rodia":          { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Nal Hutta":      { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Dantooine":      { lat:  -1.292066,  lon:  36.821945 },   // Nairobi, Kenia
    "Bestine IV":     { lat:  37.983810,  lon:  23.727539 },   // Atenas, Grecia
    "Ord Mantell":    { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "unknown":        { lat:   5.603717,  lon:  -0.186964 },   // Acra, Ghana (placeholder)
    "Trandosha":      { lat:  40.416775,  lon:  -3.703790 },   // Madrid, España
    "Socorro":        { lat:  19.432608,  lon: -99.133209 },   // Ciudad de México, México
    "Mon Cala":       { lat: -35.280937,  lon: 149.130009 },   // Canberra, Australia
    "Chandrila":      { lat:  52.520008,  lon:  13.404954 },   // Berlín, Alemania
    "Sullust":        { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Toydaria":       { lat: -24.628208,  lon:  25.923147 },   // Gaborone, Botswana
    "Malastare":      { lat: -18.879190,  lon:  47.507905 },   // Antananarivo, Madagascar
    "Dathomir":       { lat:  -1.292066,  lon:  36.821945 },   // Nairobi, Kenia
    "Ryloth":         { lat:  27.717245,  lon:  85.323960 },   // Katmandú, Nepal
    "Aleen Minor":    { lat:  35.898908,  lon:  14.514553 },   // La Valeta, Malta
    "Vulpter":        { lat:  24.453884,  lon:  54.377343 },   // Abu Dabi, EAU
    "Troiken":        { lat: -33.448891,  lon: -70.669266 },   // Santiago, Chile
    "Tund":           { lat:  14.599512,  lon: 120.984222 },   // Manila, Filipinas
    "Haruun Kal":     { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Cerea":          { lat:  41.902783,  lon:  12.496366 },   // Roma, Italia
    "Glee Anselm":    { lat:  60.169857,  lon:  24.938379 },   // Helsinki, Finlandia
    "Iridonia":       { lat:   9.005401,  lon:  38.763611 },   // Adís Abeba, Etiopía
    "Tholoth":        { lat:  46.948090,  lon:   7.447440 },   // Berna, Suiza
    "Iktotch":        { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Quermia":        { lat:   5.603717,  lon:  -0.186964 },   // Acra, Ghana
    "Dorin":          { lat:  -1.292066,  lon:  36.821945 },   // Nairobi, Kenia
    "Champala":       { lat:   0.347596,  lon:  32.582520 },   // Kampala, Uganda
    "Mirial":         { lat:  24.713551,  lon:  46.675296 },   // Riad, Arabia Saudí
    "Serenno":        { lat:  -4.441931,  lon:  15.266293 },   // Kinshasa, R.D. C.
    "Concord Dawn":   { lat:-15.826691,  lon: -47.921820 },   // Brasilia, Brasil
    "Zolan":          { lat:  46.948090,  lon:   7.447440 },   // Berna, Suiza
    "Ojom":           { lat:  59.913868,  lon:  10.752245 },   // Oslo, Noruega
    "Skako":          { lat:   1.352083,  lon: 103.819836 },   // Singapur
    "Muunilinst":     { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
    "Shili":          { lat:  -6.792353,  lon:  39.208328 },   // Dar es Salaam, Tanzania
    "Kalee":          { lat:   9.928069,  lon: -84.090725 },   // San José, Costa Rica
    "Umbara":         { lat:  38.907192,  lon: -77.036871 },   // Washington D.C., EE. UU.
  };


  getCoords(planetName: string): Coords | null {
    return this.map[planetName] || null;
  }
}