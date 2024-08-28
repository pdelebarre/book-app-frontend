// src/react-app-env.d.ts

/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_BASE_URL: string;
    REACT_APP_API_PORT: string;
    // Add other environment variables here if needed
  }
}
