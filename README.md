# Calculadora de Precios 3D

![Version](https://img.shields.io/github/v/release/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina?style=for-the-badge&color=blue)
![Downloads](https://img.shields.io/github/downloads/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/total?style=for-the-badge&color=green)
![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg?style=for-the-badge)
![Electron](https://img.shields.io/badge/Electron-37.2.5-9feaf9.svg?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)

Una aplicación de escritorio moderna para calcular precios de impresión 3D para **resina** y **filamento**.

## 📥 Descarga

### 🚀 Aplicación de Escritorio (Recomendada)
[![Descargar para Windows](https://img.shields.io/badge/Descargar%20para-Windows-blue?style=for-the-badge&logo=windows)](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/releases/latest)

**Características:**
- ✅ Sin instalación requerida (portable)
- ✅ Ultra-optimizada para rendimiento
- ✅ Interfaz nativa de Windows
- ✅ Almacenamiento local de proyectos

### 🌐 Versión Web
Accede directamente desde tu navegador: [calculadora3d.netlify.app](https://calculadora3d.netlify.app) *(próximamente)*

## 📸 Capturas de Pantalla

<div align="center">
  <img src="https://via.placeholder.com/800x500/667eea/ffffff?text=Calculadora+de+Resina" alt="Calculadora de Resina" width="400"/>
  <img src="https://via.placeholder.com/800x500/764ba2/ffffff?text=Calculadora+de+Filamento" alt="Calculadora de Filamento" width="400"/>
</div>

*Capturas de pantalla de la interfaz moderna con tema oscuro*

## ✨ Características

- 🧮 **Calculadora de Resina** - Para impresoras SLA/DLP
- 🧮 **Calculadora de Filamento** - Para impresoras FDM/FFF
- 💾 **Gestión de Proyectos** - Guarda y organiza tus cálculos
- 📱 **Diseño Responsive** - Funciona en cualquier dispositivo
- 🎨 **Interfaz Moderna** - Tema oscuro profesional

## �️ Desarrollo

### Configuración inicial
```bash
git clone https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina.git
cd Calculadora-de-Precio-Impresi-n-3D-Resina
npm install
```

### Desarrollo Web
```bash
npm run dev
```
Abre http://localhost:5173 en tu navegador

### Aplicación de Escritorio
```bash
# Desarrollo con recarga automática
npm run electron:dev

# Compilar aplicación de escritorio
npm run app:dist
```
El ejecutable se genera en `dist-app/win-unpacked/Calculadora 3D.exe`

### Build para producción
```bash
npm run build
npm run preview
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── ResinCalculator.jsx    # Calculadora de resina
│   ├── FilamentCalculator.jsx # Calculadora de filamento
│   └── ...
├── styles/
└── App.jsx                    # Aplicación principal
```

## 🛠️ Tecnologías

- **React 19** - Framework principal
- **Vite 7** - Build tool optimizado
- **CSS3** - Estilos modernos con gradientes
- **LocalStorage** - Persistencia de datos

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

Desarrollado por [Artur](https://github.com/Matalentajas)

### Rendimiento Optimizado
- **React 19** con hooks memoizados para máximo rendimiento
- **Sin pérdida de foco** en campos de entrada durante la escritura
- **Carga instantánea** de datos almacenados
- **Experiencia fluida** sin interrupciones ni bloqueos

## Instalación y Uso

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Instalación
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

## Guía de Uso

### Calculadora de Resina
**Configuración de Impresora:**
- Costo de resina por litro (€)
- Consumo eléctrico por hora (€)
- Costo de post-procesado por hora (€)
- Margen de beneficio (%)

**Datos de Impresión:**
- Resina utilizada (ml)
- Tiempo de impresión (horas)
- Número de piezas
- Tiempo de post-procesado (horas)

**Resultados Detallados:**
- Costo individual de resina
- Costo eléctrico
- Costo de post-procesado
- Costo base total
- Precio final con margen
- Precio por pieza individual

### Calculadora de Filamento
**Configuración Similar** adaptada para impresión FDM:
- Costo de filamento por kilogramo
- Medidas en gramos para mayor precisión
- Cálculos específicos para impresión por capas
- Misma estructura de resultados que resina

### Biblioteca de Piezas
- **Guardar**: Asignar nombre y almacenar configuración actual
- **Cargar**: Restaurar configuración de proyectos anteriores
- **Eliminar**: Gestión completa de proyectos guardados
- **Navegación suave**: Scroll optimizado para múltiples proyectos

## Tecnologías Utilizadas

- **Frontend**: React 19.1.0 con Hooks modernos
- **Build Tool**: Vite 5.4.2 para desarrollo ultra-rápido
- **Styling**: CSS moderno con gradientes y efectos avanzados
- **Storage**: LocalStorage para persistencia de datos
- **Performance**: useCallback para optimización de renders

## Arquitectura del Proyecto

### Estructura de Componentes
```
src/
├── components/
│   ├── ResinCalculator.jsx     # Calculadora de resina
│   ├── FilamentCalculator.jsx  # Calculadora de filamento
│   └── PrinterTypeSelector.jsx # Selector de tipo de impresora
├── App.jsx                     # Componente principal
└── main.jsx                   # Punto de entrada
```

### Optimizaciones de Rendimiento
- **useCallback**: Handlers memoizados para campos de entrada
- **Componentes optimizados**: Prevención de re-renders innecesarios
- **Bundle eficiente**: Código dividido para carga rápida
- **CSS optimizado**: Estilos con hardware acceleration

### Compatibilidad
- Chrome/Edge (Scrollbars webkit completos)
- Firefox (Scrollbars de respaldo)
- Safari (Webkit completo)
- Dispositivos móviles (Diseño responsive)

## Personalización

### Variables de Color
```css
:root {
  --primary-blue: #3b82f6;
  --primary-purple: #8b5cf6;
  --resin-pink: #f093fb;
  --success-green: #22c55e;
  --danger-red: #ef4444;
}
```

### Configuración Avanzada

#### Variables de Entorno
```env
VITE_APP_NAME=Calculadora 3D
VITE_VERSION=2.0.0
VITE_STORAGE_PREFIX=calc3d_
```

#### Configuración de Build
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

## Roadmap de Desarrollo

### Versión 2.1 (Planificado)
- Exportación a PDF de cálculos
- Plantillas de proyectos predefinidas
- Calculadora de tiempo de amortización
- Integración con APIs de precios de materiales

### Versión 2.2 (Futuro)
- Soporte multiidioma (ES/EN/FR)
- Base de datos de materiales
- Calculadora de costos por lote
- Dashboard de estadísticas y métricas

### Versión 3.0 (Visión a largo plazo)
- Aplicación PWA para uso offline
- Sincronización en la nube
- Comunidad de usuarios
- Integración con slicers populares

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama de feature (`git checkout -b feature/nuevaCaracteristica`)
3. Commit los cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nuevaCaracteristica`)
5. Abrir un Pull Request

### Guías de Contribución
- Seguir las convenciones de código existentes
- Añadir tests para nuevas funcionalidades
- Actualizar documentación según sea necesario
- Mantener commits descriptivos y atómicos

## Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## Información del Proyecto

**Desarrollado por**: Matalentajas  
**Repositorio**: [Calculadora de Precios 3D](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina)  
**Versión actual**: 2.0.0

## Agradecimientos

- Comunidad de impresión 3D por el feedback continuo
- Contribuidores y testers del proyecto
- Librerías y herramientas open source utilizadas

---

**Si encuentras útil este proyecto, considera darle una estrella en GitHub**

![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb.svg)
![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646cff.svg)
![Styled with CSS](https://img.shields.io/badge/Styled%20with-CSS-1572b6.svg)
