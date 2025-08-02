# 🎯 Calculadora de Precios 3D - Resina y Filamento

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Una aplicación web moderna y profesional para calcular precios de impresión 3D tanto para **resina** como para **filamento**. Diseñada con una interfaz elegante y funcionalidades avanzadas para makers, empresarios y entusiastas de la impresión 3D.

## ✨ Características Principales

### 🧮 Calculadoras Especializadas
- **Calculadora de Resina**: Optimizada para impresoras SLA/DLP
- **Calculadora de Filamento**: Diseñada para impresoras FDM/FFF
- **Cálculos precisos** con múltiples variables de costo
- **Margen de beneficio configurable** para uso comercial

### 💾 Gestión de Proyectos
- **Biblioteca de piezas**: Guarda y organiza tus proyectos
- **Carga rápida**: Restaura configuraciones previas al instante
- **Historial de cálculos**: Mantiene registro de tus últimos trabajos
- **Persistencia local**: Tus datos se guardan automáticamente

### 🎨 Interfaz Moderna
- **Diseño responsivo** que se adapta a cualquier pantalla
- **Tema oscuro elegante** con gradientes y efectos visuales
- **Tarjetas compactas** para visualizar múltiples proyectos
- **Scroll personalizado** con estética integrada
- **Efectos hover** suaves y profesionales

### ⚡ Rendimiento Optimizado
- **React 19** con hooks memoizados para máximo performance
- **Sin pérdida de foco** en inputs durante la escritura
- **Carga instantánea** de datos guardados
- **Experiencia fluida** sin retrasos ni bloqueos

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación Rápida
```bash
# Clonar el repositorio
git clone https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina.git

# Navegar al directorio
cd calculadora-precios-3d

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Compilación para Producción
```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## 📊 Guía de Uso

### Calculadora de Resina 🧪
1. **Configuración de Impresora**:
   - Costo de resina por litro (€)
   - Consumo eléctrico por hora (€)
   - Costo de post-procesado por hora (€)
   - Margen de beneficio (%)

2. **Datos de Impresión**:
   - Resina utilizada (ml)
   - Tiempo de impresión (horas)
   - Número de piezas
   - Tiempo de post-procesado (horas)

3. **Resultados Detallados**:
   - Costo de resina
   - Costo eléctrico
   - Costo de post-procesado
   - Precio final con margen
   - Precio por pieza

### Calculadora de Filamento 🧵
1. **Configuración Similar** adaptada para filamento
2. **Medidas en gramos** para precisión en FDM
3. **Cálculos específicos** para impresión por capas

### Biblioteca de Piezas 📚
- **Guardar**: Asigna nombre y guarda configuración actual
- **Cargar**: Restaura configuración de proyectos previos
- **Eliminar**: Gestión completa de proyectos guardados
- **Scroll suave**: Navega fácilmente por múltiples proyectos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19.1.0 con Hooks modernos
- **Build Tool**: Vite 5.4.2 para desarrollo ultra-rápido
- **Styling**: CSS moderno con gradientes y efectos
- **Storage**: LocalStorage para persistencia de datos
- **Performance**: useCallback para optimización de renders

## 📱 Características Técnicas

### Arquitectura de Componentes
```
src/
├── components/
│   ├── ResinCalculator.jsx     # Calculadora de resina
│   ├── FilamentCalculator.jsx  # Calculadora de filamento
│   └── PrinterTypeSelector.jsx # Selector de tipo
├── App.jsx                     # Componente principal
└── main.jsx                   # Punto de entrada
```

### Optimizaciones de Performance
- **useCallback**: Handlers memoizados para inputs
- **Componentes puros**: Evita re-renders innecesarios
- **Lazy loading**: Carga optimizada de componentes
- **Bundle splitting**: Código dividido eficientemente

### Compatibilidad
- ✅ Chrome/Edge (Webkit scrollbars)
- ✅ Firefox (Fallback scrollbars)
- ✅ Safari (Webkit completo)
- ✅ Dispositivos móviles (Responsive)

## 🎨 Personalización

### Temas y Colores
La aplicación utiliza una paleta de colores moderna:
- **Primario**: Gradientes azul/púrpura (`#3b82f6` → `#8b5cf6`)
- **Resina**: Rosa/magenta (`#f093fb` → `#a855f7`)
- **Éxito**: Verde (`#22c55e`)
- **Peligro**: Rojo (`#ef4444`)

### Variables CSS Personalizables
```css
:root {
  --primary-gradient: linear-gradient(135deg, #3b82f6, #8b5cf6);
  --resin-gradient: linear-gradient(135deg, #f093fb, #a855f7);
  --success-color: #22c55e;
  --danger-color: #ef4444;
}
```

## 🔧 Configuración Avanzada

### Variables de Entorno
Crea un archivo `.env` para configuraciones:
```env
VITE_APP_NAME=Calculadora 3D
VITE_VERSION=2.0.0
VITE_STORAGE_PREFIX=calc3d_
```

### Configuración de Build
```javascript
// vite.config.js
export default {
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild'
  }
}
```

## 📈 Roadmap y Futuras Mejoras

### v2.1 (Próximamente)
- [ ] Exportación a PDF de cálculos
- [ ] Plantillas de proyectos predefinidas
- [ ] Calculadora de tiempo de amortización
- [ ] Integración con APIs de precios de materiales

### v2.2 (Planificado)
- [ ] Modo multiidioma (ES/EN/FR)
- [ ] Base de datos de materiales
- [ ] Calculadora de costos por lote
- [ ] Dashboard de estadísticas

### v3.0 (Visión a largo plazo)
- [ ] Aplicación PWA offline
- [ ] Sincronización en la nube
- [ ] Comunidad de usuarios
- [ ] Integración con slicers populares

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Mantén los commits descriptivos y atómicos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Matalentajas**
- GitHub: [@Matalentajas](https://github.com/Matalentajas)
- Proyecto: [Calculadora de Precios 3D](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina)

## 🙏 Agradecimientos

- Comunidad de impresión 3D por el feedback continuo
- Contribuidores y testers beta
- Librerías y herramientas open source utilizadas

---

<div align="center">

**⭐ Si te gusta este proyecto, no olvides darle una estrella ⭐**

![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb.svg)
![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646cff.svg)
![Styled with CSS](https://img.shields.io/badge/Styled%20with-CSS-1572b6.svg)

</div>
