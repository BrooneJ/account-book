import { createProxyMiddleware } from "http-proxy-middleware";

export default function expressMiddleware(router) {
  console.log("Setting up express middleware");
  router.use(
    "/api", // The base path for intercepted API calls
    createProxyMiddleware({
      target: "http://localhost:9090", // Your mock server address
      changeOrigin: true,
    }),
  );
}
