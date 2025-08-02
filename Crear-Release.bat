@echo off
title Crear Release de Calculadora 3D
color 0A

echo.
echo ========================================
echo   CREAR RELEASE CALCULADORA 3D
echo ========================================
echo.

set /p version="Ingresa la version (ej: v2.0.1): "

if "%version%"=="" (
    echo Error: Version requerida
    pause
    exit /b 1
)

echo.
echo Creando release %version%...
echo.

REM Crear el tag
git tag %version%
if errorlevel 1 (
    echo Error creando tag
    pause
    exit /b 1
)

REM Subir el tag
git push origin %version%
if errorlevel 1 (
    echo Error subiendo tag
    pause
    exit /b 1
)

echo.
echo ========================================
echo   RELEASE CREADO EXITOSAMENTE
echo ========================================
echo.
echo Tag: %version%
echo GitHub Actions compilara automaticamente
echo la aplicacion y creara el release.
echo.
echo Revisa: https://github.com/Matalentajas/Calculadora-de-Precio-Impresi-n-3D-Resina/releases
echo.
pause
