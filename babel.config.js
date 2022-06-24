// eslint-disable-next-line no-undef
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"],
    },
  },
};
