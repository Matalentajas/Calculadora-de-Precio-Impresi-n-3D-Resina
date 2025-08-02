# Calculadora de Precios 3D - Launcher Optimizado
# Version: 2.0.0

param(
    [switch]$Silent,
    [switch]$Debug
)

# Configuracion
$AppName = "Calculadora de Precios 3D"
$ExePath = "dist-app\win-unpacked\Calculadora 3D.exe"
$LogFile = "launcher.log"

# Funcion para escribir logs
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    
    if ($Debug) {
        Write-Host $LogEntry -ForegroundColor $(
            switch ($Level) {
                "ERROR" { "Red" }
                "WARN" { "Yellow" }
                "SUCCESS" { "Green" }
                default { "White" }
            }
        )
    }
    
    if (-not $Silent) {
        Add-Content -Path $LogFile -Value $LogEntry -ErrorAction SilentlyContinue
    }
}

# Funcion principal
function Start-Calculator {
    try {
        if (-not $Silent) {
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host "   $AppName" -ForegroundColor Green
            Write-Host "   Launcher Optimizado v2.0.0" -ForegroundColor Gray
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host ""
        }

        Write-Log "Iniciando $AppName..."

        # Verificar si el ejecutable existe
        if (Test-Path $ExePath) {
            Write-Log "Ejecutable encontrado: $ExePath" "SUCCESS"
            
            if (-not $Silent) {
                Write-Host "Ejecutando aplicacion..." -ForegroundColor Green
            }
            
            # Ejecutar la aplicacion de manera optimizada
            $ProcessStartInfo = New-Object System.Diagnostics.ProcessStartInfo
            $ProcessStartInfo.FileName = Resolve-Path $ExePath
            $ProcessStartInfo.UseShellExecute = $true
            $ProcessStartInfo.WindowStyle = "Normal"
            
            $Process = [System.Diagnostics.Process]::Start($ProcessStartInfo)
            
            Write-Log "Aplicacion iniciada exitosamente (PID: $($Process.Id))" "SUCCESS"
            
            if (-not $Silent) {
                Write-Host "Aplicacion iniciada exitosamente!" -ForegroundColor Green
                Start-Sleep -Seconds 1
            }
            
            return $true
        }
        else {
            Write-Log "Ejecutable no encontrado: $ExePath" "WARN"
            
            if (-not $Silent) {
                Write-Host "Ejecutable no encontrado. Intentando construir..." -ForegroundColor Yellow
            }
            
            # Verificar Node.js
            try {
                $NodeVersion = & npm --version 2>$null
                Write-Log "Node.js/npm disponible: v$NodeVersion"
                
                if (-not $Silent) {
                    Write-Host "Construyendo aplicacion... (esto puede tomar unos minutos)" -ForegroundColor Yellow
                }
                
                # Construir la aplicacion
                $BuildProcess = Start-Process -FilePath "npm" -ArgumentList "run", "app:dist" -Wait -PassThru -NoNewWindow
                
                if ($BuildProcess.ExitCode -eq 0 -and (Test-Path $ExePath)) {
                    Write-Log "Aplicacion construida exitosamente" "SUCCESS"
                    
                    if (-not $Silent) {
                        Write-Host "Aplicacion construida exitosamente!" -ForegroundColor Green
                        Write-Host "Iniciando..." -ForegroundColor Green
                    }
                    
                    # Reintentar ejecucion
                    return Start-Calculator
                }
                else {
                    Write-Log "Error al construir la aplicacion (Exit Code: $($BuildProcess.ExitCode))" "ERROR"
                    throw "No se pudo construir la aplicacion"
                }
            }
            catch {
                Write-Log "Node.js/npm no disponible o error en construccion: $($_.Exception.Message)" "ERROR"
                
                if (-not $Silent) {
                    Write-Host "ERROR: Node.js no esta instalado o hubo un error en la construccion." -ForegroundColor Red
                    Write-Host "Por favor:" -ForegroundColor Yellow
                    Write-Host "1. Instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
                    Write-Host "2. Ejecuta 'npm install' en este directorio" -ForegroundColor Yellow
                    Write-Host "3. Vuelve a ejecutar este launcher" -ForegroundColor Yellow
                }
                
                return $false
            }
        }
    }
    catch {
        Write-Log "Error critico: $($_.Exception.Message)" "ERROR"
        
        if (-not $Silent) {
            Write-Host "ERROR CRITICO: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        return $false
    }
}

# Ejecucion principal
try {
    Set-Location -Path $PSScriptRoot
    $Success = Start-Calculator
    
    if (-not $Success -and -not $Silent) {
        Write-Host ""
        Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
    exit $(if ($Success) { 0 } else { 1 })
}
catch {
    Write-Log "Error fatal en el launcher: $($_.Exception.Message)" "ERROR"
    
    if (-not $Silent) {
        Write-Host "ERROR FATAL: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
    exit 1
}
