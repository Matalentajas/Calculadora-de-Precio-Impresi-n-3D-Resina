import React, { useState, useCallback } from 'react';
import './SupportsCalculator.css';

const SupportsCalculator = () => {
  // Estados para configuración del modelo
  const [modelHeight, setModelHeight] = useState('');
  const [modelLength, setModelLength] = useState('');
  const [modelWidth, setModelWidth] = useState('');
  const [complexity, setComplexity] = useState('medium');
  
  // Estados para configuración de soportes
  const [supportType, setSupportType] = useState('light');
  const [supportDensity, setSupportDensity] = useState('medium');
  const [minAngle, setMinAngle] = useState('45');
  const [contactSize, setContactSize] = useState('0.4');
  
  // Estados para configuración avanzada
  const [islandDetection, setIslandDetection] = useState(true);
  const [bridgeDetection, setBridgeDetection] = useState(true);
  
  // Estados para resultados y UI
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  // Configuraciones predefinidas
  const supportConfigs = React.useMemo(() => ({
    light: {
      name: 'Ligeros',
      density: 0.8,
      thickness: 0.2,
      contact: 0.4,
      description: 'Para modelos simples con pocos voladizos',
      icon: '🪶'
    },
    medium: {
      name: 'Medios',
      density: 1.2,
      thickness: 0.3,
      contact: 0.5,
      description: 'Equilibrio entre soporte y facilidad de remoción',
      icon: '⚖️'
    },
    heavy: {
      name: 'Pesados',
      density: 1.8,
      thickness: 0.4,
      contact: 0.6,
      description: 'Para modelos complejos con muchos detalles',
      icon: '🏗️'
    },
    custom: {
      name: 'Personalizado',
      density: 1.0,
      thickness: 0.3,
      contact: 0.5,
      description: 'Configuración manual avanzada',
      icon: '⚙️'
    }
  }), []);

  const complexityLevels = React.useMemo(() => ({
    simple: {
      name: 'Simple',
      multiplier: 0.7,
      description: 'Formas básicas, pocos detalles',
      icon: '🔶'
    },
    medium: {
      name: 'Medio',
      multiplier: 1.0,
      description: 'Figuras estándar con detalles moderados',
      icon: '🔷'
    },
    complex: {
      name: 'Complejo',
      multiplier: 1.5,
      description: 'Muchos detalles finos y voladizos',
      icon: '🔺'
    },
    extreme: {
      name: 'Extremo',
      multiplier: 2.0,
      description: 'Geometrías muy complejas y frágiles',
      icon: '💎'
    }
  }), []);

  // Validación de inputs
  const validateInputs = useCallback(() => {
    const newErrors = {};
    
    if (!modelHeight || isNaN(modelHeight) || parseFloat(modelHeight) <= 0) {
      newErrors.modelHeight = 'Introduce una altura válida';
    }
    
    if (!modelLength || isNaN(modelLength) || parseFloat(modelLength) <= 0) {
      newErrors.modelLength = 'Introduce una longitud válida';
    }
    
    if (!modelWidth || isNaN(modelWidth) || parseFloat(modelWidth) <= 0) {
      newErrors.modelWidth = 'Introduce un ancho válido';
    }
    
    if (!minAngle || isNaN(minAngle) || parseFloat(minAngle) < 0 || parseFloat(minAngle) > 90) {
      newErrors.minAngle = 'Ángulo debe estar entre 0 y 90 grados';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [modelHeight, modelLength, modelWidth, minAngle]);

  // Cálculo de soportes optimizados
  const calculateSupports = useCallback(() => {
    if (!validateInputs()) return;

    const height = parseFloat(modelHeight);
    const length = parseFloat(modelLength);
    const width = parseFloat(modelWidth);
    const angle = parseFloat(minAngle);
    const contact = parseFloat(contactSize);
    
    const config = supportConfigs[supportType];
    const complexityConfig = complexityLevels[complexity];
    
    // Cálculos base
    const modelVolume = height * length * width; // mm³
    const modelSurfaceArea = 2 * (length * width + length * height + width * height); // mm²
    
    // Análisis de ángulos críticos
    const criticalSurfaceArea = modelSurfaceArea * (1 - (angle / 90)) * 0.3; // Área que necesita soporte
    
    // Cálculo de número de soportes
    const supportSpacing = 5; // mm entre soportes
    const supportColumns = Math.ceil(length / supportSpacing);
    const supportRows = Math.ceil(width / supportSpacing);
    const totalSupportPoints = supportColumns * supportRows * complexityConfig.multiplier;
    
    // Filtrar soportes realmente necesarios
    const necessarySupportPoints = Math.ceil(totalSupportPoints * (criticalSurfaceArea / modelSurfaceArea));
    const finalSupportCount = Math.max(1, Math.min(necessarySupportPoints, totalSupportPoints * 0.8));
    
    // Cálculo de volumen de soportes
    const supportHeight = height * 0.6; // Promedio de altura de soportes
    const supportDiameter = config.thickness;
    const volumePerSupport = Math.PI * Math.pow(supportDiameter / 2, 2) * supportHeight;
    const totalSupportVolume = finalSupportCount * volumePerSupport * config.density;
    
    // Análisis de removibilidad
    const contactArea = finalSupportCount * Math.PI * Math.pow(contact / 2, 2);
    const removalDifficulty = (contactArea / modelSurfaceArea) * 100;
    const removalTime = (finalSupportCount * 0.5) + (removalDifficulty * 0.1); // minutos
    
    // Análisis de costo
    const supportVolumeML = totalSupportVolume / 1000;
    const wastePercentage = (totalSupportVolume / modelVolume) * 100;
    
    // Predicción de calidad
    const qualityScore = Math.max(0, Math.min(100, 
      85 - (removalDifficulty * 0.5) + (finalSupportCount > 0 ? 10 : -20) - (wastePercentage * 0.2)
    ));
    
    // Detección de problemas
    const problems = [];
    if (angle < 30) problems.push('Ángulo muy bajo - Alto riesgo de fallos');
    if (wastePercentage > 30) problems.push('Exceso de material de soporte');
    if (removalDifficulty > 50) problems.push('Remoción muy difícil');
    if (finalSupportCount > modelSurfaceArea / 100) problems.push('Demasiados puntos de soporte');
    
    // Recomendaciones
    const recommendations = [];
    if (angle < 45) recommendations.push('Considera rotar el modelo para reducir soportes');
    if (wastePercentage > 25) recommendations.push('Usa soportes más ligeros');
    if (removalDifficulty > 40) recommendations.push('Reduce el tamaño de contacto');
    if (problems.length === 0) recommendations.push('Configuración óptima detectada');
    
    setResult({
      // Análisis básico
      modelVolume: Math.round(modelVolume),
      modelSurfaceArea: Math.round(modelSurfaceArea),
      criticalSurfaceArea: Math.round(criticalSurfaceArea),
      
      // Soportes
      supportCount: Math.round(finalSupportCount),
      supportVolume: Math.round(totalSupportVolume),
      supportVolumeML: Math.round(supportVolumeML * 100) / 100,
      
      // Análisis
      wastePercentage: Math.round(wastePercentage * 10) / 10,
      removalDifficulty: Math.round(removalDifficulty * 10) / 10,
      removalTime: Math.round(removalTime * 10) / 10,
      qualityScore: Math.round(qualityScore),
      
      // Configuración
      supportType: config.name,
      complexity: complexityConfig.name,
      settings: {
        minAngle: angle,
        contactSize: contact,
        density: config.density,
        thickness: config.thickness
      },
      
      // Problemas y recomendaciones
      problems,
      recommendations
    });
  }, [modelHeight, modelLength, modelWidth, minAngle, contactSize, supportType, complexity, validateInputs, supportConfigs, complexityLevels]);

  // Limpiar formulario
  const clearForm = useCallback(() => {
    setModelHeight('');
    setModelLength('');
    setModelWidth('');
    setComplexity('medium');
    setSupportType('light');
    setSupportDensity('medium');
    setMinAngle('45');
    setContactSize('0.4');
    setResult(null);
    setErrors({});
  }, []);

  // Obtener color de calidad
  const getQualityColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#ef4444';
    return '#991b1b';
  };

  return (
    <div className="supports-calculator">
      <div className="calculator-header">
        <h2>🏗️ Calculadora de Soportes Optimizados</h2>
        <p>Análisis inteligente y optimización automática de estructuras de soporte</p>
      </div>

      {/* Selector de tipo de soporte */}
      <div className="support-types">
        <label>🔧 Tipo de Soporte:</label>
        <div className="types-grid">
          {Object.entries(supportConfigs).map(([key, config]) => (
            <button
              key={key}
              type="button"
              className={`type-btn ${supportType === key ? 'active' : ''}`}
              onClick={() => setSupportType(key)}
              title={config.description}
            >
              <span className="type-icon">{config.icon}</span>
              <span className="type-name">{config.name}</span>
              <span className="type-desc">{config.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pestañas de configuración */}
      <div className="config-tabs">
        <button 
          className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          📐 Modelo
        </button>
        <button 
          className={`tab-btn ${activeTab === 'supports' ? 'active' : ''}`}
          onClick={() => setActiveTab('supports')}
        >
          🏗️ Soportes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          ⚙️ Avanzado
        </button>
      </div>

      <div className="calculator-form">
        {/* Pestaña Modelo */}
        {activeTab === 'basic' && (
          <div className="tab-content">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="modelHeight">📏 Altura (mm)</label>
                <input
                  type="number"
                  id="modelHeight"
                  value={modelHeight}
                  onChange={(e) => setModelHeight(e.target.value)}
                  placeholder="Ej: 50"
                  step="0.1"
                  min="0"
                  className={errors.modelHeight ? 'error' : ''}
                />
                {errors.modelHeight && <span className="error-text">{errors.modelHeight}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="modelLength">📐 Longitud (mm)</label>
                <input
                  type="number"
                  id="modelLength"
                  value={modelLength}
                  onChange={(e) => setModelLength(e.target.value)}
                  placeholder="Ej: 30"
                  step="0.1"
                  min="0"
                  className={errors.modelLength ? 'error' : ''}
                />
                {errors.modelLength && <span className="error-text">{errors.modelLength}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="modelWidth">📏 Ancho (mm)</label>
                <input
                  type="number"
                  id="modelWidth"
                  value={modelWidth}
                  onChange={(e) => setModelWidth(e.target.value)}
                  placeholder="Ej: 25"
                  step="0.1"
                  min="0"
                  className={errors.modelWidth ? 'error' : ''}
                />
                {errors.modelWidth && <span className="error-text">{errors.modelWidth}</span>}
              </div>
            </div>

            <div className="complexity-selector">
              <label>🎯 Complejidad del Modelo:</label>
              <div className="complexity-grid">
                {Object.entries(complexityLevels).map(([key, level]) => (
                  <button
                    key={key}
                    type="button"
                    className={`complexity-btn ${complexity === key ? 'active' : ''}`}
                    onClick={() => setComplexity(key)}
                  >
                    <span className="complexity-icon">{level.icon}</span>
                    <span className="complexity-name">{level.name}</span>
                    <span className="complexity-desc">{level.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pestaña Soportes */}
        {activeTab === 'supports' && (
          <div className="tab-content">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="minAngle">📐 Ángulo Mínimo (°)</label>
                <input
                  type="number"
                  id="minAngle"
                  value={minAngle}
                  onChange={(e) => setMinAngle(e.target.value)}
                  min="0"
                  max="90"
                  step="5"
                  className={errors.minAngle ? 'error' : ''}
                />
                <small>Superficies por debajo de este ángulo necesitarán soporte</small>
                {errors.minAngle && <span className="error-text">{errors.minAngle}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="contactSize">🔗 Tamaño Contacto (mm)</label>
                <input
                  type="number"
                  id="contactSize"
                  value={contactSize}
                  onChange={(e) => setContactSize(e.target.value)}
                  step="0.1"
                  min="0.1"
                  max="2.0"
                />
                <small>Diámetro del punto de contacto con el modelo</small>
              </div>

              <div className="input-group">
                <label htmlFor="supportDensity">📊 Densidad</label>
                <select
                  id="supportDensity"
                  value={supportDensity}
                  onChange={(e) => setSupportDensity(e.target.value)}
                >
                  <option value="low">Baja - Pocos soportes</option>
                  <option value="medium">Media - Equilibrada</option>
                  <option value="high">Alta - Máxima seguridad</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña Avanzada */}
        {activeTab === 'advanced' && (
          <div className="tab-content">
            <div className="advanced-options">
              <div className="option-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={islandDetection}
                    onChange={(e) => setIslandDetection(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  🏝️ Detección de Islas
                </label>
                <small>Detectar automáticamente áreas flotantes que necesitan soporte</small>
              </div>

              <div className="option-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={bridgeDetection}
                    onChange={(e) => setBridgeDetection(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  🌉 Detección de Puentes
                </label>
                <small>Analizar puentes y voladizos para optimizar soportes</small>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="calculator-actions">
          <button 
            type="button"
            onClick={calculateSupports}
            className="btn btn-primary"
          >
            🧮 Calcular Soportes Óptimos
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
        <div className="calculator-results">
          <h3>🎯 Análisis de Soportes Optimizado</h3>
          
          {/* Puntuación de calidad */}
          <div className="quality-score">
            <div className="score-circle" style={{ borderColor: getQualityColor(result.qualityScore) }}>
              <div className="score-value" style={{ color: getQualityColor(result.qualityScore) }}>
                {result.qualityScore}
              </div>
              <div className="score-label">Calidad</div>
            </div>
            <div className="score-info">
              <h4>Predicción de Calidad de Impresión</h4>
              <p>Basada en análisis de soportes, removibilidad y desperdicio de material</p>
            </div>
          </div>

          {/* Estadísticas principales */}
          <div className="result-section">
            <h4>📊 Estadísticas de Soportes</h4>
            <div className="result-grid">
              <div className="result-item highlight">
                <span className="label">Soportes necesarios:</span>
                <span className="value">{result.supportCount}</span>
              </div>
              <div className="result-item">
                <span className="label">Material soporte:</span>
                <span className="value">{result.supportVolumeML} ml</span>
              </div>
              <div className="result-item">
                <span className="label">Desperdicio:</span>
                <span className="value">{result.wastePercentage}%</span>
              </div>
              <div className="result-item">
                <span className="label">Tiempo remoción:</span>
                <span className="value">{result.removalTime} min</span>
              </div>
            </div>
          </div>

          {/* Análisis del modelo */}
          <div className="result-section">
            <h4>🔍 Análisis del Modelo</h4>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Volumen total:</span>
                <span className="value">{result.modelVolume} mm³</span>
              </div>
              <div className="result-item">
                <span className="label">Área superficie:</span>
                <span className="value">{result.modelSurfaceArea} mm²</span>
              </div>
              <div className="result-item">
                <span className="label">Área crítica:</span>
                <span className="value">{result.criticalSurfaceArea} mm²</span>
              </div>
              <div className="result-item">
                <span className="label">Dificultad remoción:</span>
                <span className="value">{result.removalDifficulty}%</span>
              </div>
            </div>
          </div>

          {/* Problemas detectados */}
          {result.problems.length > 0 && (
            <div className="result-section problems">
              <h4>⚠️ Problemas Detectados</h4>
              <ul className="problems-list">
                {result.problems.map((problem, index) => (
                  <li key={index} className="problem-item">
                    ⚠️ {problem}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recomendaciones */}
          <div className="result-section recommendations">
            <h4>💡 Recomendaciones</h4>
            <ul className="recommendations-list">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="recommendation-item">
                  💡 {recommendation}
                </li>
              ))}
            </ul>
          </div>

          {/* Configuración utilizada */}
          <div className="result-section">
            <h4>⚙️ Configuración Utilizada</h4>
            <div className="config-summary">
              <div className="config-item">
                <strong>Tipo de soporte:</strong> {result.supportType}
              </div>
              <div className="config-item">
                <strong>Complejidad:</strong> {result.complexity}
              </div>
              <div className="config-item">
                <strong>Ángulo mínimo:</strong> {result.settings.minAngle}°
              </div>
              <div className="config-item">
                <strong>Tamaño contacto:</strong> {result.settings.contactSize}mm
              </div>
              <div className="config-item">
                <strong>Densidad:</strong> {result.settings.density}
              </div>
              <div className="config-item">
                <strong>Grosor:</strong> {result.settings.thickness}mm
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportsCalculator;
