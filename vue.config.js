const path = require("path");
module.exports = {
  lintOnSave: false,
  // outputDir:path.resolve(__dirname, "./dist"),
  configureWebpack: {
    entry: "./packages/index.js",
    output: {
      // path: path.resolve(__dirname, "./dist"),
      filename: "element-lowcode-v1.js", // 我们可不想打包后叫build.js 多low啊 起一个与项目相对应的
      library: "element-lowcode-v1", // library指定的就是你使用require时的模块名，这里便是require("PayKeyboard")
      libraryTarget: "umd", //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
      umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    },
  },
};
