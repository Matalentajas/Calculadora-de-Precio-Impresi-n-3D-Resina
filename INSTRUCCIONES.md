# 🎯 Cómo Usar la Calculadora de Precios 3D

## 🚀 Inicio Rápido

### Opción 1: Ejecutable Directo (Recomendado)
Simplemente haz doble clic en:
```
CalculadoraPrecios3D.exe
```

### Opción 2: Launcher Inteligente
- **Windows (Básico):** Doble clic en `IniciarCalculadora3D.bat`
- **Windows (Avanzado):** Doble clic en `IniciarCalculadora3D.ps1`

## 🔧 Resolución de Problemas

### Si la aplicación no inicia:
1. **Verifica que tienes Windows 10/11** (64-bit)
2. **Ejecuta como administrador** si es necesario
3. **Usa el launcher automático:**
   ```powershell
   .\IniciarCalculadora3D.ps1
   ```

### Si necesitas reconstruir la aplicación:
```bash
npm install
npm run app:dist
```

## 📱 Funcionalidades

✅ **Calculadora de Resina 3D**
- Cálculo de costes por volumen
- Gestión de perfiles de resina
- Tiempo de curado y electricidad

✅ **Calculadora de Filamento 3D**  
- Cálculo de costes por peso
- Gestión de perfiles de filamento
- Tiempo de impresión y electricidad

✅ **Gestión de Perfiles**
- Guarda tus configuraciones favoritas
- Importa/Exporta perfiles
- Perfiles predefinidos incluidos

## 🎮 Controles

- **Pestañas superiores:** Cambiar entre Resina y Filamento
- **Campos numéricos:** Introduce valores directamente
- **Desplegables:** Selecciona perfiles guardados
- **Botones de acción:** Calcular, Guardar, Limpiar

## 💡 Consejos de Uso

1. **Guarda perfiles** para materiales que uses frecuentemente
2. **Incluye gastos de electricidad** para cálculos más precisos
3. **Usa el tiempo de impresión** para calcular costes por hora
4. **Exporta tus perfiles** como backup

## 🔄 Actualizaciones

La aplicación se actualiza automáticamente desde GitHub. 
Si hay problemas, descarga la última versión desde:
[Releases](https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/releases)

---

**Versión:** 2.0.0 | **Plataforma:** Windows 64-bit | **Tecnología:** Electron + React
