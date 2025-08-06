import React, { useState, useCallback } from 'react';
import './ScaleCalculator.css';

const ScaleCalculator = () => {
  // Estados para los inputs
  const [baseHeight, setBaseHeight] = useState('');
  const [figureHeight, setFigureHeight] = useState('');
  const [targetTotalHeight, setTargetTotalHeight] = useState('');
  const [unit, setUnit] = useState('mm'); // mm o cm
  
  // Estados para resultados y UI
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  // Validación de inputs
  const validateInputs = useCallback(() => {
    const newErrors = {};
    
    if (!baseHeight || isNaN(baseHeight) || parseFloat(baseHeight) <= 0) {
      newErrors.baseHeight = 'Introduce una altura válida para la peana';
    }
    
    if (!figureHeight || isNaN(figureHeight) || parseFloat(figureHeight) <= 0) {
      newErrors.figureHeight = 'Introduce una altura válida para la figura';
    }
    
    if (!targetTotalHeight || isNaN(targetTotalHeight) || parseFloat(targetTotalHeight) <= 0) {
      newErrors.targetTotalHeight = 'Introduce una altura total deseada válida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [baseHeight, figureHeight, targetTotalHeight]);

  // Cálculo del factor de escala
  const calculateScale = useCallback(() => {
    if (!validateInputs()) return;

    const baseHeightNum = parseFloat(baseHeight);
    const figureHeightNum = parseFloat(figureHeight);
    let targetHeightNum = parseFloat(targetTotalHeight);
    
    // Convertir a mm si es necesario
    if (unit === 'cm') {
      targetHeightNum = targetHeightNum * 10;
    }
    
    const currentTotalHeight = baseHeightNum + figureHeightNum;
    const scaleFactor = (targetHeightNum / currentTotalHeight) * 100;
    
    // Calcular nuevas dimensiones
    const newBaseHeight = (baseHeightNum * scaleFactor) / 100;
    const newFigureHeight = (figureHeightNum * scaleFactor) / 100;
    
    setResult({
      currentTotalHeight: currentTotalHeight,
      scaleFactor: scaleFactor,
      newBaseHeight: newBaseHeight,
      newFigureHeight: newFigureHeight,
      newTotalHeight: targetHeightNum,
      unit: unit
    });
  }, [baseHeight, figureHeight, targetTotalHeight, unit, validateInputs]);

  // Copiar al portapapeles
  const copyToClipboard = useCallback(async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(`${result.scaleFactor.toFixed(2)}%`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }, [result]);

  // Limpiar formulario
  const clearForm = useCallback(() => {
    setBaseHeight('');
    setFigureHeight('');
    setTargetTotalHeight('');
    setResult(null);
    setErrors({});
    setCopied(false);
  }, []);

  return (
    <div className="scale-calculator">
      <div className="scale-calculator__header">
        <h2>🎯 Calculadora de Escalado 3D</h2>
        <p>Calcula el factor de escala perfecto para tus figuras y peanas</p>
      </div>

      <div className="scale-calculator__form">
        {/* Selector de Unidades */}
        <div className="scale-calculator__unit-selector">
          <label>Unidad de medida:</label>
          <div className="unit-toggle">
            <button 
              type="button"
              className={`unit-btn ${unit === 'mm' ? 'active' : ''}`}
              onClick={() => setUnit('mm')}
            >
              mm
            </button>
            <button 
              type="button"
              className={`unit-btn ${unit === 'cm' ? 'active' : ''}`}
              onClick={() => setUnit('cm')}
            >
              cm
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="scale-calculator__inputs">
          <div className="input-group">
            <label htmlFor="baseHeight">
              🏠 Altura actual de la peana ({unit})
            </label>
            <input
              type="number"
              id="baseHeight"
              value={baseHeight}
              onChange={(e) => setBaseHeight(e.target.value)}
              placeholder={`Ej: ${unit === 'mm' ? '5' : '0.5'}`}
              step={unit === 'mm' ? '0.1' : '0.01'}
              min="0"
              className={errors.baseHeight ? 'error' : ''}
            />
            {errors.baseHeight && <span className="error-text">{errors.baseHeight}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="figureHeight">
              🎭 Altura actual de la figura ({unit})
            </label>
            <input
              type="number"
              id="figureHeight"
              value={figureHeight}
              onChange={(e) => setFigureHeight(e.target.value)}
              placeholder={`Ej: ${unit === 'mm' ? '25' : '2.5'}`}
              step={unit === 'mm' ? '0.1' : '0.01'}
              min="0"
              className={errors.figureHeight ? 'error' : ''}
            />
            {errors.figureHeight && <span className="error-text">{errors.figureHeight}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="targetHeight">
              📏 Altura total deseada ({unit})
            </label>
            <input
              type="number"
              id="targetHeight"
              value={targetTotalHeight}
              onChange={(e) => setTargetTotalHeight(e.target.value)}
              placeholder={`Ej: ${unit === 'mm' ? '40' : '4.0'}`}
              step={unit === 'mm' ? '0.1' : '0.01'}
              min="0"
              className={errors.targetTotalHeight ? 'error' : ''}
            />
            {errors.targetTotalHeight && <span className="error-text">{errors.targetTotalHeight}</span>}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="scale-calculator__actions">
          <button 
            type="button"
            onClick={calculateScale}
            className="btn btn-primary"
          >
            🧮 Calcular Escala
          </button>
          <button 
            type="button"
            onClick={clearForm}
            className="btn btn-secondary"
          >
            🧹 Limpiar
          </button>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <div className="scale-calculator__results">
          <h3>📊 Resultados del Escalado</h3>
          
          {/* Información actual */}
          <div className="result-section">
            <h4>📐 Dimensiones Actuales</h4>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Altura total actual:</span>
                <span className="value">{result.currentTotalHeight.toFixed(2)} mm</span>
              </div>
            </div>
          </div>

          {/* Factor de escala principal */}
          <div className="result-section highlight">
            <h4>🎯 Factor de Escala</h4>
            <div className="scale-factor">
              <span className="scale-value">{result.scaleFactor.toFixed(2)}%</span>
              <button 
                onClick={copyToClipboard}
                className="copy-btn"
                title="Copiar al portapapeles"
              >
                {copied ? '✅' : '📋'} {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <p className="scale-interpretation">
              {result.scaleFactor > 100 ? '⬆️ Aumentar escala' : 
               result.scaleFactor < 100 ? '⬇️ Reducir escala' : 
               '✅ Mantener escala actual'}
            </p>
          </div>

          {/* Nuevas dimensiones */}
          <div className="result-section">
            <h4>📏 Nuevas Dimensiones</h4>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Nueva altura peana:</span>
                <span className="value">{result.newBaseHeight.toFixed(2)} mm</span>
              </div>
              <div className="result-item">
                <span className="label">Nueva altura figura:</span>
                <span className="value">{result.newFigureHeight.toFixed(2)} mm</span>
              </div>
              <div className="result-item highlight">
                <span className="label">Altura total final:</span>
                <span className="value">{result.newTotalHeight.toFixed(2)} mm</span>
              </div>
            </div>
          </div>

          {/* Vista previa proporcional */}
          <div className="result-section">
            <h4>👁️ Vista Previa Proporcional</h4>
            <div className="proportion-preview">
              <div className="proportion-comparison">
                <div className="proportion-item">
                  <div className="proportion-title">Antes</div>
                  <div className="proportion-visual">
                    <div 
                      className="base-bar original"
                      style={{
                        height: `${Math.max(10, (result.currentTotalHeight > 0 ? (parseFloat(baseHeight) / result.currentTotalHeight) * 60 : 10))}px`
                      }}
                      title={`Peana: ${baseHeight} mm`}
                    ></div>
                    <div 
                      className="figure-bar original"
                      style={{
                        height: `${Math.max(10, (result.currentTotalHeight > 0 ? (parseFloat(figureHeight) / result.currentTotalHeight) * 60 : 10))}px`
                      }}
                      title={`Figura: ${figureHeight} mm`}
                    ></div>
                  </div>
                  <div className="proportion-label">{result.currentTotalHeight.toFixed(1)}mm</div>
                </div>
                
                <div className="proportion-arrow">➡️</div>
                
                <div className="proportion-item">
                  <div className="proportion-title">Después</div>
                  <div className="proportion-visual">
                    <div 
                      className="base-bar scaled"
                      style={{
                        height: `${Math.max(10, (result.newTotalHeight > 0 ? (result.newBaseHeight / result.newTotalHeight) * 60 : 10))}px`
                      }}
                      title={`Peana escalada: ${result.newBaseHeight.toFixed(2)} mm`}
                    ></div>
                    <div 
                      className="figure-bar scaled"
                      style={{
                        height: `${Math.max(10, (result.newTotalHeight > 0 ? (result.newFigureHeight / result.newTotalHeight) * 60 : 10))}px`
                      }}
                      title={`Figura escalada: ${result.newFigureHeight.toFixed(2)} mm`}
                    ></div>
                  </div>
                  <div className="proportion-label">{result.newTotalHeight.toFixed(1)}mm</div>
                </div>
              </div>
              <div className="proportion-legend">
                <div className="legend-item">
                  <div className="legend-color base"></div>
                  <span>Peana</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color figure"></div>
                  <span>Figura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleCalculator;
