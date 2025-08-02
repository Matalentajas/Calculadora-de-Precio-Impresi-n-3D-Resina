import { useState, useEffect, useCallback } from 'react';

function FilamentCalculator() {
  // Estados para las configuraciones
  const [filamentCostPerKg, setFilamentCostPerKg] = useState(20);
  const [electricityCostPerKWh, setElectricityCostPerKWh] = useState(0.12);
  const [powerConsumptionKW, setPowerConsumptionKW] = useState(0.25);
  const [profitMarginPercentage, setProfitMarginPercentage] = useState(25);

  // Estados para el cálculo
  const [filamentUsedG, setFilamentUsedG] = useState(100);
  const [printTimeHours, setPrintTimeHours] = useState(5);
  const [numberOfPieces, setNumberOfPieces] = useState(1);
  const [postProcessingTime, setPostProcessingTime] = useState(0.5);

  // Estados para las piezas guardadas
  const [pieceName, setPieceName] = useState('');
  const [savedPieces, setSavedPieces] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Cargar piezas guardadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('filamentPieces3D');
    if (saved) {
      setSavedPieces(JSON.parse(saved));
    }
    
    const history = localStorage.getItem('filamentCalculationHistory3D');
    if (history) {
      setCalculationHistory(JSON.parse(history));
    }
  }, []);

  // 🚀 OPTIMIZACIÓN: Handlers memoizados para evitar re-renders en inputs
  const handleFilamentCostChange = useCallback((e) => {
    setFilamentCostPerKg(Number(e.target.value));
  }, []);

  const handleElectricityCostChange = useCallback((e) => {
    setElectricityCostPerKWh(Number(e.target.value));
  }, []);

  const handlePowerConsumptionChange = useCallback((e) => {
    setPowerConsumptionKW(Number(e.target.value));
  }, []);

  const handleProfitMarginChange = useCallback((e) => {
    setProfitMarginPercentage(Number(e.target.value));
  }, []);

  const handleFilamentUsedChange = useCallback((e) => {
    setFilamentUsedG(Number(e.target.value));
  }, []);

  const handlePrintTimeChange = useCallback((e) => {
    setPrintTimeHours(Number(e.target.value));
  }, []);

  const handleNumberOfPiecesChange = useCallback((e) => {
    setNumberOfPieces(Number(e.target.value));
  }, []);

  const handlePieceNameChange = useCallback((e) => {
    setPieceName(e.target.value);
  }, []);

  const handlePostProcessingTimeChange = useCallback((e) => {
    setPostProcessingTime(Number(e.target.value));
  }, []);

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    // Costo del filamento
    const filamentCost = (filamentUsedG / 1000) * filamentCostPerKg;
    
    // Costo de electricidad
    const electricityCost = printTimeHours * powerConsumptionKW * electricityCostPerKWh;
    
    // Costo de post-procesado (simplificado)
    const postProcessingCost = postProcessingTime * 10; // €10/hora estimado
    
    // Costo base por lote
    const baseCost = filamentCost + electricityCost + postProcessingCost;
    
    // Precio final con margen de beneficio
    const finalPrice = baseCost * (1 + profitMarginPercentage / 100);
    
    // Precio por pieza
    const pricePerPiece = finalPrice / numberOfPieces;
    
    return {
      filamentCost,
      electricityCost,
      postProcessingCost,
      baseCost,
      finalPrice,
      pricePerPiece,
      numberOfPieces
    };
  };

  // Función para guardar pieza
  const savePiece = () => {
    if (!pieceName.trim()) {
      alert('Por favor, ingresa un nombre para la pieza');
      return;
    }

    const results = calculateTotalPrice();
    const newPiece = {
      id: Date.now(),
      name: pieceName,
      date: new Date().toLocaleDateString(),
      filamentUsedG,
      printTimeHours,
      numberOfPieces,
      postProcessingTime,
      finalPrice: results.finalPrice,
      pricePerPiece: results.pricePerPiece,
      settings: {
        filamentCostPerKg,
        electricityCostPerKWh,
        powerConsumptionKW,
        profitMarginPercentage
      }
    };

    const updatedPieces = [...savedPieces, newPiece];
    setSavedPieces(updatedPieces);
    localStorage.setItem('filamentPieces3D', JSON.stringify(updatedPieces));
    setPieceName('');

    // Agregar al historial
    addToHistory(results);
  };

  // Función para cargar pieza
  const loadPiece = (piece) => {
    setFilamentUsedG(piece.filamentUsedG);
    setPrintTimeHours(piece.printTimeHours);
    setNumberOfPieces(piece.numberOfPieces || 1);
    setPostProcessingTime(piece.postProcessingTime);
    setFilamentCostPerKg(piece.settings.filamentCostPerKg);
    setElectricityCostPerKWh(piece.settings.electricityCostPerKWh);
    setPowerConsumptionKW(piece.settings.powerConsumptionKW);
    setProfitMarginPercentage(piece.settings.profitMarginPercentage);
  };

  // Función para eliminar pieza
  const deletePiece = (pieceId) => {
    const updatedPieces = savedPieces.filter(piece => piece.id !== pieceId);
    setSavedPieces(updatedPieces);
    localStorage.setItem('filamentPieces3D', JSON.stringify(updatedPieces));
  };

  // Función para agregar al historial
  const addToHistory = (results) => {
    const historyEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      finalPrice: results.finalPrice,
      filamentUsedG,
      printTimeHours
    };

    const updatedHistory = [historyEntry, ...calculationHistory].slice(0, 10); // Mantener solo los últimos 10
    setCalculationHistory(updatedHistory);
    localStorage.setItem('filamentCalculationHistory3D', JSON.stringify(updatedHistory));
  };

  const results = calculateTotalPrice();

  return (
    <div className="filament-calculator">
      {/* Primera fila - 3 columnas */}
      <div className="calculator-grid">
        {/* Columna 1: Configuración de Impresora */}
        <div className="settings-panel">
          <h3>⚙️ Configuración de Impresora FDM</h3>
          
          <div className="settings-grid">
            <div className="setting-group">
              <label>Costo Filamento por Kg (€)</label>
              <input
                type="number"
                value={filamentCostPerKg}
                onChange={handleFilamentCostChange}
                min="0"
                step="0.5"
              />
            </div>

            <div className="setting-group">
              <label>Costo Electricidad por kWh (€)</label>
              <input
                type="number"
                value={electricityCostPerKWh}
                onChange={handleElectricityCostChange}
                min="0"
                step="0.01"
              />
            </div>

            <div className="setting-group">
              <label>Consumo Energético (kW)</label>
              <input
                type="number"
                value={powerConsumptionKW}
                onChange={handlePowerConsumptionChange}
                min="0"
                step="0.01"
              />
            </div>

            <div className="setting-group">
              <label>Margen de Beneficio (%)</label>
              <input
                type="number"
                value={profitMarginPercentage}
                onChange={handleProfitMarginChange}
                min="0"
                max="500"
                step="5"
              />
            </div>
          </div>
        </div>

        {/* Columna 2: Datos de Impresión */}
        <div className="calculation-panel">
          <h3>🧮 Datos de Impresión</h3>
          
          <div className="calculation-grid">
            <div className="input-group">
              <label>Filamento Utilizado (g)</label>
              <input
                type="number"
                value={filamentUsedG}
                onChange={handleFilamentUsedChange}
                min="1"
                step="1"
              />
            </div>

            <div className="input-group">
              <label>Tiempo de Impresión (horas)</label>
              <input
                type="number"
                value={printTimeHours}
                onChange={handlePrintTimeChange}
                min="0.1"
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label>Número de Piezas</label>
              <input
                type="number"
                value={numberOfPieces}
                onChange={handleNumberOfPiecesChange}
                min="1"
                step="1"
              />
            </div>

            <div className="input-group">
              <label>Tiempo Post-procesado (horas)</label>
              <input
                type="number"
                value={postProcessingTime}
                onChange={handlePostProcessingTimeChange}
                min="0"
                step="0.1"
              />
            </div>
          </div>

          {/* Sección para guardar pieza */}
          <div className="save-piece-section">
            <h4>💾 Guardar Pieza</h4>
            <div className="save-piece-controls">
              <input
                type="text"
                placeholder="Nombre de la pieza..."
                value={pieceName}
                onChange={handlePieceNameChange}
                className="piece-name-input"
              />
              <button onClick={savePiece} className="save-btn">
                💾 Guardar
              </button>
            </div>
          </div>
        </div>

        {/* Columna 3: Biblioteca de Piezas */}
        <div className="library-panel">
          <h3 style={{ 
            color: '#f093fb', 
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            📚 Biblioteca de Piezas
          </h3>
          
          {/* Estilos personalizados para el scroll */}
          <style>{`
            .pieces-scroll-container {
              max-height: 400px;
              overflow-y: auto;
              padding-right: 0.5rem;
            }
            
            .pieces-scroll-container::-webkit-scrollbar {
              width: 8px;
            }
            
            .pieces-scroll-container::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.1);
              border-radius: 10px;
            }
            
            .pieces-scroll-container::-webkit-scrollbar-thumb {
              background: linear-gradient(135deg, rgba(240, 147, 251, 0.6), rgba(167, 139, 250, 0.4));
              border-radius: 10px;
              border: 2px solid transparent;
              background-clip: content-box;
            }
            
            .pieces-scroll-container::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(135deg, rgba(240, 147, 251, 0.8), rgba(167, 139, 250, 0.6));
              background-clip: content-box;
            }
          `}</style>
          
          <div className="pieces-scroll-container">
            {savedPieces.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(240, 147, 251, 0.05)',
                borderRadius: '16px',
                border: '1px dashed rgba(240, 147, 251, 0.3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  No hay piezas guardadas
                </div>
                <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                  Calcula un precio y guárdalo para empezar
                </div>
              </div>
            ) : (
              savedPieces.map(piece => (
                <div 
                  key={piece.id} 
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '0.75rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 16px rgba(240, 147, 251, 0.15)';
                    e.target.style.borderColor = 'rgba(240, 147, 251, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  {/* Fondo decorativo más pequeño */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '10px',
                    fontSize: '1.2rem',
                    opacity: '0.1',
                    color: '#f093fb'
                  }}>
                    🧵
                  </div>

                  {/* Contenido principal compacto */}
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    {/* Título y precio en línea */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <h4 style={{ 
                        margin: '0',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'white',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        maxWidth: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {piece.name}
                      </h4>
                      
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#22c55e',
                        textShadow: '0 1px 2px rgba(34, 197, 94, 0.3)'
                      }}>
                        €{piece.finalPrice.toFixed(2)}
                      </div>
                    </div>

                    {/* Información compacta en una línea */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.7)'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ color: '#60a5fa' }}>
                          {piece.filamentUsedG}g
                        </span>
                        <span style={{ color: '#a78bfe' }}>
                          {piece.printTimeHours}h
                        </span>
                        <span style={{ color: '#f093fb' }}>
                          €{(piece.pricePerPieza || piece.finalPrice).toFixed(2)}/pz
                        </span>
                      </div>
                      <div style={{
                        fontSize: '0.7rem',
                        color: 'rgba(255,255,255,0.5)',
                        background: 'rgba(96, 165, 250, 0.15)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px'
                      }}>
                        {piece.date}
                      </div>
                    </div>

                    {/* Botones compactos */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      justifyContent: 'center'
                    }}>
                      <button 
                        onClick={() => loadPiece(piece)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.4rem 0.8rem',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 3px 12px rgba(59, 130, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.2)';
                        }}
                      >
                        <span style={{ fontSize: '0.8rem' }}>📂</span>
                        <span>Cargar</span>
                      </button>
                      
                      <button 
                        onClick={() => deletePiece(piece.id)}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.4rem 0.6rem',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 3px 12px rgba(239, 68, 68, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.2)';
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Segunda fila - Panel completo de resultados */}
      <div className="calculator-grid-bottom">
        {/* Panel completo: Resultados del Cálculo */}
        <div className="results-panel-full">
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            color: '#60a5fa',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            💰 Resultados del Cálculo
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Costos Individuales */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(59, 130, 246, 0.05))',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(96, 165, 250, 0.3))'
              }}>🧵</div>
              <div style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '0.9rem', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Costo Filamento</div>
              <div style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#60a5fa',
                textShadow: '0 2px 4px rgba(96, 165, 250, 0.3)'
              }}>
                €{results.filamentCost.toFixed(2)}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.05))',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(167, 139, 250, 0.3))'
              }}>⚡</div>
              <div style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '0.9rem', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Consumo Eléctrico</div>
              <div style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#a78bfe',
                textShadow: '0 2px 4px rgba(167, 139, 250, 0.3)'
              }}>
                €{results.electricityCost.toFixed(2)}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(217, 70, 239, 0.05))',
              border: '1px solid rgba(240, 147, 251, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(240, 147, 251, 0.3))'
              }}>🔧</div>
              <div style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '0.9rem', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Post-procesado</div>
              <div style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#f093fb',
                textShadow: '0 2px 4px rgba(240, 147, 251, 0.3)'
              }}>
                €{results.postProcessingCost.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Resultados Finales */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {/* Costo Base */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.15), rgba(107, 114, 128, 0.1))',
              border: '2px solid rgba(156, 163, 175, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '1.1rem', 
                color: 'rgba(255,255,255,0.8)', 
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600'
              }}>
                📊 Costo Base
              </div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                color: '#9ca3af',
                textShadow: '0 4px 8px rgba(156, 163, 175, 0.4)',
                marginBottom: '0.5rem'
              }}>
                €{results.baseCost.toFixed(2)}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: 'rgba(255,255,255,0.6)',
                fontStyle: 'italic'
              }}>
                Sin margen de beneficio
              </div>
            </div>

            {/* Precio Final */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))',
              border: '3px solid rgba(34, 197, 94, 0.5)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                fontSize: '3rem',
                opacity: '0.1',
                color: '#22c55e'
              }}>💰</div>
              <div style={{ 
                fontSize: '1.1rem', 
                color: '#22c55e', 
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '700'
              }}>
                🎯 PRECIO FINAL
              </div>
              <div style={{ 
                fontSize: '3.2rem', 
                fontWeight: '900', 
                background: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 6px 12px rgba(34, 197, 94, 0.4)',
                marginBottom: '0.5rem'
              }}>
                €{results.finalPrice.toFixed(2)}
              </div>
              <div style={{ 
                fontSize: '1.1rem', 
                color: '#16a34a',
                fontWeight: '600'
              }}>
                €{results.pricePerPiece.toFixed(2)} por pieza
              </div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: 'rgba(34, 197, 94, 0.8)',
                marginTop: '0.5rem',
                fontStyle: 'italic'
              }}>
                + {profitMarginPercentage}% margen
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilamentCalculator;