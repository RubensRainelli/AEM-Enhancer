const path = require("path");

module.exports = {
  entry: "./service_worker.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
