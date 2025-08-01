import React, { useState, useEffect, useMemo, useCallback, useId } from 'react';
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

  // Función para actualizar inputs y recalcular - Memoizada
  const updateInput = useCallback((field, value) => {
    setCalculatorInputs(prev => ({
      ...prev,
      [selectedPrinterType]: {
        ...prev[selectedPrinterType],
        [field]: value
      }
    }));
  }, [selectedPrinterType]);

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
      materialCost = (volume / 1000) * materialCostPerUnit * pieces; // ml a L
    } else {
      materialCost = (weight / 1000) * materialCostPerUnit * pieces; // g a kg
    }

    const electricityCost = (printTime * 0.2) * electricityCostPerKwh * pieces; // Asumiendo 200W promedio
    const postProcessingCost = postProcessTime * postProcessCostPerHour * pieces;
    const designCost = designTime * designRate;
    
    // Agregar costo por fallos
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

  // Función para guardar proyecto - Memoizada
  const saveProject = useCallback(() => {
    const inputs = calculatorInputs[selectedPrinterType];
    const projectName = inputs.projectName || `Proyecto ${savedPieces.length + 1}`;
    
    const newProject = {
      id: Date.now(),
      name: projectName,
      type: selectedPrinterType,
      inputs: inputs,
      calculations: calculations,
      totalCost: calculations.totalCost,
      createdAt: new Date().toISOString()
    };

    const updatedPieces = [...savedPieces, newProject];
    setSavedPieces(updatedPieces);
    localStorage.setItem('savedPieces3D', JSON.stringify(updatedPieces));
    
    // Limpiar el nombre del proyecto después de guardar
    updateInput('projectName', '');
    
    alert('¡Proyecto guardado exitosamente!');
  }, [calculatorInputs, selectedPrinterType, savedPieces, calculations, updateInput]);

