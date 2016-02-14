
module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./static/js/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules)/,
        loader: "babel" 
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      }
    ]
  }
};
