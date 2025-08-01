import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App-dashboard.css';

export default function CalculadoraPrecios3D() {
  // Estados principales
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedPrinterType, setSelectedPrinterType] = useState('resin');
  
  // Estados de datos
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('printerProfiles3D');
      return saved ? JSON.parse(saved) : [{
        id: 1,
        name: 'Perfil Resina',
        type: 'resin',
        isDefault: true,
        resinCost: 35,
        electricityCostPerHour: 0.15,
        postProcessingCostPerHour: 15,
        profitMargin: 30
      }];
    } catch {
      return [];
    }
  });

  const [savedPieces, setSavedPieces] = useState(() => {
    try {
      const pieces = localStorage.getItem('savedPieces3D');
      return pieces ? JSON.parse(pieces) : [];
    } catch {
      return [];
    }
  });

  // Cálculos de ejemplo (para mostrar en el dashboard)
  const [calculations, setCalculations] = useState({
    materialCost: 0,
    electricityCost: 0,
    postProcessingCost: 0,
    profitAmount: 0,
    totalCost: 0
  });

  // Navegación del sidebar
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'calculator', label: 'Calculadora', icon: '🧮' },
    { id: 'library', label: 'Biblioteca', icon: '📚' },
    { id: 'profiles', label: 'Perfiles', icon: '⚙️' },
    { id: 'settings', label: 'Configuración', icon: '🔧' }
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Componente Calculator Widget
  const CalculatorWidget = () => (
    <div className="dashboard-widget widget-calculator">
      <div className="widget-header">
        <div className="widget-title">
          <div className="widget-icon">🧮</div>
          Calculadora de Precios
        </div>
        
        {/* SELECTOR TOGGLE MINIMALISTA SOLO TEXTO */}
        <div className="printer-type-selector">
          <div 
            className={`selector-option ${selectedPrinterType === 'resin' ? 'active' : 'inactive'}`}
            onClick={() => setSelectedPrinterType('resin')}
          >
            <span className="option-text">Impresora Resina</span>
          </div>
          <div 
            className={`selector-option ${selectedPrinterType === 'filament' ? 'active' : 'inactive'}`}
            onClick={() => setSelectedPrinterType('filament')}
          >
            <span className="option-text">Impresora Filamento</span>
          </div>
        </div>
      </div>
      <div className="widget-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#60a5fa' }}>Parámetros de Impresión</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="number" 
                placeholder="Volumen de resina (ml)"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                type="number" 
                placeholder="Tiempo de impresión (horas)"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                type="number" 
                placeholder="Tiempo post-procesado (horas)"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#a78bfe' }}>Configuración de Costos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="number" 
                placeholder="Costo resina (€/L)"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                type="number" 
                placeholder="Costo electricidad (€/kWh)"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                type="number" 
                placeholder="Margen de beneficio (%)"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button style={{
            background: 'linear-gradient(135deg, #60a5fa, #a78bfe)',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Calcular Precio
          </button>
        </div>
      </div>
    </div>
  );

  // Componente Results Widget
  const ResultsWidget = () => (
    <div className="dashboard-widget widget-results">
      <div className="widget-header">
        <div className="widget-title">
          <div className="widget-icon">💰</div>
          Resultados
        </div>
      </div>
      <div className="widget-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'rgba(96, 165, 250, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(96, 165, 250, 0.2)'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Costo Material</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#60a5fa' }}>
              €{calculations.materialCost.toFixed(2)}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(167, 139, 250, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(167, 139, 250, 0.2)'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Costo Eléctrico</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#a78bfe' }}>
              €{calculations.electricityCost.toFixed(2)}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(240, 147, 251, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(240, 147, 251, 0.2)'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Post-procesado</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f093fb' }}>
              €{calculations.postProcessingCost.toFixed(2)}
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1))',
            padding: '2rem',
            borderRadius: '20px',
            border: '2px solid rgba(96, 165, 250, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Precio Total
            </div>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '900', 
              background: 'linear-gradient(135deg, #60a5fa, #a78bfe, #f093fb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              €{calculations.totalCost.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente Library Widget
  const LibraryWidget = () => (
    <div className="dashboard-widget widget-library">
      <div className="widget-header">
        <div className="widget-title">
          <div className="widget-icon">📚</div>
          Biblioteca de Proyectos
        </div>
        <button style={{
          background: 'rgba(96, 165, 250, 0.2)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          borderRadius: '8px',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer'
        }}>
          + Nuevo
        </button>
      </div>
      <div className="widget-content">
        {savedPieces.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'rgba(255,255,255,0.6)' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <div>No hay proyectos guardados</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Calcula un precio y guárdalo para empezar
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {savedPieces.map((piece, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                      {piece.name || `Proyecto ${index + 1}`}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      {piece.type === 'resin' ? 'Resina' : 'Filamento'} • €{piece.totalCost?.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ color: '#60a5fa', fontSize: '1.2rem' }}>
                    📄
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Componente Stats Widget
  const StatsWidget = () => (
    <div className="dashboard-widget widget-stats">
      <div className="widget-header">
        <div className="widget-title">
          <div className="widget-icon">📈</div>
          Estadísticas
        </div>
      </div>
      <div className="widget-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#60a5fa' }}>
              {savedPieces.length}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Proyectos</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a78bfe' }}>
              {profiles.length}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Perfiles</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f093fb' }}>
              €{savedPieces.reduce((sum, piece) => sum + (piece.totalCost || 0), 0).toFixed(0)}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Total Calculado</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente Quick Actions Widget
  const QuickActionsWidget = () => (
    <div className="dashboard-widget widget-quick-actions">
      <div className="widget-header">
        <div className="widget-title">
          <div className="widget-icon">⚡</div>
          Acciones Rápidas
        </div>
      </div>
      <div className="widget-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button style={{
            background: 'rgba(96, 165, 250, 0.1)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span>🧮</span>
            <span>Nueva Calculación</span>
          </button>
          
          <button style={{
            background: 'rgba(167, 139, 250, 0.1)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span>⚙️</span>
            <span>Nuevo Perfil</span>
          </button>
          
          <button style={{
            background: 'rgba(240, 147, 251, 0.1)',
            border: '1px solid rgba(240, 147, 251, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span>📊</span>
            <span>Ver Informes</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <nav className={`sidebar-nav ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarCollapsed ? '→' : '←'}
        </button>
        
        <div className="sidebar-header">
          <div className="sidebar-logo">3D</div>
          <div className="sidebar-title">Calculadora 3D</div>
        </div>
        
        <div className="nav-items">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Principal</h1>
            <p className="dashboard-subtitle">
              Gestiona tus cálculos de impresión 3D de manera profesional
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="dashboard-action-btn">
              <span>📊</span>
              <span>Exportar</span>
            </button>
            <button className="dashboard-action-btn">
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </header>

        {/* Dashboard Widgets Grid */}
        <div className="dashboard-widgets">
          <CalculatorWidget />
          <ResultsWidget />
          <LibraryWidget />
          <StatsWidget />
          <QuickActionsWidget />
        </div>
      </main>
    </div>
  );
}
