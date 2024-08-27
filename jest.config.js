// jest.config.js
module.exports = {
  preset: "ts-jest", // If you're using TypeScript
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transpile JavaScript files using Babel
    "^.+\\.tsx?$": "ts-jest", // Transpile TypeScript files using ts-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Ignore everything in node_modules except axios
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Optional: Handle CSS imports
  },
  testEnvironment: "jsdom", // Use jsdom environment for testing React components
};
