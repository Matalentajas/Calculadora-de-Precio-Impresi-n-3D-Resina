import { useState, useEffect } from 'react';

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
                onChange={(e) => setFilamentCostPerKg(Number(e.target.value))}
                min="0"
                step="0.5"
              />
            </div>

            <div className="setting-group">
              <label>Costo Electricidad por kWh (€)</label>
              <input
                type="number"
                value={electricityCostPerKWh}
                onChange={(e) => setElectricityCostPerKWh(Number(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className="setting-group">
              <label>Consumo Energético (kW)</label>
              <input
                type="number"
                value={powerConsumptionKW}
                onChange={(e) => setPowerConsumptionKW(Number(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className="setting-group">
              <label>Margen de Beneficio (%)</label>
              <input
                type="number"
                value={profitMarginPercentage}
                onChange={(e) => setProfitMarginPercentage(Number(e.target.value))}
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
                onChange={(e) => setFilamentUsedG(Number(e.target.value))}
                min="1"
                step="1"
              />
            </div>

            <div className="input-group">
              <label>Tiempo de Impresión (horas)</label>
              <input
                type="number"
                value={printTimeHours}
                onChange={(e) => setPrintTimeHours(Number(e.target.value))}
                min="0.1"
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label>Número de Piezas</label>
              <input
                type="number"
                value={numberOfPieces}
                onChange={(e) => setNumberOfPieces(Number(e.target.value))}
                min="1"
                step="1"
              />
            </div>

            <div className="input-group">
              <label>Tiempo Post-procesado (horas)</label>
              <input
                type="number"
                value={postProcessingTime}
                onChange={(e) => setPostProcessingTime(Number(e.target.value))}
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
                onChange={(e) => setPieceName(e.target.value)}
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
          <h3>📚 Biblioteca de Piezas</h3>
          <div className="pieces-list">
            {savedPieces.length === 0 ? (
              <p className="no-pieces">No hay piezas guardadas</p>
            ) : (
              savedPieces.map(piece => (
                <div key={piece.id} className="piece-item">
                  <div className="piece-info">
                    <h4>{piece.name}</h4>
                    <p>€{piece.finalPrice.toFixed(2)} ({piece.numberOfPieces || 1} piezas) - {piece.date}</p>
                    <small>{piece.filamentUsedG}g, {piece.printTimeHours}h, €{(piece.pricePerPiece || piece.finalPrice).toFixed(2)}/pieza</small>
                  </div>
                  <div className="piece-actions">
                    <button onClick={() => loadPiece(piece)} className="load-btn">
                      📂 Cargar
                    </button>
                    <button onClick={() => deletePiece(piece.id)} className="delete-btn">
                      🗑️
                    </button>
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
          <h3>💰 Resultados del Cálculo</h3>
          
          <div className="results-grid-full">
            <div className="result-item">
              <span className="result-label">Costo Filamento:</span>
              <span className="result-value">€{results.filamentCost.toFixed(2)}</span>
            </div>

            <div className="result-item">
              <span className="result-label">Costo Electricidad:</span>
              <span className="result-value">€{results.electricityCost.toFixed(2)}</span>
            </div>

            <div className="result-item">
              <span className="result-label">Costo Post-procesado:</span>
              <span className="result-value">€{results.postProcessingCost.toFixed(2)}</span>
            </div>

            <div className="result-item">
              <span className="result-label">Costo Base:</span>
              <span className="result-value">€{results.baseCost.toFixed(2)}</span>
            </div>

            <div className="result-item final-price">
              <span className="result-label">💰 PRECIO TOTAL:</span>
              <span className="result-value">€{results.finalPrice.toFixed(2)}</span>
            </div>

            <div className="result-item final-price">
              <span className="result-label">� PRECIO POR PIEZA:</span>
              <span className="result-value">€{results.pricePerPiece.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilamentCalculator;