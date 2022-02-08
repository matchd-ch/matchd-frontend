module.exports = {
  transpileDependencies: ["vue-meta"],
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    // https://github.com/vuejs/vue-cli/issues/6785#issuecomment-952653154
    svgRule.delete("type");
    svgRule.delete("generator");
    svgRule
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        svgo: {
          plugins: [{ removeTitle: false }, { cleanupIDs: false }],
        },
      });

    config.devtool("source-map");
  },
};
