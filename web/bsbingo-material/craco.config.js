// craco.config.js
module.exports = {
  devServer: {
    watchOptions: {
      ignored: ["node_modules", "**/.#*", "**/*~", "**/#*#"],
    },
  },
};
