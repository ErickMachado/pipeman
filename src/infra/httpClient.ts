import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.pipefy.com",
  headers: {
    authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxMDM5NjMsImVtYWlsIjoiZXJpY2subWFjaGFkb0B0ZXJyYW1hZ25hLmNvbS5iciIsImFwcGxpY2F0aW9uIjozMDAxODYyNDh9fQ.6WHPV-yOXf9R4AQS4rlwMUmsbb8Ao513C5-xTKVgNN2kCMCoqLwZCeDXkSmYacV7otICqC9-MloPSRRlJHT3Dg",
  },
});
