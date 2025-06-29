// src/config.ts
const getApiBaseUrl = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000";
  }

  // Exemple : domaine de prod (à adapter)
  return "https://api.aromessentielles.fr";
};

export const API_BASE_URL = getApiBaseUrl();
