module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