// Componente Calculator Widget como componente separado fuera del render
const CalculatorWidget = React.memo(({ 
  currentInputs, 
  selectedPrinterType, 
  setSelectedPrinterType, 
  updateInput, 
  saveProject 
}) => {
  // Generar IDs únicos para cada input para evitar conflictos
  const volumeId = useId();
  const weightId = useId();
  const printTimeId = useId();
  const postProcessTimeId = useId();
  const piecesId = useId();
  const materialCostId = useId();
  const electricityCostId = useId();
  const postProcessCostId = useId();
  const profitMarginId = useId();
  const designTimeId = useId();
  const designRateId = useId();
  const failureRateId = useId();
  const supportsCostId = useId();
  const shippingCostId = useId();
  const deliveryTimeId = useId();
  const projectNameId = useId();

  return (
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
                  key={`${selectedPrinterType}-volume-weight`}
                  id={selectedPrinterType === 'resin' ? volumeId : weightId}
                  type="number" 
                  placeholder={selectedPrinterType === 'resin' ? "Volumen de resina (ml)" : "Peso filamento (g)"}
                  value={selectedPrinterType === 'resin' ? currentInputs.volume : currentInputs.weight}
                  onChange={(e) => updateInput(selectedPrinterType === 'resin' ? 'volume' : 'weight', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white'
                  }}
                />
                <input 
                  key={`${selectedPrinterType}-printTime`}
                  id={printTimeId}
                  type="number" 
                  placeholder="Tiempo de impresión (horas)"
                  value={currentInputs.printTime}
                  onChange={(e) => updateInput('printTime', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white'
                  }}
                />
                <input 
                  key={`${selectedPrinterType}-postProcessTime`}
                  id={postProcessTimeId}
                  type="number" 
                  placeholder="Tiempo post-procesado (horas)"
                  value={currentInputs.postProcessTime}
                  onChange={(e) => updateInput('postProcessTime', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white'
                  }}
                />
                <input 
                  key={`${selectedPrinterType}-pieces`}
                  id={piecesId}
                  type="number" 
                  placeholder="Número de piezas"
                  value={currentInputs.pieces}
                  onChange={(e) => updateInput('pieces', e.target.value)}
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
                  key={`${selectedPrinterType}-materialCost`}
                  id={materialCostId}
                  type="number" 
                  placeholder={selectedPrinterType === 'resin' ? "Costo resina (€/L)" : "Costo filamento (€/kg)"}
                  value={currentInputs.materialCost}
                  onChange={(e) => updateInput('materialCost', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white'
                  }}
                />
                <input 
                  key={`${selectedPrinterType}-electricityCost`}
                  id={electricityCostId}
                  type="number" 
                  placeholder="Costo electricidad (€/kWh)"
                  value={currentInputs.electricityCost}
                  onChange={(e) => updateInput('electricityCost', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white'
                  }}
                />
                <input 
                  key={`${selectedPrinterType}-postProcessCost`}
                  id={postProcessCostId}
                  type="number" 
                  placeholder="Costo post-procesado (€/h)"
                  value={currentInputs.postProcessCostPerHour}
                  onChange={(e) => updateInput('postProcessCostPerHour', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'white'
                  }}
                />
                <input 
                  key={`${selectedPrinterType}-profitMargin`}
                  id={profitMarginId}
                  type="number" 
                  placeholder="Margen de beneficio (%)"
                  value={currentInputs.profitMargin}
                  onChange={(e) => updateInput('profitMargin', e.target.value)}
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
          
          {/* SECCIÓN ADICIONAL DE COSTOS PROFESIONALES */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: 'rgba(240, 147, 251, 0.05)', 
            borderRadius: '16px',
            border: '1px solid rgba(240, 147, 251, 0.2)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#f093fb', textAlign: 'center' }}>
              Costos Adicionales Profesionales
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <input 
                key={`${selectedPrinterType}-designTime`}
                id={designTimeId}
                type="number" 
                placeholder="Tiempo de diseño (horas)"
                value={currentInputs.designTime}
                onChange={(e) => updateInput('designTime', e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                key={`${selectedPrinterType}-designRate`}
                id={designRateId}
                type="number" 
                placeholder="Tarifa diseño (€/h)"
                value={currentInputs.designRate}
                onChange={(e) => updateInput('designRate', e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                key={`${selectedPrinterType}-failureRate`}
                id={failureRateId}
                type="number" 
                placeholder="Fallos estimados (%)"
                value={currentInputs.failureRate}
                onChange={(e) => updateInput('failureRate', e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                key={`${selectedPrinterType}-supportsCost`}
                id={supportsCostId}
                type="number" 
                placeholder="Costo soportes/adhesión (€)"
                value={currentInputs.supportsCost}
                onChange={(e) => updateInput('supportsCost', e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                key={`${selectedPrinterType}-shippingCost`}
                id={shippingCostId}
                type="number" 
                placeholder="Empaquetado/envío (€)"
                value={currentInputs.shippingCost}
                onChange={(e) => updateInput('shippingCost', e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
              <input 
                key={`${selectedPrinterType}-deliveryTime`}
                id={deliveryTimeId}
                type="number" 
                placeholder="Tiempo entrega (días)"
                value={currentInputs.deliveryTime}
                onChange={(e) => updateInput('deliveryTime', e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white'
                }}
              />
            </div>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <input 
              key={`${selectedPrinterType}-projectName`}
              id={projectNameId}
              type="text" 
              placeholder="Nombre del diseño (ej: Miniatura Dragón)"
              value={currentInputs.projectName}
              onChange={(e) => updateInput('projectName', e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: 'white',
                minWidth: '280px',
                fontSize: '1rem'
              }}
            />
            <button 
              onClick={saveProject}
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem 2rem',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              💾 Guardar Diseño
            </button>
          </div>
        </div>
      </div>
    );
});

// Componente Results Widget - Memoizado
const ResultsWidget = React.memo(({ calculations }) => (
    <div className="dashboard-widget widget-results">
      <div className="widget-header">
        <div className="widget-title">
          <div className="widget-icon">💰</div>
          Desglose de Costos
        </div>
      </div>
      <div className="widget-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* COSTOS BÁSICOS */}
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
            background: 'rgba(240, 147, 251, 0.1)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(240, 147, 251, 0.2)'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Post-procesado</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#f093fb' }}>
              €{calculations.postProcessingCost.toFixed(2)}
            </div>
          </div>

          {/* COSTOS PROFESIONALES */}
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Diseño</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#22c55e' }}>
              €{calculations.designCost.toFixed(2)}
            </div>
          </div>
          
          {/* SUBTOTAL */}
          <div style={{
            background: 'rgba(156, 163, 175, 0.1)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(156, 163, 175, 0.2)',
            marginTop: '0.5rem'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Subtotal</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#9ca3af' }}>
              €{calculations.subtotal.toFixed(2)}
            </div>
          </div>
          
          {/* TOTAL FINAL */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(167, 139, 250, 0.15))',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '2px solid rgba(96, 165, 250, 0.4)',
            textAlign: 'center',
            marginTop: '1rem'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '0.5rem' }}>
              Precio Final (+ {calculations.profitAmount > 0 ? (calculations.profitAmount / calculations.subtotal * 100).toFixed(0) : 0}% beneficio)
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
  ));

// Componente Library Widget - Memoizado  
const LibraryWidget = React.memo(({ savedPieces }) => (
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
  ));

// Componente Stats Widget - Memoizado
const StatsWidget = React.memo(({ savedPieces, profiles }) => (
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
  ));

// Componente Quick Actions Widget - Memoizado
const QuickActionsWidget = React.memo(() => (
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
  ));

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
          <CalculatorWidget 
            currentInputs={calculatorInputs[selectedPrinterType]}
            selectedPrinterType={selectedPrinterType}
            setSelectedPrinterType={setSelectedPrinterType}
            updateInput={updateInput}
            saveProject={saveProject}
          />
          <ResultsWidget calculations={calculations} />
          <LibraryWidget savedPieces={savedPieces} />
          <StatsWidget savedPieces={savedPieces} profiles={profiles} />
          <QuickActionsWidget />
        </div>
      </main>
    </div>
  );
}
