module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: /src/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
  },
};
