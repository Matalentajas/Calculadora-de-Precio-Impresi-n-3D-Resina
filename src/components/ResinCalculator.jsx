import { useState, useEffect } from 'react';

function ResinCalculator() {
  // Estados para las configuraciones
  const [resinCostPerLiter, setResinCostPerLiter] = useState(25);
  const [consumptionPerHour, setConsumptionPerHour] = useState(0.18);
  const [postProcessingCostPerHour, setPostProcessingCostPerHour] = useState(15);
  const [profitMarginPercentage, setProfitMarginPercentage] = useState(30);

  // Estados para el cálculo
  const [resinUsedML, setResinUsedML] = useState(50);
  const [printTimeHours, setPrintTimeHours] = useState(8);
  const [numberOfPieces, setNumberOfPieces] = useState(1);
  const [postProcessingTime, setPostProcessingTime] = useState(1);

  // Estados para las piezas guardadas
  const [pieceName, setPieceName] = useState('');
  const [savedPieces, setSavedPieces] = useState([]);
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Cargar piezas guardadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('resinPieces3D');
    if (saved) {
      setSavedPieces(JSON.parse(saved));
    }
    
    const history = localStorage.getItem('resinCalculationHistory3D');
    if (history) {
      setCalculationHistory(JSON.parse(history));
    }
  }, []);

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    // Costo de la resina
    const resinCost = (resinUsedML / 1000) * resinCostPerLiter;
    
    // Costo de consumo por hora (electricidad + desgaste)
    const consumptionCost = printTimeHours * consumptionPerHour;
    
    // Costo de post-procesado
    const postProcessingCost = postProcessingTime * postProcessingCostPerHour;
    
    // Costo base por lote
    const baseCost = resinCost + consumptionCost + postProcessingCost;
    
    // Precio final con margen de beneficio
    const finalPrice = baseCost * (1 + profitMarginPercentage / 100);
    
    // Precio por pieza
    const pricePerPiece = finalPrice / numberOfPieces;
    
    return {
      resinCost,
      consumptionCost,
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
      resinUsedML,
      printTimeHours,
      numberOfPieces,
      postProcessingTime,
      finalPrice: results.finalPrice,
      pricePerPiece: results.pricePerPiece,
      settings: {
        resinCostPerLiter,
        consumptionPerHour,
        postProcessingCostPerHour,
        profitMarginPercentage
      }
    };

    const updatedPieces = [...savedPieces, newPiece];
    setSavedPieces(updatedPieces);
    localStorage.setItem('resinPieces3D', JSON.stringify(updatedPieces));
    setPieceName('');

    // Agregar al historial
    addToHistory(results);
  };

  // Función para cargar pieza
  const loadPiece = (piece) => {
    setResinUsedML(piece.resinUsedML);
    setPrintTimeHours(piece.printTimeHours);
    setNumberOfPieces(piece.numberOfPieces || 1);
    setPostProcessingTime(piece.postProcessingTime);
    setResinCostPerLiter(piece.settings.resinCostPerLiter);
    setConsumptionPerHour(piece.settings.consumptionPerHour);
    setPostProcessingCostPerHour(piece.settings.postProcessingCostPerHour);
    setProfitMarginPercentage(piece.settings.profitMarginPercentage);
  };

  // Función para eliminar pieza
  const deletePiece = (pieceId) => {
    const updatedPieces = savedPieces.filter(piece => piece.id !== pieceId);
    setSavedPieces(updatedPieces);
    localStorage.setItem('resinPieces3D', JSON.stringify(updatedPieces));
  };

  // Función para agregar al historial
  const addToHistory = (results) => {
    const historyEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      finalPrice: results.finalPrice,
      resinUsedML,
      printTimeHours
    };

    const updatedHistory = [historyEntry, ...calculationHistory].slice(0, 10); // Mantener solo los últimos 10
    setCalculationHistory(updatedHistory);
    localStorage.setItem('resinCalculationHistory3D', JSON.stringify(updatedHistory));
  };

  const results = calculateTotalPrice();

  return (
    <div className="resin-calculator">
      {/* Primera fila - 3 columnas */}
      <div className="calculator-grid">
        {/* Columna 1: Configuración de Impresora */}
        <div className="settings-panel">
          <h3>⚙️ Configuración de Impresora</h3>
          
          <div className="settings-grid">
            <div className="setting-group">
              <label>Costo Resina por Litro (€)</label>
              <input
                type="number"
                value={resinCostPerLiter}
                onChange={(e) => setResinCostPerLiter(Number(e.target.value))}
                min="0"
                step="0.5"
              />
            </div>

            <div className="setting-group">
              <label>Consumo Electricidad por Hora (€)</label>
              <input
                type="number"
                value={consumptionPerHour}
                onChange={(e) => setConsumptionPerHour(Number(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className="setting-group">
              <label>Costo Post-procesado por Hora (€)</label>
              <input
                type="number"
                value={postProcessingCostPerHour}
                onChange={(e) => setPostProcessingCostPerHour(Number(e.target.value))}
                min="0"
                step="0.5"
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
              <label>Resina Utilizada (ml)</label>
              <input
                type="number"
                value={resinUsedML}
                onChange={(e) => setResinUsedML(Number(e.target.value))}
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
                    <small>{piece.resinUsedML}ml, {piece.printTimeHours}h, €{(piece.pricePerPiece || piece.finalPrice).toFixed(2)}/pieza</small>
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
              <span className="result-label">Costo Resina:</span>
              <span className="result-value">€{results.resinCost.toFixed(2)}</span>
            </div>

            <div className="result-item">
              <span className="result-label">Costo Consumo:</span>
              <span className="result-value">€{results.consumptionCost.toFixed(2)}</span>
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
              <span className="result-label">🔢 PRECIO POR PIEZA:</span>
              <span className="result-value">€{results.pricePerPiece.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResinCalculator;