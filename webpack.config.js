module.exports = {
    entry: ["./src/main.jsx"],
    output: {
        path: __dirname + "/public/js/",
        filename: "main.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
      ]
    }
};
