# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a la Calculadora de Precios 3D! Esta guía te ayudará a comenzar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto sigue un código de conducta para asegurar un ambiente acogedor para todos. Al participar, te comprometes a mantener un comportamiento respetuoso y profesional.

### Comportamientos Esperados:
- ✅ Usar lenguaje acogedor e inclusivo
- ✅ Respetar diferentes puntos de vista y experiencias
- ✅ Aceptar críticas constructivas con gracia
- ✅ Enfocarse en lo que es mejor para la comunidad

### Comportamientos Inaceptables:
- ❌ Lenguaje o imágenes sexualizadas
- ❌ Comentarios despectivos o ataques personales
- ❌ Acoso público o privado
- ❌ Publicar información privada de otros sin permiso

## 🛠️ ¿Cómo puedo contribuir?

### 🐛 Reportar Bugs
- Usa las **GitHub Issues** para reportar bugs
- Incluye pasos detallados para reproducir el problema
- Menciona tu sistema operativo y versión de Node.js
- Adjunta capturas de pantalla si es relevante

### 💡 Sugerir Funcionalidades
- Abre un **Issue** con la etiqueta "enhancement"
- Describe claramente la funcionalidad propuesta
- Explica por qué sería útil para los usuarios
- Considera la implementación técnica

### 🔧 Contribuir Código
- Corregir bugs reportados
- Implementar nuevas funcionalidades
- Mejorar la documentación
- Optimizar el rendimiento
- Mejorar la interfaz de usuario

### 📝 Mejorar Documentación
- Corregir errores tipográficos
- Añadir ejemplos de uso
- Traducir documentación
- Crear tutoriales o guías

## ⚙️ Configuración del Entorno

### Prerrequisitos
```bash
# Node.js 18+ y npm
node --version  # v18.0.0+
npm --version   # 8.0.0+
```

### Instalación
```bash
# 1. Fork el repositorio en GitHub
# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/calculadora-precios-3d.git
cd calculadora-precios-3d

# 3. Instalar dependencias
npm install

# 4. Configurar el repositorio upstream
git remote add upstream https://github.com/USUARIO_ORIGINAL/calculadora-precios-3d.git
```

### Verificar la Instalación
```bash
# Modo desarrollo web
npm run dev

# Modo desarrollo Electron
npm run electron-dev

# Linting
npm run lint

# Build de producción
npm run build
```

## 🔄 Proceso de Desarrollo

### 1. Crear una Rama
```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear nueva rama
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 2. Desarrollo
- Haz cambios pequeños y incrementales
- Commit frecuentemente con mensajes descriptivos
- Ejecuta las pruebas regularmente
- Mantén el código limpio y documentado

### 3. Testing
```bash
# Probar en modo desarrollo
npm run electron-dev

# Probar build de producción
npm run package-win

# Verificar linting
npm run lint
```

### 4. Commit y Push
```bash
# Staging de cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: añadir calculadora de tiempo de impresión"

# Push a tu fork
git push origin feature/nombre-descriptivo
```

## 📏 Estándares de Código

### JavaScript/React
- **ES6+** con sintaxis moderna
- **Componentes funcionales** con hooks
- **Nombres de variables** en español para consistencia
- **Destructuring** cuando sea apropiado
- **Arrow functions** para funciones inline

```javascript
// ✅ Bueno
const [precioResina, setPrecioResina] = useState(27);
const calcularCosteTotal = () => costeResina + costeLuz + costePostProcesado;

// ❌ Evitar
var resinPrice = 27;
function calculateTotalCost() {
  return resinPrice + lightCost + postProcessingCost;
}
```

### CSS
- **Mobile-first** approach
- **CSS Grid y Flexbox** para layouts
- **Custom properties** para variables
- **BEM methodology** para clases cuando sea apropiado
- **Glassmorphism** siguiendo el tema establecido

```css
/* ✅ Bueno */
.panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* ❌ Evitar */
.panel {
  background: white;
  opacity: 0.8;
}
```

### Estructura de Archivos
```
src/
├── components/          # Componentes reutilizables
├── hooks/              # Custom hooks
├── utils/              # Funciones utilitarias
├── styles/             # Estilos globales
└── assets/             # Recursos estáticos
```

## 🔀 Proceso de Pull Request

### Antes de Crear el PR
- [ ] ✅ El código pasa todos los lints
- [ ] ✅ La aplicación funciona en modo desarrollo
- [ ] ✅ La aplicación se construye correctamente
- [ ] ✅ Los cambios están bien documentados
- [ ] ✅ Se actualizó el CHANGELOG si es necesario

### Crear el Pull Request
1. **Título descriptivo**: `feat: añadir calculadora de tiempo`
2. **Descripción detallada** de los cambios
3. **Referencias** a issues relacionados
4. **Capturas de pantalla** si hay cambios visuales
5. **Lista de verificación** completada

### Template de PR
```markdown
## 📝 Descripción
Breve descripción de los cambios realizados.

## 🔗 Issues Relacionados
Fixes #123

## 📸 Capturas de Pantalla
(Si aplica)

## ✅ Lista de Verificación
- [ ] El código sigue los estándares del proyecto
- [ ] Se añadieron tests para nuevas funcionalidades
- [ ] La documentación fue actualizada
- [ ] Los cambios fueron probados localmente
```

## 🐛 Reportar Bugs

### Información Requerida
- **Título descriptivo** del problema
- **Pasos para reproducir** el bug
- **Comportamiento esperado** vs **comportamiento actual**
- **Capturas de pantalla** o videos
- **Información del sistema**:
  - Sistema operativo
  - Versión de Node.js
  - Versión de la aplicación

### Template de Bug Report
```markdown
## 🐛 Descripción del Bug
Descripción clara y concisa del problema.

## 🔄 Pasos para Reproducir
1. Ir a '...'
2. Hacer clic en '....'
3. Scrollear hasta '....'
4. Ver error

## ✅ Comportamiento Esperado
Lo que debería pasar.

## ❌ Comportamiento Actual
Lo que está pasando.

## 💻 Información del Sistema
- OS: [e.g. Windows 11]
- Node.js: [e.g. 18.17.0]
- Versión de la app: [e.g. 1.0.0]

## 📎 Información Adicional
Cualquier otro contexto sobre el problema.
```

## 💡 Sugerir Mejoras

### Template de Feature Request
```markdown
## 🚀 Descripción de la Funcionalidad
Descripción clara de lo que quieres que se añada.

## 💭 Motivación
¿Por qué sería útil esta funcionalidad?

## 📋 Solución Propuesta
Describe cómo te imaginas que funcionaría.

## 🔄 Alternativas Consideradas
Otras formas de resolver el problema.

## 📎 Contexto Adicional
Cualquier otra información relevante.
```

## 🏷️ Etiquetas de Issues

- `bug` - Algo no está funcionando
- `enhancement` - Nueva funcionalidad o solicitud
- `documentation` - Mejoras o adiciones a la documentación
- `good first issue` - Bueno para nuevos contribuidores
- `help wanted` - Se necesita ayuda extra
- `question` - Más información es requerida

## 🎉 Reconocimiento

Todos los contribuidores serán reconocidos en:
- README principal del proyecto
- Sección de créditos en la aplicación
- Lista de contribuidores de GitHub

## 📞 ¿Necesitas Ayuda?

- **GitHub Issues** para preguntas sobre el proyecto
- **GitHub Discussions** para conversaciones generales
- **Email** para asuntos privados

---

¡Gracias por contribuir a hacer que la Calculadora de Precios 3D sea mejor! 🚀
