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
      </div>

      <div className="selector-footer">
        <div className="version-badge">v2.0.0</div>
        <p>Sistema profesional con gestión de perfiles de impresoras</p>
      </div>
    </div>
  );
};

export default PrinterTypeSelector;

