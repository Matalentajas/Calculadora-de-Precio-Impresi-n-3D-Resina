import React, { useState, useEffect } from 'react';
import './App.css';
import PrinterTypeSelector from './components/PrinterTypeSelector';
import PrinterProfileManager from './components/PrinterProfileManager';
import FilamentCalculator from './components/FilamentCalculator';
import ResinCalculator from './components/ResinCalculator';

export default function CalculadoraPrecios3D() {
  // Estados principales
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPrinterType, setSelectedPrinterType] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  
  // Estados persistentes
  const [printerProfiles, setPrinterProfiles] = useState(() => {
    try {
      const savedProfiles = localStorage.getItem('printerProfiles3D');
      return savedProfiles ? JSON.parse(savedProfiles) : [];
    } catch (error) {
      console.error('Error al cargar perfiles:', error);
      return [];
    }
  });

  const [savedPieces, setSavedPieces] = useState(() => {
    try {
      const pieces = localStorage.getItem('savedPieces3D');
      return pieces ? JSON.parse(pieces) : [];
    } catch (error) {
      console.error('Error al cargar piezas:', error);
      return [];
    }
  });

  // Efectos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Persistencia de perfiles
  useEffect(() => {
    try {
      localStorage.setItem('printerProfiles3D', JSON.stringify(printerProfiles));
    } catch (error) {
      console.error('Error al guardar perfiles:', error);
    }
  }, [printerProfiles]);

  // Persistencia de piezas
  useEffect(() => {
    try {
      localStorage.setItem('savedPieces3D', JSON.stringify(savedPieces));
    } catch (error) {
      console.error('Error al guardar piezas:', error);
    }
  }, [savedPieces]);

  // Funciones de manejo
  const handleTypeChange = (type) => {
    setSelectedPrinterType(type);
    setCurrentProfile(null);
    setActivePanel(null);
  };

  const handleProfileChange = (profile) => {
    setCurrentProfile(profile);
  };

  const handleSavePiece = (piece) => {
    setSavedPieces(prev => [...prev, piece]);
  };

  const handleDeletePiece = (pieceId) => {
    setSavedPieces(prev => prev.filter(p => p.id !== pieceId));
  };

  const handleLoadPiece = (piece) => {
    // Esta función será implementada en los componentes hijos
    console.log('Cargando pieza:', piece);
  };

  const resetToTypeSelector = () => {
    setSelectedPrinterType(null);
    setCurrentProfile(null);
    setActivePanel(null);
  };

  const getStats = () => {
    const resinPieces = savedPieces.filter(p => p.type === 'resin').length;
    const filamentPieces = savedPieces.filter(p => p.type === 'filament').length;
    return { resinPieces, filamentPieces, totalProfiles: printerProfiles.length };
  };

  const stats = getStats();

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      
      {/* Header Profesional */}
      <div className="modern-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="header-icon">🖨️</div>
          <div className="header-text">
            <h1>Calculadora de Precios 3D</h1>
            <p>Sistema Profesional Universal - Resina y Filamento</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.resinPieces + stats.filamentPieces}</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.totalProfiles}</span>
              <span className="stat-label">Perfiles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">v2.0.0</span>
              <span className="stat-label">Versión</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de retorno */}
      {selectedPrinterType && (
        <div className="navigation-bar">
          <button onClick={resetToTypeSelector} className="back-button">
            ← Cambiar tipo de impresión
          </button>
          <div className="current-selection">
            <span className="selection-type">
              {selectedPrinterType === 'resin' ? '🧪 Resina' : '🎭 Filamento'}
            </span>
            {currentProfile && (
              <span className="selection-profile">
                • {currentProfile.name}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="main-content">
        
        {/* Selector de tipo de impresión */}
        {!selectedPrinterType && (
          <PrinterTypeSelector 
            selectedType={selectedPrinterType}
            onTypeChange={handleTypeChange}
          />
        )}

        {/* Gestión de perfiles si se ha seleccionado un tipo */}
        {selectedPrinterType && !currentProfile && (
          <div className="profile-selection-container">
            <PrinterProfileManager 
              profiles={printerProfiles.filter(p => p.type === selectedPrinterType)}
              onProfilesChange={(profiles) => {
                // Mantener perfiles de otros tipos
                const otherProfiles = printerProfiles.filter(p => p.type !== selectedPrinterType);
                setPrinterProfiles([...otherProfiles, ...profiles]);
              }}
              currentProfile={currentProfile}
              onProfileChange={handleProfileChange}
            />
            
            {printerProfiles.filter(p => p.type === selectedPrinterType).length > 0 && (
              <div className="profile-help">
                <div className="help-content">
                  <h3>💡 Siguiente paso</h3>
                  <p>Selecciona un perfil de impresora para comenzar a calcular precios de tus piezas.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculadora específica según el tipo y perfil seleccionado */}
        {selectedPrinterType && currentProfile && (
          <>
            {selectedPrinterType === 'filament' ? (
              <FilamentCalculator 
                profile={currentProfile}
                onSavePiece={handleSavePiece}
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                savedPieces={savedPieces}
                onDeletePiece={handleDeletePiece}
                onLoadPiece={handleLoadPiece}
              />
            ) : (
              <ResinCalculator 
                profile={currentProfile}
                onSavePiece={handleSavePiece}
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                savedPieces={savedPieces}
                onDeletePiece={handleDeletePiece}
                onLoadPiece={handleLoadPiece}
              />
            )}
            
            {/* Panel de cambio de perfil */}
            <div className="profile-switcher">
              <button 
                onClick={() => setCurrentProfile(null)}
                className="switch-profile-button"
              >
                🔄 Cambiar perfil de impresora
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer con información */}
      <div className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>📊 Estadísticas</h4>
            <p>{stats.resinPieces} piezas de resina • {stats.filamentPieces} piezas de filamento</p>
          </div>
          <div className="footer-section">
            <h4>🎛️ Perfiles</h4>
            <p>{stats.totalProfiles} impresoras configuradas</p>
          </div>
          <div className="footer-section">
            <h4>ℹ️ Versión</h4>
            <p>Calculadora 3D Universal v2.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
