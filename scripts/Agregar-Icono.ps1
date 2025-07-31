# Script para agregar icono al ejecutable usando PowerShell
param(
    [string]$ExecutablePath = "CalculadoraPrecios3D.exe",
    [string]$IconPath = "public/app-icon.ico"
)

Write-Host "🔧 Agregando icono al ejecutable..." -ForegroundColor Cyan

# Verificar que los archivos existen
if (-not (Test-Path $ExecutablePath)) {
    Write-Host "❌ Error: No se encontró el ejecutable $ExecutablePath" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $IconPath)) {
    Write-Host "❌ Error: No se encontró el icono $IconPath" -ForegroundColor Red
    exit 1
}

# Usando .NET para agregar el icono
try {
    Add-Type -AssemblyName System.Drawing
    
    # Crear una copia de respaldo
    $backupPath = $ExecutablePath + ".backup"
    Copy-Item $ExecutablePath $backupPath -Force
    Write-Host "✅ Copia de respaldo creada: $backupPath" -ForegroundColor Green
    
    # Método alternativo: usar mt.exe si está disponible
    $mtPath = @(
        "${env:ProgramFiles(x86)}\Windows Kits\10\bin\x64\mt.exe",
        "${env:ProgramFiles(x86)}\Windows Kits\8.1\bin\x64\mt.exe",
        "${env:ProgramFiles(x86)}\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\x64\mt.exe"
    ) | Where-Object { Test-Path $_ } | Select-Object -First 1
    
    if ($mtPath) {
        Write-Host "✅ Encontrado Manifest Tool: $mtPath" -ForegroundColor Green
        # Aquí se podría usar mt.exe para manipular recursos
    }
    
    # Usando rcedit si está disponible (herramienta de Electron)
    $rceditPath = @(
        "node_modules\.bin\rcedit.exe",
        "${env:APPDATA}\npm\rcedit.exe"
    ) | Where-Object { Test-Path $_ } | Select-Object -First 1
    
    if ($rceditPath) {
        Write-Host "✅ Encontrado rcedit: $rceditPath" -ForegroundColor Green
        & $rceditPath $ExecutablePath --set-icon $IconPath
        if ($LASTEXITCODE -eq 0) {
            Write-Host "🎉 ¡Icono agregado exitosamente con rcedit!" -ForegroundColor Green
            return
        }
    }
    
    # Método manual usando Add-Type y P/Invoke
    $signature = @'
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern IntPtr BeginUpdateResource(string pFileName, bool bDeleteExistingResources);
    
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool UpdateResource(IntPtr hUpdate, string lpType, string lpName, ushort wLanguage, byte[] lpData, uint cbData);
    
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool EndUpdateResource(IntPtr hUpdate, bool fDiscard);
'@
    
    Add-Type -MemberDefinition $signature -Name Win32Utils -Namespace ResourceUpdate
    
    # Leer el archivo de icono
    $iconBytes = [System.IO.File]::ReadAllBytes((Resolve-Path $IconPath).Path)
    
    Write-Host "✅ Icono leído: $($iconBytes.Length) bytes" -ForegroundColor Green
    
    Write-Host "ℹ️ Nota: Para agregar completamente el icono necesitas Resource Hacker o rcedit" -ForegroundColor Yellow
    Write-Host "   Puedes descargarlo de: http://www.angusj.com/resourcehacker/" -ForegroundColor Yellow
    Write-Host "   O instalar rcedit con: npm install -g rcedit" -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ Error al procesar el icono: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "✅ Script completado" -ForegroundColor Green
