// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest", // Transpile JavaScript files using Babel
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Ignore everything in node_modules except axios
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Optional: Handle CSS imports
  },
  testEnvironment: "jsdom", // Use jsdom environment for testing React components

  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
