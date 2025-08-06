import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import PrinterTypeSelector from './components/PrinterTypeSelector';
import FilamentCalculator from './components/FilamentCalculator';
import ResinCalculator from './components/ResinCalculator';
import ScaleCalculator from './components/ScaleCalculator';

// 🚀 OPTIMIZACIÓN: Lazy loading de componentes pesados
const LazyFilamentCalculator = React.lazy(() => import('./components/FilamentCalculator'));
const LazyResinCalculator = React.lazy(() => import('./components/ResinCalculator'));
const LazyScaleCalculator = React.lazy(() => import('./components/ScaleCalculator'));

export default function CalculadoraPrecios3D() {
  // Estados principales
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPrinterType, setSelectedPrinterType] = useState(null); // null para mostrar menú inicio
  const [activePanel, setActivePanel] = useState(null);
  
  // Perfil por defecto y gestión de perfiles
  const [profiles, setProfiles] = useState(() => {
    try {
      const savedProfiles = localStorage.getItem('printerProfiles3D');
      const loadedProfiles = savedProfiles ? JSON.parse(savedProfiles) : [];
      
      // Si no hay perfiles, crear uno por defecto
      if (loadedProfiles.length === 0) {
        const defaultResinProfile = {
          id: 1,
          name: 'Perfil por Defecto Resina',
          type: 'resin',
          isDefault: true,
          resinCost: 35,
          electricityCostPerHour: 0.15,
          postProcessingCostPerHour: 15,
          profitMargin: 30
        };
        const defaultFilamentProfile = {
          id: 2,
          name: 'Perfil por Defecto Filamento',
          type: 'filament',
          isDefault: true,
          filamentCost: 25,
          electricityCostPerHour: 0.15,
          machineWear: 0.05,
          postProcessingCost: 2,
          profitMargin: 30
        };
        loadedProfiles.push(defaultResinProfile, defaultFilamentProfile);
      }
      
      return loadedProfiles;
    } catch (error) {
      console.error('Error al cargar perfiles:', error);
      return [{
        id: 1,
        name: 'Perfil por Defecto Resina',
        type: 'resin',
        isDefault: true,
        resinCost: 35,
        electricityCostPerHour: 0.15,
        postProcessingCostPerHour: 15,
        profitMargin: 30
      }, {
        id: 2,
        name: 'Perfil por Defecto Filamento',
        type: 'filament',
        isDefault: true,
        filamentCost: 25,
        electricityCostPerHour: 0.15,
        machineWear: 0.05,
        postProcessingCost: 2,
        profitMargin: 30
      }];
    }
  });

  const [currentProfile, setCurrentProfile] = useState(() => profiles[0]);
  
  // Actualizar currentProfile cuando cambie el tipo de impresora
  useEffect(() => {
    if (selectedPrinterType) {
      const relevantProfiles = profiles.filter(p => p.type === selectedPrinterType);
      const defaultProfile = relevantProfiles.find(p => p.isDefault) || relevantProfiles[0];
      if (defaultProfile) {
        setCurrentProfile(defaultProfile);
      }
    }
  }, [selectedPrinterType, profiles]);
  
  // 🚀 OPTIMIZACIÓN: Carga lazy del localStorage solo para piezas guardadas
  const [savedPieces, setSavedPieces] = useState(() => {
    try {
      const pieces = localStorage.getItem('savedPieces3D');
      return pieces ? JSON.parse(pieces) : [];
    } catch (error) {
      console.error('Error al cargar piezas:', error);
      return [];
    }
  });

  // 🚀 OPTIMIZACIÓN: Efecto de carga más rápido
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Reducido de 500ms a 300ms
    return () => clearTimeout(timer);
  }, []);

  // 🚀 OPTIMIZACIÓN: Debounce para localStorage para piezas y perfiles
  const debouncedSavePieces = useCallback(
    debounce((pieces) => {
      try {
        localStorage.setItem('savedPieces3D', JSON.stringify(pieces));
      } catch (error) {
        console.error('Error al guardar piezas:', error);
      }
    }, 500),
    []
  );

  const debouncedSaveProfiles = useCallback(
    debounce((profiles) => {
      try {
        localStorage.setItem('printerProfiles3D', JSON.stringify(profiles));
      } catch (error) {
        console.error('Error al guardar perfiles:', error);
      }
    }, 500),
    []
  );

  // Persistencia optimizada con debounce
  useEffect(() => {
    debouncedSavePieces(savedPieces);
  }, [savedPieces, debouncedSavePieces]);

  useEffect(() => {
    debouncedSaveProfiles(profiles);
  }, [profiles, debouncedSaveProfiles]);

  // 🚀 OPTIMIZACIÓN: Funciones memoizadas
  const handleTypeChange = useCallback((type) => {
    setSelectedPrinterType(type);
    setActivePanel(null);
  }, []);

  const handleSavePiece = useCallback((piece) => {
    setSavedPieces(prev => [...prev, piece]);
  }, []);

  const handleDeletePiece = useCallback((pieceId) => {
    setSavedPieces(prev => prev.filter(p => p.id !== pieceId));
  }, []);

  const handleLoadPiece = useCallback((piece) => {
    console.log('Cargando pieza:', piece);
  }, []);

  const resetToTypeSelector = useCallback(() => {
    setSelectedPrinterType(null);
    setActivePanel(null);
  }, []);

  // Funciones para gestión de perfiles
  const handleSaveProfile = useCallback((profileData) => {
    const newProfile = {
      ...profileData,
      id: Date.now()
    };
    setProfiles(prev => [...prev, newProfile]);
    setCurrentProfile(newProfile);
  }, []);

  const handleUpdateProfile = useCallback((profileId, updates) => {
    setProfiles(prev => prev.map(p => 
      p.id === profileId ? { ...p, ...updates } : p
    ));
    if (currentProfile.id === profileId) {
      setCurrentProfile(prev => ({ ...prev, ...updates }));
    }
  }, [currentProfile.id]);

  const handleDeleteProfile = useCallback((profileId) => {
    if (profiles.length > 1) {
      setProfiles(prev => prev.filter(p => p.id !== profileId));
      if (currentProfile.id === profileId) {
        setCurrentProfile(profiles.find(p => p.id !== profileId));
      }
    }
  }, [profiles, currentProfile.id]);

  const handleSelectProfile = useCallback((profileId) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
    }
  }, [profiles]);

  // 🚀 OPTIMIZACIÓN: Estadísticas memoizadas para la navegación
  const stats = useMemo(() => {
    const resinPieces = savedPieces.filter(p => p.type === 'resin').length;
    const filamentPieces = savedPieces.filter(p => p.type === 'filament').length;
    return { 
      resinPieces, 
      filamentPieces, 
      totalPieces: resinPieces + filamentPieces,
      totalProfiles: profiles.length
    };
  }, [savedPieces, profiles.length]);

  // 🚀 OPTIMIZACIÓN: Suspense para lazy loading - Solo si hay tipo seleccionado
  const renderCalculator = useMemo(() => {
    if (!selectedPrinterType) return null;
    
    return (
      <React.Suspense 
        fallback={
          <div className="calculator-loading">
            <div className="loader"></div>
            <p>Cargando calculadora...</p>
          </div>
        }
      >
        {selectedPrinterType === 'filament' ? (
          <LazyFilamentCalculator 
            profile={currentProfile}
            profiles={profiles.filter(p => p.type === 'filament')}
            onSavePiece={handleSavePiece}
            onSaveProfile={handleSaveProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            onSelectProfile={handleSelectProfile}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            savedPieces={savedPieces.filter(p => p.type === 'filament')}
            onDeletePiece={handleDeletePiece}
            onLoadPiece={handleLoadPiece}
          />
        ) : selectedPrinterType === 'resin' ? (
          <LazyResinCalculator 
            profile={currentProfile}
            profiles={profiles.filter(p => p.type === 'resin')}
            onSavePiece={handleSavePiece}
            onSaveProfile={handleSaveProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            onSelectProfile={handleSelectProfile}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            savedPieces={savedPieces.filter(p => p.type === 'resin')}
            onDeletePiece={handleDeletePiece}
            onLoadPiece={handleLoadPiece}
          />
        ) : selectedPrinterType === 'scale' ? (
          <LazyScaleCalculator />
        ) : null}
      </React.Suspense>
    );
  }, [selectedPrinterType, currentProfile, activePanel, savedPieces, handleSavePiece, handleDeletePiece, handleLoadPiece]);

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      
      {/* Header simplificado - Solo cuando hay tipo seleccionado */}
      {selectedPrinterType && (
        <header className="app-header">
          <h1 className="app-title">📱 Calculadora de Precios 3D</h1>
          
          <div className="printer-type-indicator">
            <button onClick={resetToTypeSelector} className="change-type-btn">
              {selectedPrinterType === 'resin' ? '🏭 Resina SLA/DLP' : 
               selectedPrinterType === 'filament' ? '🔧 Filamento FDM/FFF' : 
               selectedPrinterType === 'scale' ? '🎯 Calculadora de Escalado' : ''}
              <span className="change-text">← Cambiar</span>
            </button>
          </div>
        </header>
      )}

      {/* Contenido principal */}
      <main className="main-content">
        
        {/* Menú de inicio - Selector de tipo de impresión */}
        {!selectedPrinterType && (
          <PrinterTypeSelector 
            selectedType={selectedPrinterType}
            onTypeChange={handleTypeChange}
          />
        )}

        {/* Calculadora específica cuando hay tipo seleccionado */}
        {selectedPrinterType && renderCalculator}
      </main>

    </div>
  );
}

// 🚀 UTILIDAD: Función debounce para optimizar localStorage
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 🚀 OPTIMIZACIÓN: HOC para memoización de componentes pesados
export const withPerformance = (Component) => {
  return React.memo(Component, (prevProps, nextProps) => {
    // Comparación shallow personalizada para mejor rendimiento
    const keys = Object.keys(prevProps);
    for (let key of keys) {
      if (prevProps[key] !== nextProps[key]) {
        return false;
      }
    }
    return true;
  });
};
