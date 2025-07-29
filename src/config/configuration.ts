export default () => ({
  swapi: {
    baseUrl: process.env.SWAPI_BASE_URL!,
  },
  weather: {
    baseUrl: process.env.WEATHER_API_URL!,
    apiKey: process.env.WEATHER_API_KEY!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!,
  },
  aws: {
    region: process.env.AWS_REGION!,
  }
});