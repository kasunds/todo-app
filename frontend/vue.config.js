const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Change this to your backend API server URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Disable SSL verification if your API uses HTTP or has a self-signed certificate
        pathRewrite: {
          '^/api': '' // Optionally rewrite the URL to remove the '/api' part
        }
      }
    }
  }
})
