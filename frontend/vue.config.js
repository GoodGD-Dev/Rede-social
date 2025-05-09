module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  // Desabilitar ESLint durante o desenvolvimento
  lintOnSave: false
}