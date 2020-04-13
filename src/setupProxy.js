const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(
    "/api/flights/*",
    createProxyMiddleware({
      target: "https://opensky-network.org",
      changeOrigin: true,
    })
  )
}
