import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/chemistry/',
  plugins: [react(), {
    name: 'redirect-root-to-base',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/chemistry') {
          res.writeHead(302, { Location: '/chemistry/' })
          return res.end()
        }
        next()
      })
    },
  }],
  preview: { host: '0.0.0.0', port: 8080, strictPort: true },
})
