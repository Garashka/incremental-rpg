module.exports = {
  devServer: {
    port: 8081,
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/incremental-rpg/'
    : '/',
};

