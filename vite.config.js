import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🚀 CONFIGURACIÓN OPTIMIZADA DE VITE v2.0.0
// Mejora el rendimiento de desarrollo y producción sin dependencias externas
export default defineConfig({
  plugins: [
    react({
      // Optimizaciones específicas de React
      fastRefresh: true,
      jsxRuntime: 'automatic'
    })
  ],
  
  base: './',
  
  // 🚀 Optimización de construcción
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Desactivar sourcemaps en producción para mejor rendimiento
    minify: 'terser', // Mejor minificación
    cssMinify: true,
    
    // Optimización de chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors para mejor caching
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    
    // Configuración de Terser para mejor compresión (sin plugins externos)
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        reduce_vars: true,
        reduce_funcs: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false // Eliminar comentarios
      }
    },
    
    // Configuración de chunks para mejor carga
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096 // Inlinear assets pequeños
  },
  
  // 🚀 Servidor de desarrollo optimizado
  server: {
    port: 5173,
    strictPort: false, // Buscar puerto automáticamente si 5173 está ocupado
    open: false, // No abrir navegador automáticamente para evitar conflictos
    cors: true,
    host: true, // Permitir acceso desde red local
    
    // Optimizaciones de HMR
    hmr: {
      overlay: true
    }
  },
  
  // 🚀 Optimización de resolución de módulos
  resolve: {
    alias: {
      // Alias para imports más limpios (sin rutas complejas)
      '@': '/src'
    }
  },
  
  // 🚀 Optimización de CSS
  css: {
    devSourcemap: false // Desactivar sourcemaps de CSS en desarrollo
  },
  
  // 🚀 Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom'
    ]
  },
  
  // 🚀 Configuración de preview
  preview: {
    port: 4173,
    strictPort: false,
    open: false
  },
  
  // 🚀 Variables de entorno
  define: {
    __DEV__: JSON.stringify(true),
    __PROD__: JSON.stringify(false)
  }
})
