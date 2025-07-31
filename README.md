# Calculadora de Precios para Impresión 3D

> Una aplicación de escritorio profesional para calcular el coste real de tus impresiones 3D en resina

![Calculadora 3D](https://img.shields.io/badge/Version-1.0.9-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey.svg)
![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)
![Electron](https://img.shields.io/badge/Electron-37.2.5-47848f.svg)

## Tabla de Contenidos

- [Inicio Rápido](#inicio-rápido)
- [Sobre el Proyecto](#sobre-el-proyecto)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Guía de Usuario](#guía-de-usuario)
- [Desarrollo](#desarrollo)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Inicio Rápido

### Para Usuarios (Solo usar la aplicación)

Si simplemente quieres usar la calculadora, tienes varias opciones fáciles:

1. **Ejecutar directamente** (Recomendado)
   ```cmd
   # Haz doble clic en:
   CalculadoraPrecios3D.exe
   ```

2. **Script automático**
   ```cmd
   # Ve a la carpeta scripts/ y ejecuta:
   .\scripts\Iniciar Calculadora.bat
   ```

3. **Crear acceso directo en el escritorio**
   ```cmd
   # Para crear un acceso directo:
   .\scripts\Crear Acceso Directo.bat
   ```

### Para Desarrolladores

```bash
# Clonar e instalar
git clone https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina.git
cd calculadora-precios-3d
npm install

# Ejecutar en desarrollo
npm run dev          # Versión web
npm run electron-dev # Versión escritorio
```

## Sobre el Proyecto

### ¿Qué hace esta aplicación?

La **Calculadora de Precios 3D** es una herramienta profesional diseñada para **makers, profesionales e impresores 3D** que necesitan calcular con precisión el coste real de sus impresiones en resina.

### ¿Por qué es necesaria?

Calcular el precio correcto de una impresión 3D implica muchos factores que a menudo se pasan por alto:

- **Coste de material**: La resina consumida en mililitros
- **Coste energético**: El consumo eléctrico durante las horas de impresión
- **Post-procesado**: Tiempo invertido en lavado, curado, lijado y acabados
- **Margen de beneficio**: Tu ganancia profesional

Esta aplicación **automatiza todos estos cálculos** para que puedas:
- Cotizar correctamente tus trabajos
- No perder dinero en proyectos
- Profesionalizar tu negocio de impresión 3D
- Ahorrar tiempo en cálculos manuales

### ¿Qué la hace especial?

- **Aplicación de escritorio nativa**: Funciona sin necesidad de internet
- **Diseño moderno y profesional**: Interfaz elegante con efectos glassmorphism  
- **Cálculos en tiempo real**: Los precios se actualizan automáticamente
- **Gestión de proyectos**: Guarda y reutiliza configuraciones
- **Persistencia de datos**: Tus piezas guardadas se mantienen entre sesiones
- **Completamente responsive**: Se adapta a cualquier tamaño de ventana

## Características

### Sistema de Cálculo Completo
- **Coste de material**: Basado en mililitros de resina utilizados
- **Coste energético**: Calculado por horas de impresión 
- **Post-procesado**: Coste por tiempo de trabajo manual (lavado, curado, lijado)
- **Margen de beneficio**: Porcentaje configurable para tu ganancia
- **Precio final**: Cálculo automático con todos los factores incluidos

### Interfaz de Usuario Premium
- **Diseño glassmorphism** con efectos de cristal y transparencias
- **Gradientes dinámicos** y animaciones suaves
- **Diseño responsive** que se adapta a diferentes tamaños de ventana
- **Tipografía optimizada** para lectura profesional
- **Iconografía consistente** con tema unificado

### Gestión de Proyectos
- **Guardar piezas** con todos los parámetros de cálculo
- **Imágenes de referencia** para cada proyecto (JPG, PNG, GIF)
- **Historial de trabajos** realizados con acceso rápido
- **Carga rápida** de configuraciones previas
- **Organización visual** en formato de tarjetas elegantes
- **Persistencia automática**: Los datos se guardan automáticamente

### Aplicación de Escritorio
- **Ejecutable nativo** para Windows (.exe)
- **Icono personalizado** profesional
- **Menús contextuales** integrados con el sistema
- **Splash screen animado** con carga profesional
- **Inicio en pantalla completa** para mejor experiencia

### Localización Española
- **Formato de moneda** en euros (€)
- **Números decimales** con comas (15,50€)
- **Interfaz completamente** en español
- **Ejemplos específicos** para el mercado español

## Tecnologías

### Frontend
- **React 19** - Librería de interfaz de usuario con hooks modernos
- **CSS3 Avanzado** - Glassmorphism, gradientes, transiciones y animaciones
- **Vite** - Herramienta de build ultrarrápida con HMR (Hot Module Replacement)

### Aplicación de Escritorio
- **Electron 37** - Framework para aplicaciones de escritorio multiplataforma
- **Node.js 18** - Runtime de JavaScript para el backend de la aplicación

### Herramientas de Desarrollo
- **ESLint** - Análisis estático de código JavaScript para calidad
- **Canvas API** - Generación programática de iconos personalizados

## Instalación

### Uso Rápido (Recomendado)

Si solo quieres usar la calculadora, no necesitas instalar nada especial:

**Ejecutable Independiente**
```powershell
# Simplemente ejecuta:
.\CalculadoraPrecios3D.exe
```

Ventajas:
- Sin instalaciones complicadas - Funciona directamente
- Icono personalizado integrado en el ejecutable
- Portable - Llévalo a cualquier PC Windows
- Los datos se guardan automáticamente

### Para Desarrolladores

```bash
# Clonar el repositorio
git clone https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina.git
cd calculadora-precios-3d

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev              # Aplicación web
npm run electron-dev     # Aplicación Electron
```

### Prerrequisitos (Solo para Desarrollo)
- **Node.js 18+** instalado en el sistema
- **npm** (incluido con Node.js)
- **Windows 10/11** (para la aplicación de escritorio)

## Guía de Usuario

### 1. Configurar Precios Base

En el **primer panel** configura tus costes base:
- **Precio de resina por litro** (€/L) - Ejemplo: 25,00€/L
- **Coste de post-procesado por hora** (€/h) - Lavado, curado, lijado, etc.
- **Coste energético por hora** (€/h) - Consumo eléctrico de la impresora
- **Margen de beneficio** (%) - Tu ganancia sobre los costes totales

### 2. Datos de la Pieza

En el **segundo panel** introduce la información específica:
- **Nombre de la pieza** - Para identificarla fácilmente
- **Imagen de referencia** - Foto de la pieza (JPG, PNG, GIF) *opcional*
- **Mililitros de resina** - Cantidad consumida según tu slicer
- **Tiempo de impresión** - Horas que tarda en imprimir
- **Tiempo de post-procesado** - Horas de trabajo manual

### 3. Ver Resultados Automáticos

El **panel de resumen** te muestra automáticamente:
- **Coste de material** - Basado en la resina consumida
- **Coste de post-procesado** - Tiempo de trabajo manual valorado
- **Coste de electricidad** - Consumo energético calculado
- **Coste total sin margen** - Suma de todos los costes
- **Precio final** - Con tu margen de beneficio incluido

### 4. Guardar y Gestionar Piezas

- **Guardar Pieza**: Haz clic para añadirla a tu biblioteca personal
- **Cargar Pieza**: Selecciona una pieza guardada para reutilizar sus valores
- **Eliminar Pieza**: Limpia tu biblioteca de piezas obsoletas
- **Vista Previa**: Ve las imágenes de tus piezas guardadas
- **Persistencia automática**: Todas las piezas se guardan automáticamente

### Consejos de Uso

#### ¿Cómo sé cuántos ml de resina uso?
- Tu **slicer** (Chitubox, Lychee, PrusaSlicer, etc.) te dice los ml exactos
- También aparece en la pantalla de tu impresora antes de imprimir
- Algunos slicers muestran el volumen en cm³, conviértelo: **1 cm³ = 1 ml**

#### ¿Qué incluir en el post-procesado?
- **Lavado con alcohol/agua** - Tiempo de limpieza
- **Curado UV** - Tiempo bajo lámpara UV
- **Lijado y acabados** - Tiempo de trabajo manual
- **Pintado o tratamientos** - Si aplican
- **Tu tiempo de supervisión** - Tu tiempo vale dinero

#### ¿Cómo calcular el coste energético?
```
Ejemplo de cálculo:
- Potencia de tu impresora: 150W = 0.15 kW
- Precio de la luz: 0.25€/kWh
- Coste por hora = 0.15 × 0.25 = 0.04€/h
```

#### Ejemplos Prácticos

**Miniatura Básica (28mm)**
- Resina: 15 ml → Coste material: ~0,38€
- Tiempo impresión: 3h → Coste energético: ~0,12€
- Post-procesado: 0.5h → Coste trabajo: ~5,00€
- **Total**: ~5,50€ + margen = **Precio final: ~8,25€**

**Pieza Compleja (Busto 15cm)**
- Resina: 45 ml → Coste material: ~1,13€
- Tiempo impresión: 8h → Coste energético: ~0,32€
- Post-procesado: 2h → Coste trabajo: ~20,00€
- **Total**: ~21,45€ + margen = **Precio final: ~32,18€**

### Problemas Frecuentes

#### La aplicación no abre
- Usa el ejecutable principal: `CalculadoraPrecios3D.exe` en la raíz del proyecto
- También puedes usar: `.\scripts\Iniciar Calculadora.bat`
- Comprueba que Windows no esté bloqueando el ejecutable

#### Los cálculos parecen incorrectos
- Usa **puntos decimales** (15.5) no comas (15,5) en los inputs
- El precio de resina debe ser **por litro**, no por botella
- El margen se aplica sobre el coste total, no solo el material

#### No puedo cargar imágenes
- Usa formatos **JPG, PNG o GIF**
- Tamaño máximo recomendado: **< 10MB**
- Verifica permisos de lectura en la carpeta de la imagen

## Desarrollo

### Estructura del Proyecto

```
calculadora-precios-3d/
├── README.md                       # Documentación principal
├── CONTRIBUTING.md                 # Guías para colaboradores  
├── CHANGELOG.md                    # Registro de versiones
├── LICENSE                         # Licencia MIT
├── package.json                    # Configuración npm
├── .gitignore                      # Exclusiones Git
├── index.html                      # Punto de entrada HTML
├── vite.config.js                  # Configuración Vite
├── eslint.config.js                # Configuración ESLint
├── CalculadoraPrecios3D.exe        # Ejecutable principal
│
├── src/                            # Código fuente React
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Punto de entrada React
│   ├── App.css                     # Estilos principales
│   ├── index.css                   # Estilos globales
│   └── assets/                     # Recursos estáticos
│
├── public/                         # Recursos públicos
│   ├── electron.cjs                # Proceso principal Electron
│   ├── app-icon.ico                # Icono Windows
│   ├── app-icon.png                # Icono universal
│   └── app-icon.svg                # Icono vectorial
│
└── scripts/                        # Utilidades y scripts
    ├── create-icon.cjs             # Generador de iconos
    ├── Agregar-Icono.ps1           # Script PowerShell para iconos
    └── Limpiar-Compilacion.ps1     # Limpieza de archivos
```

### Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo Web** | `npm run dev` | Servidor desarrollo con Vite |
| **Desarrollo Electron** | `npm run electron-dev` | App Electron en desarrollo |
| **Build Web** | `npm run build` | Construir aplicación web |
| **Generar Icono** | `npm run create-icon` | Crear iconos PNG/ICO |

### Flujo de Desarrollo

1. **Fork** del repositorio
2. **Crear rama** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Desarrollar** usando `npm run dev` para web o `npm run electron-dev` para desktop
4. **Probar** la aplicación completa
5. **Commit** siguiendo buenas prácticas
6. **Push** y crear **Pull Request**

## Contribuir

Las contribuciones son bienvenidas. Este proyecto está abierto a mejoras y nuevas funcionalidades.

### Cómo Contribuir

1. **Haz Fork** del proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Reportar Bugs

Si encuentras un bug, por favor:
1. **Busca** si ya existe un issue similar
2. **Crea un nuevo issue** describiendo el problema
3. **Incluye capturas** de pantalla si es posible
4. **Describe** los pasos para reproducir el problema

### Sugerir Funcionalidades

¿Tienes una idea genial? 
1. **Crea un issue** describiendo la funcionalidad
2. **Describe** claramente lo que quieres lograr
3. **Explica** por qué sería útil
4. **Incluye mockups** si es posible

## Estado del Proyecto

### Completado
- Aplicación de escritorio nativa funcional
- Icono personalizado profesional integrado
- Interfaz moderna con efectos glassmorphism
- Persistencia automática de datos con localStorage
- Cálculos en tiempo real
- Gestión completa de piezas guardadas
- Documentación completa

### En Desarrollo
- Soporte para múltiples idiomas
- Exportación de reportes en PDF
- Calculadora de tiempo de impresión automática

### Futuras Mejoras
- Integración con APIs de slicers populares
- Dashboard de estadísticas de uso
- Soporte para más tipos de materiales
- Versión web pública

## Soporte

¿Necesitas ayuda? Tienes varias opciones:

- **Bug Reports**: [Crear Issue](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/issues)
- **Preguntas**: [Hacer Pregunta](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/issues)
- **Sugerencias**: [Issues del repositorio](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/issues)

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Calculadora de Precios 3D

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**Calculadora de Precios 3D - Profesionaliza tu negocio de impresión 3D**

[![Star](https://img.shields.io/github/stars/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina?style=social)](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/stargazers)
[![Fork](https://img.shields.io/github/forks/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina?style=social)](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/network/members)

**Hecho con cariño para la comunidad de impresión 3D**

</div>

## 🚀 Inicio Rápido

### ⚡ Para Usuarios (Solo Usar la App)

1. **Opción 1: Script Automático** *(Recomendado)*
   ```cmd
   # Ve a la carpeta scripts/ y ejecuta:
   .\scripts\Iniciar Calculadora.bat
   ```

2. **Opción 2: Crear Acceso Directo**
   ```cmd
   # Crear acceso directo en el escritorio:
   .\scripts\Crear Acceso Directo.bat
   ```

3. **Opción 3: Script Directo** *(Más rápido)*
   ```
   # Script de inicio en la raíz del proyecto:
   Calculadora 3D.bat
   ```

4. **Opción 4: Con Icono Personalizado** *(Más elegante)*
   ```
   # Configurar icono y crear acceso directo:
   .\scripts\Configurar Icono Bat.bat
   
   # O manualmente: Clic derecho en "Calculadora 3D.bat" 
   # → Propiedades → Cambiar icono → Buscar "public\app-icon.ico"
   ```

5. **Opción 5: Ejecutable Original**
   ```
   # Ruta completa al ejecutable:
   dist-packager\Calculadora de Precios 3D-win32-x64\Calculadora de Precios 3D.exe
   ```

### 🔧 Para Desarrolladores

```bash
# Clonar e instalar
git clone https://github.com/tu-usuario/calculadora-precios-3d.git
cd calculadora-precios-3d
npm install

# Ejecutar en desarrollo
npm run dev          # Versión web
npm run electron-dev # Versión escritorio
```

## 💡 Sobre el Proyecto

### 🎯 ¿Qué hace esta aplicación?

La **Calculadora de Precios 3D** es una herramienta profesional diseñada para **makers, profesionales e impresores 3D** que necesitan calcular con precisión el coste real de sus impresiones en resina.

### 🔍 ¿Por qué es necesaria?

Calcular el precio correcto de una impresión 3D implica muchos factores:
- **💧 Coste de material** (resina consumida en ml)
- **⚡ Coste energético** (consumo eléctrico por horas)
- **🛠️ Post-procesado** (lavado, curado, lijado, pintado)
- **📈 Margen de beneficio** (tu ganancia profesional)

Esta aplicación **automatiza todos estos cálculos** para que puedas:
- ✅ **Cotizar correctamente** tus trabajos
- ✅ **No perder dinero** en proyectos
- ✅ **Profesionalizar** tu negocio de impresión 3D
- ✅ **Ahorrar tiempo** en cálculos manuales

### 🎨 ¿Qué la hace especial?

- **🖥️ Aplicación de escritorio nativa** - Funciona sin internet
- **💎 Diseño glassmorphism premium** - Interfaz moderna y profesional  
- **⚡ Cálculos en tiempo real** - Los precios se actualizan automáticamente
- **🗂️ Gestión de proyectos** - Guarda y reutiliza configuraciones
- **📱 Totalmente responsive** - Se adapta a cualquier tamaño de ventana

## ✨ Características

### 💰 Sistema de Cálculo Completo
- **🧪 Coste de material**: Basado en mililitros de resina utilizados
- **⚡ Coste energético**: Calculado por horas de impresión 
- **🛠️ Post-procesado**: Coste por tiempo de trabajo manual (lavado, curado, lijado)
- **📈 Margen de beneficio**: Porcentaje configurable para tu ganancia
- **💵 Precio final**: Cálculo automático con todos los factores incluidos

### 🎨 Interfaz de Usuario Premium
- **💎 Diseño glassmorphism** con efectos de cristal y transparencias
- **🌈 Gradientes dinámicos** y animaciones suaves
- **📱 Responsive design** que se adapta a diferentes tamaños de ventana
- **✨ Tipografía optimizada** para lectura profesional
- **🎯 Iconografía consistente** con tema unificado

### 🗂️ Gestión de Proyectos
- **💾 Guardar piezas** con todos los parámetros de cálculo
- **🖼️ Imágenes de referencia** para cada proyecto (JPG, PNG, GIF)
- **📜 Historial de trabajos** realizados con acceso rápido
- **⚡ Carga rápida** de configuraciones previas
- **🎴 Organización visual** en formato de tarjetas elegantes

### 💻 Aplicación de Escritorio
- **🔧 Ejecutable nativo** para Windows (.exe)
- **🎨 Icono personalizado** profesional
- **📋 Menús contextuales** integrados con el sistema
- **⌨️ Accesos directos** configurables
- **🚀 Inicio rápido** sin necesidad de navegador

### 🌍 Localización Española
- **💶 Formato de moneda** en euros (€)
- **🔢 Números decimales** con comas (15,50€)
- **📝 Interfaz completamente** en español
- **📊 Ejemplos específicos** para el mercado español

## 🛠️ Tecnologías

### 🎨 Frontend
- **⚛️ React 19** - Librería de interfaz de usuario con hooks modernos
- **🎨 CSS3 Avanzado** - Glassmorphism, gradientes, transiciones y animaciones
- **⚡ Vite** - Herramienta de build ultrarrápida con HMR (Hot Module Replacement)

### 🖥️ Desktop Application
- **🔧 Electron 37** - Framework para aplicaciones de escritorio multiplataforma
- **📦 electron-packager** - Empaquetado de aplicaciones nativas para distribución
- **🟢 Node.js 18** - Runtime de JavaScript para el backend de la aplicación

### 🔧 Herramientas de Desarrollo
- **🔍 ESLint** - Análisis estático de código JavaScript para calidad
- **🎨 Canvas API** - Generación programática de iconos personalizados
- **🖼️ png2icons** - Conversión de formatos de imagen para iconos Windows

### 📊 Stack Completo
```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0", 
    "electron-is-dev": "^3.0.1"
  },
  "devDependencies": {
    "electron": "^37.2.5",
    "vite": "^7.0.4",
    "@vitejs/plugin-react": "^4.6.0",
    "electron-packager": "^17.1.2",
    "canvas": "^3.1.2",
    "png2icons": "^2.0.1",
    "eslint": "^9.17.0"
  }
}
```

## 📦 Instalación

### 🎯 Uso Rápido (Recomendado)
**¿Solo quieres usar la calculadora?** ¡No necesitas instalar nada!

**🚀 Ejecutable Independiente**
```powershell
# Simplemente ejecuta:
.\CalculadoraPrecios3D.exe
```
- ✅ **Sin instalaciones** - Funciona directamente
- ✅ **Icono personalizado** - Integrado en el ejecutable
- ✅ **Portable** - Llévalo a cualquier PC Windows
- ✅ **Persiste en Git** - El icono no se pierde al subir al repositorio

**� Para Desarrolladores**
```bash
# Clonar e instalar
git clone https://github.com/tu-usuario/calculadora-precios-3d.git
cd calculadora-precios-3d
npm install

# Modo desarrollo
npm run dev              # Aplicación web
npm run electron-dev     # Aplicación Electron
```

### 📋 Prerrequisitos (Solo para Desarrollo)
- **Node.js 18+** instalado en el sistema
- **npm** (incluido con Node.js)
- **Windows 10/11** (para la aplicación de escritorio)

### 🔧 Instalación para Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/calculadora-precios-3d.git

# Navegar al directorio
cd calculadora-precios-3d

# Instalar dependencias
npm install

# Modo desarrollo (aplicación web)
npm run dev

# Modo desarrollo (aplicación Electron)
npm run electron-dev
```

### 🚀 Construcción para Producción

```bash
# Construir aplicación web
npm run build

# Construir aplicación de escritorio
npm run build-electron

# Vista previa del build
npm run preview
```

## 📖 Guía de Usuario

### 1️⃣ Configurar Precios Base

En el **primer panel** configura tus costes base:
- **💧 Precio de resina por litro** (€/L) - Ej: 25,00€/L
- **🛠️ Coste de post-procesado por hora** (€/h) - Lavado, curado, lijado, etc.
- **⚡ Coste energético por hora** (€/h) - Consumo eléctrico de la impresora
- **📈 Margen de beneficio** (%) - Tu ganancia sobre los costes totales

### 2️⃣ Datos de la Pieza

En el **segundo panel** introduce la información específica:
- **📝 Nombre de la pieza** - Para identificarla fácilmente
- **🖼️ Imagen de referencia** - Foto de la pieza (JPG, PNG, GIF) *opcional*
- **🧪 Mililitros de resina** - Cantidad consumida según tu slicer
- **⏱️ Tiempo de impresión** - Horas que tarda en imprimir
- **🔧 Tiempo de post-procesado** - Horas de trabajo manual

### 3️⃣ Ver Resultados Automáticos

El **tercer panel** te muestra automáticamente:
- **💧 Coste de material** - Basado en la resina consumida
- **🛠️ Coste de post-procesado** - Tiempo de trabajo manual valorado
- **⚡ Coste de electricidad** - Consumo energético calculado
- **📊 Coste total sin margen** - Suma de todos los costes
- **💰 Precio final** - Con tu margen de beneficio incluido

### 4️⃣ Guardar y Gestionar Piezas

- **💾 Guardar Pieza**: Haz clic para añadirla a tu biblioteca personal
- **📋 Cargar Pieza**: Selecciona una pieza guardada para reutilizar sus valores
- **🗑️ Eliminar Pieza**: Limpia tu biblioteca de piezas obsoletas
- **🖼️ Vista Previa**: Ve las imágenes de tus piezas guardadas

### 💡 Consejos de Uso

#### 🧪 ¿Cómo sé cuántos ml de resina uso?
- Tu **slicer** (Chitubox, Lychee, PrusaSlicer, etc.) te dice los ml exactos
- También aparece en la pantalla de tu impresora antes de imprimir
- Algunos slicers muestran el volumen en cm³, conviértelo: **1 cm³ = 1 ml**

#### 🔧 ¿Qué incluir en el post-procesado?
- **Lavado con alcohol/agua** - Tiempo de limpieza
- **Curado UV** - Tiempo bajo lámpara UV
- **Lijado y acabados** - Tiempo de trabajo manual
- **Pintado o tratamientos** - Si aplican
- **Tu tiempo de supervisión** - Vale dinero

#### ⚡ ¿Cómo calcular el coste energético?
```
Ejemplo de cálculo:
- Potencia de tu impresora: 150W = 0.15 kW
- Precio de la luz: 0.25€/kWh
- Coste por hora = 0.15 × 0.25 = 0.04€/h
```

#### 📊 Ejemplos Prácticos

**Miniatura Básica (28mm)**
- Resina: 15 ml → Coste material: ~0,38€
- Tiempo impresión: 3h → Coste energético: ~0,12€
- Post-procesado: 0.5h → Coste trabajo: ~5,00€
- **Total**: ~5,50€ + margen = **Precio final: ~8,25€**

**Pieza Compleja (Busto 15cm)**
- Resina: 45 ml → Coste material: ~1,13€
- Tiempo impresión: 8h → Coste energético: ~0,32€
- Post-procesado: 2h → Coste trabajo: ~20,00€
- **Total**: ~21,45€ + margen = **Precio final: ~32,18€**

### ❓ Problemas Frecuentes

#### 🚫 La aplicación no abre
- Usa el script más simple: `Calculadora 3D.bat` en la raíz del proyecto
- También funciona: `.\scripts\Iniciar Calculadora.bat`
- El ejecutable completo está en: `dist-packager\Calculadora de Precios 3D-win32-x64\`
- Comprueba que Windows no esté bloqueando el ejecutable

#### 🔢 Los cálculos parecen incorrectos
- Usa **puntos decimales** (15.5) no comas (15,5) en los inputs
- El precio de resina debe ser **por litro**, no por botella
- El margen se aplica sobre el coste total, no solo el material

#### 🖼️ No puedo cargar imágenes
- Usa formatos **JPG, PNG o GIF**
- Tamaño máximo recomendado: **< 10MB**
- Verifica permisos de lectura en la carpeta de la imagen

## 💻 Desarrollo

### 🏗️ Estructura del Proyecto

```
calculadora-precios-3d/
├── 📄 README.md                    # Documentación principal
├── 📄 CONTRIBUTING.md              # Guías para colaboradores  
├── 📄 CHANGELOG.md                 # Registro de versiones
├── 📄 LICENSE                      # Licencia MIT
├── 📄 package.json                 # Configuración npm
├── 📄 .gitignore                   # Exclusiones Git
├── 🎯 index.html                   # Punto de entrada HTML
├── ⚡ vite.config.js               # Configuración Vite
├── 🔧 eslint.config.js             # Configuración ESLint
│
├── 📂 src/                         # Código fuente React
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Punto de entrada React
│   ├── App.css                     # Estilos principales
│   ├── index.css                   # Estilos globales
│   └── assets/                     # Recursos estáticos
│
├── 📂 public/                      # Recursos públicos
│   ├── electron.cjs                # Proceso principal Electron
│   ├── app-icon.ico                # Icono Windows
│   ├── app-icon.png                # Icono universal
│   └── app-icon.svg                # Icono vectorial
│
├── 📂 scripts/                     # Utilidades y scripts
│   ├── create-icon.cjs             # Generador de iconos
│   ├── Iniciar Calculadora.bat     # Inicio rápido
│   ├── Crear Acceso Directo.bat    # Crear atajo escritorio
│   ├── Limpiar para Git.bat        # Limpieza pre-commit
│   └── Configurar Git.bat          # Setup repositorio
│
├── 📂 .github/                     # Templates GitHub
│   ├── pull_request_template.md    # Template para PRs
│   └── ISSUE_TEMPLATE/             # Templates para issues
│       ├── bug_report.md           # Reporte de bugs
│       ├── feature_request.md      # Solicitud de features
│       └── question.md             # Preguntas
│
├── 📂 .vscode/                     # Configuración VS Code
│   ├── extensions.json             # Extensiones recomendadas
│   └── settings.json               # Configuración workspace
│
└── 📂 dist-*/                     # Carpetas de distribución
    ├── dist-electron/              # Build Electron Builder
    └── dist-packager/              # Ejecutables finales
```

### 🚀 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| 🌐 **Desarrollo Web** | `npm run dev` | Servidor desarrollo con Vite |
| 🖥️ **Desarrollo Electron** | `npm run electron-dev` | App Electron en desarrollo |
| 📦 **Build Web** | `npm run build` | Construir aplicación web |
| 🔨 **Build Electron** | `npm run build-electron` | Crear ejecutable Windows |
| 🎨 **Generar Icono** | `npm run create-icon` | Crear iconos PNG/ICO |
| 🧹 **Limpiar** | `.\scripts\Limpiar para Git.bat` | Preparar para Git |
| 📡 **Configurar Git** | `.\scripts\Configurar Git.bat` | Inicializar repositorio |

### 🔄 Flujo de Desarrollo

1. **🍴 Fork** del repositorio
2. **🌿 Crear rama** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **💻 Desarrollar** usando `npm run dev` para web o `npm run electron-dev` para desktop
4. **🧪 Probar** la aplicación completa
5. **📝 Commit** siguiendo [Conventional Commits](https://conventionalcommits.org/)
6. **🚀 Push** y crear **Pull Request**

### 🧪 Testing

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Probar build de producción
npm run build
npm run preview

# Probar aplicación Electron
npm run electron-dev

# Crear ejecutable final
npm run build-electron
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto está abierto a mejoras y nuevas funcionalidades.

### 🌟 Cómo Contribuir

1. **🍴 Haz Fork** del proyecto
2. **🌿 Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **📝 Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **🚀 Push** a la rama (`git push origin feature/AmazingFeature`)
5. **📋 Abre un Pull Request**

### 🐛 Reportar Bugs

Si encuentras un bug, por favor:
1. **🔍 Busca** si ya existe un issue similar
2. **📝 Crea un nuevo issue** usando el template de bug report
3. **📷 Incluye capturas** de pantalla si es posible
4. **📋 Describe** los pasos para reproducir el problema

### 💡 Sugerir Funcionalidades

¿Tienes una idea genial? 
1. **📝 Crea un issue** usando el template de feature request
2. **🎯 Describe** claramente la funcionalidad deseada
3. **💭 Explica** por qué sería útil
4. **🎨 Incluye mockups** si es posible

### 📖 Documentación

Lee el archivo [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles sobre:
- Estándares de código
- Proceso de review
- Configuración del entorno de desarrollo
- Guidelines de commit

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **📁 Archivos de código** | 15+ archivos |
| **📝 Líneas de documentación** | 400+ líneas |
| **🎫 Templates GitHub** | 4 templates |
| **🔧 Scripts automatización** | 6 scripts |
| **📦 Dependencias** | 12 paquetes |
| **💾 Tamaño ejecutable** | ~150MB |
| **🎯 Cobertura documentación** | 100% |

## 🏆 Estado del Proyecto

### ✅ Completado
- 🖥️ Aplicación de escritorio nativa
- 🎨 Icono personalizado profesional  
- 📁 Estructura profesional de repositorio
- 📚 Documentación completa
- 🤝 Templates GitHub configurados
- ⚙️ Configuración IDE optimizada

### 🔄 En Desarrollo
- 🌍 Soporte para múltiples idiomas
- 📊 Exportación de reportes
- 🔄 Sincronización en la nube
- 📱 Versión móvil

### 💭 Futuras Mejoras
- 🤖 Integración con APIs de slicers
- 📈 Dashboard de estadísticas
- 🔧 Soporte para más materiales
- 🌐 Versión web pública

## 📞 Soporte

¿Necesitas ayuda? Tienes varias opciones:

- **🐛 Bug Reports**: [Crear Issue](https://github.com/tu-usuario/calculadora-precios-3d/issues/new?template=bug_report.md)
- **💡 Feature Requests**: [Sugerir Feature](https://github.com/tu-usuario/calculadora-precios-3d/issues/new?template=feature_request.md)  
- **❓ Preguntas**: [Hacer Pregunta](https://github.com/tu-usuario/calculadora-precios-3d/issues/new?template=question.md)
- **📧 Contacto Directo**: [Issues](https://github.com/tu-usuario/calculadora-precios-3d/issues)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Calculadora de Precios 3D

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**🚀 ¡Calculadora de Precios 3D - Profesionaliza tu negocio de impresión 3D!**

[![⭐ Star](https://img.shields.io/github/stars/tu-usuario/calculadora-precios-3d?style=social)](https://github.com/tu-usuario/calculadora-precios-3d/stargazers)
[![🍴 Fork](https://img.shields.io/github/forks/tu-usuario/calculadora-precios-3d?style=social)](https://github.com/tu-usuario/calculadora-precios-3d/network/members)
[![👁️ Watch](https://img.shields.io/github/watchers/tu-usuario/calculadora-precios-3d?style=social)](https://github.com/tu-usuario/calculadora-precios-3d/watchers)

**Hecho con ❤️ para la comunidad de impresión 3D**

</div>
