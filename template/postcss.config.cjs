// postcss.config.cjs
module.exports = {
  plugins: [
    // 样式隔离插件，为所有选择器添加前缀
    require("postcss-prefix-selector")({
      prefix: '[data-micro-app="product-foo-prd"]', // 微应用标识
      transform(prefix, selector) {
        // 处理特殊选择器
        if (selector.startsWith("body") || selector.startsWith("html")) {
          return selector;
        }
        // 处理 CSS 变量选择器，保持全局性
        if (selector.startsWith(":root") || selector.startsWith(":host")) {
          return selector;
        }
        // 处理 Element Plus 的 CSS 变量定义
        if (selector.includes("--el-")) {
          return selector;
        }
        return prefix + " " + selector;
      },
      // 排除 node_modules 中的样式文件，不对第三方库样式做隔离
      exclude: [
        /node_modules/
      ]
    }),
    // 自动添加浏览器前缀
    require("autoprefixer"),
    // px转vw单位（移动端适配）
    // require("postcss-px-to-viewport")({
    //   viewportWidth: 1480, // 设计稿宽度
    //   unitPrecision: 5,
    //   viewportUnit: "vw",
    //   selectorBlackList: [".ignore"], // 不转换的选择器
    // }),
  ],
};
