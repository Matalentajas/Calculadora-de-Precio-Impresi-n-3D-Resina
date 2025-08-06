import React from 'react';

const PrinterTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <div className="printer-type-selector premium-selector">
      <div className="selector-header">
        <div className="header-icon">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Base de la impresora */}
            <rect x="15" y="75" width="70" height="15" rx="3" fill="url(#gradient1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            
            {/* Cuerpo principal */}
            <rect x="20" y="35" width="60" height="40" rx="4" fill="url(#gradient2)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            
            {/* Pantalla */}
            <rect x="25" y="40" width="25" height="15" rx="2" fill="#1a1a2e" stroke="rgba(102,126,234,0.5)" strokeWidth="1"/>
            <rect x="27" y="42" width="21" height="11" rx="1" fill="url(#screenGradient)"/>
            
            {/* Cabezal de impresión */}
            <rect x="30" y="20" width="40" height="8" rx="2" fill="url(#gradient3)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <rect x="45" y="15" width="10" height="5" rx="1" fill="url(#gradient3)"/>
            
            {/* Soportes laterales */}
            <rect x="18" y="25" width="4" height="20" rx="1" fill="url(#gradient1)"/>
            <rect x="78" y="25" width="4" height="20" rx="1" fill="url(#gradient1)"/>
            
            {/* Plataforma de impresión */}
            <rect x="25" y="60" width="50" height="3" rx="1" fill="url(#platformGradient)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            
            {/* Filamento/objeto siendo impreso */}
            <circle cx="50" cy="58" r="3" fill="url(#printGradient)"/>
            <circle cx="50" cy="55" r="2" fill="rgba(240,147,251,0.8)"/>
            
            {/* Efectos de brillo */}
            <rect x="22" y="37" width="8" height="8" rx="1" fill="rgba(255,255,255,0.1)"/>
            <circle cx="48" cy="19" r="2" fill="rgba(255,255,255,0.3)"/>
            
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea"/>
                <stop offset="50%" stopColor="#764ba2"/>
                <stop offset="100%" stopColor="#667eea"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea"/>
                <stop offset="100%" stopColor="#764ba2"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#764ba2"/>
                <stop offset="100%" stopColor="#f093fb"/>
              </linearGradient>
              <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4aa"/>
                <stop offset="100%" stopColor="#667eea"/>
              </linearGradient>
              <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)"/>
              </linearGradient>
              <linearGradient id="printGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f093fb"/>
                <stop offset="100%" stopColor="#00d4aa"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>Sistema universal de cálculo de precios 3D</h2>
        <p>Selecciona el Tipo de Impresión</p>
      </div>
      
      <div className="type-options-grid">
        <div 
          className={`premium-type-card ${selectedType === 'resin' ? 'active' : ''}`}
          onClick={() => onTypeChange('resin')}
        >
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-icon resin-icon">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base de impresora SLA */}
                <rect x="8" y="45" width="44" height="8" rx="2" fill="url(#resinGradient1)" stroke="rgba(0,212,170,0.3)" strokeWidth="0.5"/>
                
                {/* Cuerpo principal más compacto */}
                <rect x="12" y="25" width="36" height="20" rx="3" fill="url(#resinGradient2)" stroke="rgba(0,212,170,0.2)" strokeWidth="0.5"/>
                
                {/* Pantalla LCD característica */}
                <rect x="16" y="28" width="16" height="10" rx="1" fill="#0a0a0a" stroke="rgba(0,212,170,0.6)" strokeWidth="1"/>
                <rect x="17" y="29" width="14" height="8" rx="0.5" fill="url(#lcdGradient)"/>
                
                {/* Plataforma de construcción (Build Platform) */}
                <rect x="15" y="20" width="30" height="2" rx="1" fill="url(#platformGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                
                {/* Vat de resina */}
                <rect x="18" y="15" width="24" height="3" rx="1" fill="rgba(0,212,170,0.2)" stroke="rgba(0,212,170,0.4)" strokeWidth="0.5"/>
                
                {/* LED UV array */}
                <circle cx="20" cy="12" r="1" fill="#9333ea"/>
                <circle cx="25" cy="12" r="1" fill="#9333ea"/>
                <circle cx="30" cy="12" r="1" fill="#9333ea"/>
                <circle cx="35" cy="12" r="1" fill="#9333ea"/>
                <circle cx="40" cy="12" r="1" fill="#9333ea"/>
                
                {/* Objeto siendo impreso (layer por layer) */}
                <rect x="28" y="16" width="4" height="2" rx="0.5" fill="rgba(240,147,251,0.8)"/>
                <rect x="29" y="14" width="2" height="2" rx="0.5" fill="rgba(240,147,251,0.6)"/>
                
                {/* Ventilación */}
                <rect x="38" y="30" width="8" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                <rect x="38" y="33" width="8" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                
                <defs>
                  <linearGradient id="resinGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4aa"/>
                    <stop offset="100%" stopColor="#667eea"/>
                  </linearGradient>
                  <linearGradient id="resinGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#00d4aa"/>
                  </linearGradient>
                  <linearGradient id="lcdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4aa"/>
                    <stop offset="50%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#00d4aa"/>
                  </linearGradient>
                  <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Impresión por Resina</h3>
            <p>Tecnología SLA/DLP/MSLA</p>
            <div className="card-accent"></div>
          </div>
        </div>
        
        <div 
          className={`premium-type-card ${selectedType === 'filament' ? 'active' : ''}`}
          onClick={() => onTypeChange('filament')}
        >
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-icon filament-icon">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base de impresora FDM */}
                <rect x="8" y="45" width="44" height="8" rx="2" fill="url(#filamentGradient1)" stroke="rgba(240,147,251,0.3)" strokeWidth="0.5"/>
                
                {/* Cuerpo principal */}
                <rect x="12" y="28" width="36" height="17" rx="3" fill="url(#filamentGradient2)" stroke="rgba(240,147,251,0.2)" strokeWidth="0.5"/>
                
                {/* Marcos verticales (típico de FDM) */}
                <rect x="10" y="15" width="3" height="20" rx="1" fill="url(#frameGradient)"/>
                <rect x="47" y="15" width="3" height="20" rx="1" fill="url(#frameGradient)"/>
                
                {/* Eje X con cabezal extrusor */}
                <rect x="15" y="18" width="30" height="3" rx="1" fill="url(#axisGradient)"/>
                <rect x="25" y="16" width="8" height="7" rx="2" fill="url(#extruderGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                
                {/* Hotend/Nozzle */}
                <rect x="28" y="20" width="2" height="4" rx="0.5" fill="#ff6b6b"/>
                <circle cx="29" cy="25" r="0.8" fill="#ff4444"/>
                
                {/* Plataforma de impresión calentada */}
                <rect x="18" y="35" width="24" height="2" rx="1" fill="url(#bedGradient)" stroke="rgba(255,147,0,0.4)" strokeWidth="0.5"/>
                
                {/* Objeto siendo impreso (capas FDM) */}
                <rect x="26" y="32" width="8" height="1" rx="0.5" fill="rgba(240,147,251,0.9)"/>
                <rect x="27" y="30" width="6" height="1" rx="0.5" fill="rgba(240,147,251,0.7)"/>
                <rect x="28" y="28" width="4" height="1" rx="0.5" fill="rgba(240,147,251,0.5)"/>
                
                {/* Filamento spool */}
                <circle cx="45" cy="12" r="4" fill="none" stroke="url(#spoolGradient)" strokeWidth="1.5"/>
                <circle cx="45" cy="12" r="2" fill="url(#spoolGradient)"/>
                
                {/* Filamento path */}
                <path d="M41 12 Q35 15 29 18" stroke="rgba(240,147,251,0.6)" strokeWidth="1" fill="none"/>
                
                {/* Pantalla/Control */}
                <rect x="16" y="31" width="12" height="8" rx="1" fill="#1a1a2e" stroke="rgba(240,147,251,0.5)" strokeWidth="0.5"/>
                <rect x="17" y="32" width="10" height="6" rx="0.5" fill="url(#displayGradient)"/>
                
                <defs>
                  <linearGradient id="filamentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f093fb"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                  <linearGradient id="filamentGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#764ba2"/>
                    <stop offset="100%" stopColor="#f093fb"/>
                  </linearGradient>
                  <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                  <linearGradient id="axisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)"/>
                  </linearGradient>
                  <linearGradient id="extruderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#764ba2"/>
                    <stop offset="100%" stopColor="#f093fb"/>
                  </linearGradient>
                  <linearGradient id="bedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff9500"/>
                    <stop offset="100%" stopColor="#ff6b00"/>
                  </linearGradient>
                  <linearGradient id="spoolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f093fb"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                  <linearGradient id="displayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f093fb"/>
                    <stop offset="50%" stopColor="#764ba2"/>
                    <stop offset="100%" stopColor="#f093fb"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Impresión por Filamento</h3>
            <p>Tecnología FDM/FFF</p>
            <div className="card-accent"></div>
          </div>
        </div>

        <div 
          className={`premium-type-card ${selectedType === 'scale' ? 'active' : ''}`}
          onClick={() => onTypeChange('scale')}
        >
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-icon scale-icon">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base de la calculadora */}
                <rect x="8" y="42" width="44" height="12" rx="3" fill="url(#scaleGradient1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>
                
                {/* Pantalla principal */}
                <rect x="12" y="25" width="36" height="17" rx="2" fill="url(#scaleGradient2)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5"/>
                
                {/* Display LCD */}
                <rect x="16" y="28" width="28" height="8" rx="1" fill="#0a0a0a" stroke="rgba(59,130,246,0.6)" strokeWidth="1"/>
                <rect x="17" y="29" width="26" height="6" rx="0.5" fill="url(#displayScaleGradient)"/>
                
                {/* Números en la pantalla */}
                <text x="20" y="33" fill="#3b82f6" fontSize="4" fontWeight="bold">125%</text>
                
                {/* Figuras en escala */}
                <g transform="translate(20, 10)">
                  {/* Figura original */}
                  <rect x="0" y="8" width="6" height="2" rx="1" fill="rgba(251,191,36,0.6)" stroke="rgba(251,191,36,0.8)" strokeWidth="0.3"/>
                  <rect x="1" y="5" width="4" height="3" rx="0.5" fill="rgba(251,191,36,0.9)"/>
                  <text x="3" y="2" fill="#6b7280" fontSize="2" textAnchor="middle">A</text>
                </g>
                
                <g transform="translate(32, 8)">
                  {/* Figura escalada */}
                  <rect x="0" y="10" width="8" height="2.5" rx="1" fill="rgba(34,197,94,0.6)" stroke="rgba(34,197,94,0.8)" strokeWidth="0.3"/>
                  <rect x="1" y="6" width="6" height="4" rx="0.5" fill="rgba(34,197,94,0.9)"/>
                  <text x="4" y="2" fill="#6b7280" fontSize="2" textAnchor="middle">B</text>
                </g>
                
                {/* Flecha de escalado */}
                <path d="M28 15 L32 15 M30 13 L32 15 L30 17" stroke="#3b82f6" strokeWidth="1" fill="none"/>
                
                {/* Botones de la calculadora */}
                <circle cx="20" cy="45" r="1.5" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="0.5"/>
                <circle cx="26" cy="45" r="1.5" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="0.5"/>
                <circle cx="32" cy="45" r="1.5" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="0.5"/>
                <circle cx="38" cy="45" r="1.5" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="0.5"/>
                
                <defs>
                  <linearGradient id="scaleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#1d4ed8"/>
                  </linearGradient>
                  <linearGradient id="scaleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1d4ed8"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                  <linearGradient id="displayScaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="50%" stopColor="#1d4ed8"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Calculadora de Escalado</h3>
            <p>Figuras y Peanas 3D</p>
            <div className="card-accent"></div>
          </div>
        </div>

        <div 
          className={`premium-type-card ${selectedType === 'time-cost' ? 'active' : ''}`}
          onClick={() => onTypeChange('time-cost')}
        >
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-icon time-cost-icon">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Reloj base */}
                <circle cx="30" cy="30" r="22" fill="url(#timeGradient1)" stroke="rgba(130,87,230,0.3)" strokeWidth="1"/>
                <circle cx="30" cy="30" r="18" fill="url(#timeGradient2)" stroke="rgba(130,87,230,0.2)" strokeWidth="0.5"/>
                
                {/* Marcas del reloj */}
                <g stroke="rgba(255,255,255,0.6)" strokeWidth="1">
                  <line x1="30" y1="14" x2="30" y2="18"/>
                  <line x1="46" y1="30" x2="42" y2="30"/>
                  <line x1="30" y1="46" x2="30" y2="42"/>
                  <line x1="14" y1="30" x2="18" y2="30"/>
                </g>
                
                {/* Agujas del reloj */}
                <line x1="30" y1="30" x2="30" y2="22" stroke="#8257e6" strokeWidth="2" strokeLinecap="round"/>
                <line x1="30" y1="30" x2="36" y2="30" stroke="#8257e6" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="30" cy="30" r="2" fill="#8257e6"/>
                
                {/* Símbolo de dinero */}
                <circle cx="45" cy="15" r="8" fill="rgba(34,197,94,0.9)" stroke="rgba(34,197,94,1)" strokeWidth="0.5"/>
                <text x="45" y="18" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">$</text>
                
                {/* Impresora pequeña */}
                <g transform="translate(8, 8)">
                  <rect x="0" y="8" width="12" height="6" rx="1" fill="rgba(59,130,246,0.8)"/>
                  <rect x="2" y="6" width="8" height="2" rx="0.5" fill="rgba(59,130,246,0.6)"/>
                  <circle cx="6" cy="4" r="1" fill="rgba(240,147,251,0.8)"/>
                </g>
                
                <defs>
                  <linearGradient id="timeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8257e6"/>
                    <stop offset="100%" stopColor="#667eea"/>
                  </linearGradient>
                  <linearGradient id="timeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(26,26,46,0.8)"/>
                    <stop offset="100%" stopColor="rgba(26,26,46,0.6)"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Tiempos y Costos</h3>
            <p>Cálculo completo de impresión</p>
            <div className="card-accent"></div>
          </div>
        </div>

        <div 
          className={`premium-type-card ${selectedType === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTypeChange('dashboard')}
        >
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-icon dashboard-icon">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Panel principal */}
                <rect x="5" y="10" width="50" height="35" rx="3" fill="url(#dashGradient1)" stroke="rgba(130,87,230,0.3)" strokeWidth="1"/>
                
                {/* Gráficos - Panel 1 */}
                <rect x="10" y="15" width="18" height="12" rx="2" fill="rgba(26,26,46,0.8)" stroke="rgba(130,87,230,0.4)" strokeWidth="0.5"/>
                <polyline points="12,25 16,22 20,24 24,20 26,22" stroke="#22c55e" strokeWidth="1.5" fill="none"/>
                
                {/* Gráficos - Panel 2 */}
                <rect x="32" y="15" width="18" height="12" rx="2" fill="rgba(26,26,46,0.8)" stroke="rgba(130,87,230,0.4)" strokeWidth="0.5"/>
                <rect x="34" y="22" width="2" height="3" fill="#8257e6"/>
                <rect x="37" y="20" width="2" height="5" fill="#8257e6"/>
                <rect x="40" y="18" width="2" height="7" fill="#8257e6"/>
                <rect x="43" y="21" width="2" height="4" fill="#8257e6"/>
                <rect x="46" y="19" width="2" height="6" fill="#8257e6"/>
                
                {/* Panel inferior - Métricas */}
                <rect x="10" y="30" width="12" height="10" rx="1" fill="rgba(26,26,46,0.6)" stroke="rgba(34,197,94,0.4)" strokeWidth="0.5"/>
                <circle cx="16" cy="35" r="3" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1"/>
                <text x="16" y="37" fill="#22c55e" fontSize="3" fontWeight="bold" textAnchor="middle">✓</text>
                
                <rect x="25" y="30" width="12" height="10" rx="1" fill="rgba(26,26,46,0.6)" stroke="rgba(239,68,68,0.4)" strokeWidth="0.5"/>
                <circle cx="31" cy="35" r="3" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="1"/>
                <text x="31" y="37" fill="#ef4444" fontSize="3" fontWeight="bold" textAnchor="middle">✗</text>
                
                <rect x="40" y="30" width="10" height="10" rx="1" fill="rgba(26,26,46,0.6)" stroke="rgba(251,191,36,0.4)" strokeWidth="0.5"/>
                <circle cx="45" cy="35" r="3" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="1"/>
                <text x="45" y="37" fill="#fbbf24" fontSize="3" fontWeight="bold" textAnchor="middle">$</text>
                
                {/* Iconos de estado */}
                <circle cx="12" cy="48" r="2" fill="#22c55e"/>
                <circle cx="18" cy="48" r="2" fill="#8257e6"/>
                <circle cx="24" cy="48" r="2" fill="#ef4444"/>
                
                <defs>
                  <linearGradient id="dashGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(130,87,230,0.2)"/>
                    <stop offset="100%" stopColor="rgba(102,126,234,0.1)"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Dashboard Proyectos</h3>
            <p>Gestión y análisis completo</p>
            <div className="card-accent"></div>
          </div>
        </div>

        <div 
          className={`premium-type-card ${selectedType === 'supports' ? 'active' : ''}`}
          onClick={() => onTypeChange('supports')}
        >
          <div className="card-glow"></div>
          <div className="card-content">
            <div className="card-icon supports-icon">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base de la plataforma */}
                <rect x="8" y="45" width="44" height="8" rx="2" fill="url(#supportGradient1)" stroke="rgba(130,87,230,0.3)" strokeWidth="0.5"/>
                
                {/* Objeto principal a imprimir */}
                <path d="M20 35 Q25 25 35 30 Q40 35 35 45 L25 45 Z" fill="url(#supportGradient2)" stroke="rgba(130,87,230,0.4)" strokeWidth="0.5"/>
                
                {/* Soportes estructurales */}
                <g stroke="#8257e6" strokeWidth="1" fill="none">
                  {/* Soporte 1 */}
                  <line x1="22" y1="45" x2="25" y2="35"/>
                  <circle cx="25" cy="35" r="0.8" fill="#8257e6"/>
                  
                  {/* Soporte 2 */}
                  <line x1="28" y1="45" x2="30" y2="32"/>
                  <circle cx="30" cy="32" r="0.8" fill="#8257e6"/>
                  
                  {/* Soporte 3 */}
                  <line x1="34" y1="45" x2="35" y2="38"/>
                  <circle cx="35" cy="38" r="0.8" fill="#8257e6"/>
                  
                  {/* Soporte 4 */}
                  <line x1="38" y1="45" x2="38" y2="40"/>
                  <circle cx="38" cy="40" r="0.8" fill="#8257e6"/>
                </g>
                
                {/* Ángulos críticos indicados */}
                <g stroke="rgba(239,68,68,0.8)" strokeWidth="0.8" fill="none" strokeDasharray="1,1">
                  <path d="M32 30 L36 34"/>
                  <path d="M25 35 L28 38"/>
                </g>
                
                {/* Indicadores de ángulo */}
                <text x="38" y="32" fill="#ef4444" fontSize="4" fontWeight="bold">45°</text>
                <text x="26" y="40" fill="#ef4444" fontSize="4" fontWeight="bold">30°</text>
                
                {/* Cálculo inteligente - cerebro */}
                <g transform="translate(45, 8)">
                  <circle cx="0" cy="0" r="6" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1"/>
                  <path d="M-3,-2 Q0,-4 3,-2 Q3,0 0,2 Q-3,0 -3,-2" fill="#22c55e"/>
                  <circle cx="-1" cy="-1" r="0.5" fill="white"/>
                  <circle cx="1" cy="-1" r="0.5" fill="white"/>
                </g>
                
                {/* Optimización - rayos */}
                <g stroke="rgba(34,197,94,0.6)" strokeWidth="0.5">
                  <line x1="42" y1="12" x2="38" y2="16"/>
                  <line x1="48" y1="12" x2="42" y2="18"/>
                  <line x1="45" y1="5" x2="41" y2="9"/>
                </g>
                
                <defs>
                  <linearGradient id="supportGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                  <linearGradient id="supportGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(130,87,230,0.3)"/>
                    <stop offset="100%" stopColor="rgba(130,87,230,0.6)"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Soportes Optimizados</h3>
            <p>Cálculo inteligente automático</p>
            <div className="card-accent"></div>
          </div>
        </div>
      </div>

      <div className="selector-footer">
        <div className="version-badge">v2.0.0</div>
        <p>Sistema profesional con gestión de perfiles de impresoras</p>
      </div>
    </div>
  );
};

export default PrinterTypeSelector;

