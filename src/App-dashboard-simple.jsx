import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App-dashboard.css';

export default function CalculadoraPrecios3D() {
  // Estados principales
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedPrinterType, setSelectedPrinterType] = useState('resin');
  
  // Estados de datos
  const [savedPieces] = useState(() => {
    try {
      const pieces = localStorage.getItem('savedPieces3D');
      return pieces ? JSON.parse(pieces) : [];
    } catch {
      return [];
    }
  });

  // Cálculos
  const [calculations, setCalculations] = useState({
    materialCost: 0,
    electricityCost: 0,
    postProcessingCost: 0,
    designCost: 0,
    supportsCost: 0,
    shippingCost: 0,
    profitAmount: 0,
    subtotal: 0,
    totalCost: 0
  });

  // Estados para los inputs de la calculadora
  const [calculatorInputs, setCalculatorInputs] = useState({
    resin: {
      volume: '',
      printTime: '',
      postProcessTime: '',
      pieces: '',
      materialCost: '',
      electricityCost: '',
      postProcessCostPerHour: '',
      profitMargin: '',
      designTime: '',
      designRate: '',
      failureRate: '',
      supportsCost: '',
      shippingCost: '',
      deliveryTime: '',
      projectName: ''
    },
    filament: {
      weight: '',
      printTime: '',
      postProcessTime: '',
      pieces: '',
      materialCost: '',
      electricityCost: '',
      postProcessCostPerHour: '',
      profitMargin: '',
      designTime: '',
      designRate: '',
      failureRate: '',
      supportsCost: '',
      shippingCost: '',
      deliveryTime: '',
      projectName: ''
    }
  });

  // Refs para acceso directo a los inputs sin re-renders
  const inputRefs = useRef({
    resin: {
      volume: null,
      printTime: null,
      postProcessTime: null,
      pieces: null,
      materialCost: null,
      electricityCost: null,
      postProcessCostPerHour: null,
      profitMargin: null,
      designTime: null,
      designRate: null,
      failureRate: null,
      supportsCost: null,
      shippingCost: null,
      deliveryTime: null,
      projectName: null
    },
    filament: {
      weight: null,
      printTime: null,
      postProcessTime: null,
      pieces: null,
      materialCost: null,
      electricityCost: null,
      postProcessCostPerHour: null,
      profitMargin: null,
      designTime: null,
      designRate: null,
      failureRate: null,
      supportsCost: null,
      shippingCost: null,
      deliveryTime: null,
      projectName: null
    }
  });

  // Timer para cálculos debounced
  const calculationTimer = useRef(null);

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

  // Nueva función para manejar inputs con refs (sin re-renders)
  const handleInputChange = useCallback((field, value) => {
    // Actualizar estado solo para persistencia
    setCalculatorInputs(prev => ({
      ...prev,
      [selectedPrinterType]: {
        ...prev[selectedPrinterType],
        [field]: value
      }
    }));

    // Calcular con debounce
    if (calculationTimer.current) {
      clearTimeout(calculationTimer.current);
    }
    
    calculationTimer.current = setTimeout(() => {
      calculateCosts();
    }, 300);
  }, [selectedPrinterType, calculateCosts]);

  // Función de cálculo automático
  const calculateCosts = useCallback(() => {
    const inputs = calculatorInputs[selectedPrinterType];
    
    // Valores base
    const volume = parseFloat(inputs.volume) || 0;
    const weight = parseFloat(inputs.weight) || 0;
    const printTime = parseFloat(inputs.printTime) || 0;
    const postProcessTime = parseFloat(inputs.postProcessTime) || 0;
    const pieces = parseFloat(inputs.pieces) || 1;
    const materialCostPerUnit = parseFloat(inputs.materialCost) || 0;
    const electricityCostPerKwh = parseFloat(inputs.electricityCost) || 0;
    const postProcessCostPerHour = parseFloat(inputs.postProcessCostPerHour) || 0;
    const profitMargin = parseFloat(inputs.profitMargin) || 0;
    const designTime = parseFloat(inputs.designTime) || 0;
    const designRate = parseFloat(inputs.designRate) || 0;
    const failureRate = parseFloat(inputs.failureRate) || 0;
    const supportsCost = parseFloat(inputs.supportsCost) || 0;
    const shippingCost = parseFloat(inputs.shippingCost) || 0;

    // Cálculos
    let materialCost = 0;
    if (selectedPrinterType === 'resin') {
      materialCost = (volume / 1000) * materialCostPerUnit * pieces;
    } else {
      materialCost = (weight / 1000) * materialCostPerUnit * pieces;
    }

    const electricityCost = (printTime * 0.2) * electricityCostPerKwh * pieces;
    const postProcessingCost = postProcessTime * postProcessCostPerHour * pieces;
    const designCost = designTime * designRate;
    
    const failureCost = (materialCost + electricityCost) * (failureRate / 100);
    
    const subtotal = materialCost + electricityCost + postProcessingCost + designCost + failureCost + supportsCost + shippingCost;
    const profitAmount = subtotal * (profitMargin / 100);
    const totalCost = subtotal + profitAmount;

    setCalculations({
      materialCost,
      electricityCost,
      postProcessingCost,
      designCost,
      supportsCost,
      shippingCost,
      profitAmount,
      subtotal,
      totalCost
    });
  }, [calculatorInputs, selectedPrinterType]);

  // Recalcular cuando cambien los inputs
  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

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
          {/* Calculadora Simple */}
          <div className="dashboard-widget widget-calculator">
            <div className="widget-header">
              <div className="widget-title">
                <div className="widget-icon">🧮</div>
                Calculadora de Precios
              </div>
              
              <div className="printer-type-selector">
                <div 
                  className={`selector-option ${selectedPrinterType === 'resin' ? 'active' : 'inactive'}`}
                  onClick={() => setSelectedPrinterType('resin')}
                >
                  <span className="option-text">Resina</span>
                </div>
                <div 
                  className={`selector-option ${selectedPrinterType === 'filament' ? 'active' : 'inactive'}`}
                  onClick={() => setSelectedPrinterType('filament')}
                >
                  <span className="option-text">Filamento</span>
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
                      placeholder={selectedPrinterType === 'resin' ? "Volumen de resina (ml)" : "Peso filamento (g)"}
                      ref={inputRefs.current[selectedPrinterType][selectedPrinterType === 'resin' ? 'volume' : 'weight']}
                      defaultValue={calculatorInputs[selectedPrinterType][selectedPrinterType === 'resin' ? 'volume' : 'weight']}
                      onChange={(e) => handleInputChange(selectedPrinterType === 'resin' ? 'volume' : 'weight', e.target.value)}
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
                      ref={inputRefs.current[selectedPrinterType].printTime}
                      defaultValue={calculatorInputs[selectedPrinterType].printTime}
                      onChange={(e) => handleInputChange('printTime', e.target.value)}
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
                      placeholder="Número de piezas"
                      ref={inputRefs.current[selectedPrinterType].pieces}
                      defaultValue={calculatorInputs[selectedPrinterType].pieces}
                      onChange={(e) => handleInputChange('pieces', e.target.value)}
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
                      placeholder={selectedPrinterType === 'resin' ? "Costo resina (€/L)" : "Costo filamento (€/kg)"}
                      ref={inputRefs.current[selectedPrinterType].materialCost}
                      defaultValue={calculatorInputs[selectedPrinterType].materialCost}
                      onChange={(e) => handleInputChange('materialCost', e.target.value)}
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
                      ref={inputRefs.current[selectedPrinterType].electricityCost}
                      defaultValue={calculatorInputs[selectedPrinterType].electricityCost}
                      onChange={(e) => handleInputChange('electricityCost', e.target.value)}
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
                      ref={inputRefs.current[selectedPrinterType].profitMargin}
                      defaultValue={calculatorInputs[selectedPrinterType].profitMargin}
                      onChange={(e) => handleInputChange('profitMargin', e.target.value)}
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
            </div>
          </div>

          {/* Resultados */}
          <div className="dashboard-widget widget-results">
            <div className="widget-header">
              <div className="widget-title">
                <div className="widget-icon">💰</div>
                Desglose de Costos
              </div>
            </div>
            <div className="widget-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(96, 165, 250, 0.1)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(96, 165, 250, 0.2)'
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Material</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#60a5fa' }}>
                    €{calculations.materialCost.toFixed(2)}
                  </div>
                </div>
                
                <div style={{
                  background: 'rgba(167, 139, 250, 0.1)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(167, 139, 250, 0.2)'
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Electricidad</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#a78bfe' }}>
                    €{calculations.electricityCost.toFixed(2)}
                  </div>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(167, 139, 250, 0.15))',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '2px solid rgba(96, 165, 250, 0.4)',
                  textAlign: 'center',
                  marginTop: '1rem'
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    Precio Final
                  </div>
                  <div style={{ 
                    fontSize: '2.2rem', 
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

          {/* Stats simples */}
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
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f093fb' }}>
                    €{savedPieces.reduce((sum, piece) => sum + (piece.totalCost || 0), 0).toFixed(0)}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)' }}>Total Calculado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
