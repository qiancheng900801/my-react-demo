module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: "less-loader", // 将 Less 文件编译为 CSS 文件
      },
    ],
  },
};