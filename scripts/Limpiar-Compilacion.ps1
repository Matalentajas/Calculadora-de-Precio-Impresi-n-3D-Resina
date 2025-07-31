# Script para limpiar archivos temporales de compilación
Write-Host "🧹 Limpiando archivos temporales..." -ForegroundColor Cyan

# Archivos de respaldo de compilación
$backupFiles = @(
    "CalculadoraPrecios3D.exe.backup",
    "launcher.exe.backup"
)

foreach ($file in $backupFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "🗑️ Eliminado: $file" -ForegroundColor Yellow
    }
}

# Archivos temporales de compilación
$tempFiles = @(
    "*.pdb",
    "*.ilk"
)

foreach ($pattern in $tempFiles) {
    $files = Get-ChildItem -Name $pattern -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        Remove-Item $file -Force
        Write-Host "🗑️ Eliminado: $file" -ForegroundColor Yellow
    }
}

Write-Host "✅ Limpieza completada" -ForegroundColor Green
