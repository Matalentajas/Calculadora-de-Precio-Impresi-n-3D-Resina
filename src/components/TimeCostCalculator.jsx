import React, { useState, useCallback } from 'react';
import './TimeCostCalculator.css';

const TimeCostCalculator = () => {
  // Estados para inputs de la pieza
  const [pieceHeight, setPieceHeight] = useState('');
  const [pieceLength, setPieceLength] = useState('');
  const [pieceWidth, setPieceWidth] = useState('');
  const [layerHeight, setLayerHeight] = useState('0.05');
  const [infillDensity, setInfillDensity] = useState('20');
  
  // Estados para configuración de impresora
  const [printerProfile, setPrinterProfile] = useState('elegoo-saturn');
  const [printSpeed, setPrintSpeed] = useState('60');
  const [exposureTime, setExposureTime] = useState('2.5');
  
  // Estados para costos
  const [resinPrice, setResinPrice] = useState('25');
  const [electricityCost, setElectricityCost] = useState('0.15');
  
  // Estados para resultados y UI
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  // Perfiles de impresoras predefinidos
  const printerProfiles = React.useMemo(() => ({
    'elegoo-saturn': {
      name: 'Elegoo Saturn',
      buildVolume: { x: 192, y: 120, z: 200 },
      defaultSpeed: 60,
      defaultExposure: 2.5,
      consumption: 120, // watts
      icon: '🪐'
    },
    'anycubic-photon': {
      name: 'Anycubic Photon',
      buildVolume: { x: 115, y: 65, z: 155 },
      defaultSpeed: 50,
      defaultExposure: 8,
      consumption: 80,
      icon: '⚡'
    },
    'prusa-sl1': {
      name: 'Prusa SL1',
      buildVolume: { x: 120, y: 68, z: 150 },
      defaultSpeed: 55,
      defaultExposure: 6,
      consumption: 100,
      icon: '🔧'
    },
    'formlabs-form3': {
      name: 'Formlabs Form 3',
      buildVolume: { x: 145, y: 145, z: 185 },
      defaultSpeed: 40,
      defaultExposure: 1.8,
      consumption: 150,
      icon: '🎯'
    },
    'custom': {
      name: 'Personalizada',
      buildVolume: { x: 200, y: 200, z: 200 },
      defaultSpeed: 60,
      defaultExposure: 3,
      consumption: 100,
      icon: '⚙️'
    }
  }), []);

  // Validación de inputs
  const validateInputs = useCallback(() => {
    const newErrors = {};
    
    if (!pieceHeight || isNaN(pieceHeight) || parseFloat(pieceHeight) <= 0) {
      newErrors.pieceHeight = 'Introduce una altura válida';
    }
    
    if (!pieceLength || isNaN(pieceLength) || parseFloat(pieceLength) <= 0) {
      newErrors.pieceLength = 'Introduce una longitud válida';
    }
    
    if (!pieceWidth || isNaN(pieceWidth) || parseFloat(pieceWidth) <= 0) {
      newErrors.pieceWidth = 'Introduce un ancho válido';
    }
    
    if (!layerHeight || isNaN(layerHeight) || parseFloat(layerHeight) <= 0) {
      newErrors.layerHeight = 'Introduce una altura de capa válida';
    }
    
    if (!resinPrice || isNaN(resinPrice) || parseFloat(resinPrice) <= 0) {
      newErrors.resinPrice = 'Introduce un precio de resina válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [pieceHeight, pieceLength, pieceWidth, layerHeight, resinPrice]);

  // Cálculo principal
  const calculateTimeCost = useCallback(() => {
    if (!validateInputs()) return;

    const profile = printerProfiles[printerProfile];
    
    // Datos de entrada
    const height = parseFloat(pieceHeight);
    const length = parseFloat(pieceLength);
    const width = parseFloat(pieceWidth);
    const layer = parseFloat(layerHeight);
    const infill = parseFloat(infillDensity);
    const speed = parseFloat(printSpeed);
    const exposure = parseFloat(exposureTime);
    const resinCost = parseFloat(resinPrice);
    const electricCost = parseFloat(electricityCost);
    
    // Cálculos de tiempo
    const totalLayers = Math.ceil(height / layer);
    const timePerLayer = exposure; // segundos por capa
    const totalExposureTime = (totalLayers * timePerLayer) / 60; // minutos
    
    // Tiempo adicional (movimiento, separación de capas, etc.)
    const additionalTime = totalLayers * 0.5; // 0.5 min por capa para movimientos
    const totalPrintTime = totalExposureTime + additionalTime; // minutos
    const totalPrintTimeHours = totalPrintTime / 60;
    
    // Cálculos de volumen y material
    const pieceVolume = length * width * height; // mm³
    const solidVolume = (pieceVolume * infill) / 100; // considerando relleno
    const supportVolume = solidVolume * 0.15; // estimación 15% para soportes
    const totalVolume = solidVolume + supportVolume; // mm³
    const totalVolumeMl = totalVolume / 1000; // ml
    
    // Cálculos de costos
    const materialCost = (totalVolumeMl / 1000) * resinCost; // costo de resina
    const electricityCostTotal = (totalPrintTimeHours * profile.consumption * electricCost) / 1000;
    const totalCost = materialCost + electricityCostTotal;
    
    // Análisis de eficiencia
    const buildVolumeUsage = (pieceVolume / (profile.buildVolume.x * profile.buildVolume.y * profile.buildVolume.z)) * 100;
    const costPerHour = totalCost / totalPrintTimeHours;
    const efficiency = Math.max(0, Math.min(100, 100 - (totalPrintTimeHours * 2) + (buildVolumeUsage * 0.5)));
    
    setResult({
      // Tiempo
      totalLayers,
      totalPrintTimeMinutes: Math.round(totalPrintTime),
      totalPrintTimeHours: Math.round(totalPrintTimeHours * 100) / 100,
      estimatedFinishTime: new Date(Date.now() + totalPrintTime * 60000).toLocaleTimeString(),
      
      // Material
      solidVolume: Math.round(solidVolume),
      supportVolume: Math.round(supportVolume),
      totalVolumeMl: Math.round(totalVolumeMl * 100) / 100,
      
      // Costos
      materialCost: Math.round(materialCost * 100) / 100,
      electricityCost: Math.round(electricityCostTotal * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      
      // Análisis
      buildVolumeUsage: Math.round(buildVolumeUsage * 10) / 10,
      costPerHour: Math.round(costPerHour * 100) / 100,
      efficiency: Math.round(efficiency),
      
      // Configuración utilizada
      profile: profile.name,
      settings: {
        layerHeight: layer,
        infillDensity: infill,
        printSpeed: speed,
        exposureTime: exposure
      }
    });
  }, [pieceHeight, pieceLength, pieceWidth, layerHeight, infillDensity, printerProfile, printSpeed, exposureTime, resinPrice, electricityCost, validateInputs, printerProfiles]);

  // Cambio de perfil de impresora
  const handleProfileChange = useCallback((profile) => {
    setPrinterProfile(profile);
    const profileData = printerProfiles[profile];
    setPrintSpeed(profileData.defaultSpeed.toString());
    setExposureTime(profileData.defaultExposure.toString());
  }, [printerProfiles]);

  // Limpiar formulario
  const clearForm = useCallback(() => {
    setPieceHeight('');
    setPieceLength('');
    setPieceWidth('');
    setLayerHeight('0.05');
    setInfillDensity('20');
    setPrintSpeed('60');
    setExposureTime('2.5');
    setResinPrice('25');
    setElectricityCost('0.15');
    setResult(null);
    setErrors({});
  }, []);

  // Formatear tiempo
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="time-cost-calculator">
      <div className="calculator-header">
        <h2>⏱️ Calculadora de Tiempos y Costos</h2>
        <p>Análisis completo de tiempo de impresión y costos de material</p>
      </div>

      {/* Selector de perfil de impresora */}
      <div className="printer-profiles">
        <label>🖨️ Perfil de Impresora:</label>
        <div className="profiles-grid">
          {Object.entries(printerProfiles).map(([key, profile]) => (
            <button
              key={key}
              type="button"
              className={`profile-btn ${printerProfile === key ? 'active' : ''}`}
              onClick={() => handleProfileChange(key)}
            >
              <span className="profile-icon">{profile.icon}</span>
              <span className="profile-name">{profile.name}</span>
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
          📐 Dimensiones
        </button>
        <button 
          className={`tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          ⚙️ Avanzado
        </button>
        <button 
          className={`tab-btn ${activeTab === 'costs' ? 'active' : ''}`}
          onClick={() => setActiveTab('costs')}
        >
          💰 Costos
        </button>
      </div>

      <div className="calculator-form">
        {/* Pestaña Básica */}
        {activeTab === 'basic' && (
          <div className="tab-content">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="pieceHeight">📏 Altura (mm)</label>
                <input
                  type="number"
                  id="pieceHeight"
                  value={pieceHeight}
                  onChange={(e) => setPieceHeight(e.target.value)}
                  placeholder="Ej: 50"
                  step="0.1"
                  min="0"
                  className={errors.pieceHeight ? 'error' : ''}
                />
                {errors.pieceHeight && <span className="error-text">{errors.pieceHeight}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="pieceLength">📐 Longitud (mm)</label>
                <input
                  type="number"
                  id="pieceLength"
                  value={pieceLength}
                  onChange={(e) => setPieceLength(e.target.value)}
                  placeholder="Ej: 30"
                  step="0.1"
                  min="0"
                  className={errors.pieceLength ? 'error' : ''}
                />
                {errors.pieceLength && <span className="error-text">{errors.pieceLength}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="pieceWidth">📏 Ancho (mm)</label>
                <input
                  type="number"
                  id="pieceWidth"
                  value={pieceWidth}
                  onChange={(e) => setPieceWidth(e.target.value)}
                  placeholder="Ej: 25"
                  step="0.1"
                  min="0"
                  className={errors.pieceWidth ? 'error' : ''}
                />
                {errors.pieceWidth && <span className="error-text">{errors.pieceWidth}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Pestaña Avanzada */}
        {activeTab === 'advanced' && (
          <div className="tab-content">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="layerHeight">🔬 Altura de Capa (mm)</label>
                <input
                  type="number"
                  id="layerHeight"
                  value={layerHeight}
                  onChange={(e) => setLayerHeight(e.target.value)}
                  step="0.01"
                  min="0.01"
                  max="0.3"
                  className={errors.layerHeight ? 'error' : ''}
                />
                {errors.layerHeight && <span className="error-text">{errors.layerHeight}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="infillDensity">🔲 Densidad Relleno (%)</label>
                <input
                  type="number"
                  id="infillDensity"
                  value={infillDensity}
                  onChange={(e) => setInfillDensity(e.target.value)}
                  min="0"
                  max="100"
                  step="5"
                />
              </div>

              <div className="input-group">
                <label htmlFor="printSpeed">⚡ Velocidad (mm/min)</label>
                <input
                  type="number"
                  id="printSpeed"
                  value={printSpeed}
                  onChange={(e) => setPrintSpeed(e.target.value)}
                  min="10"
                  max="200"
                  step="5"
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="exposureTime">🔆 Tiempo Exposición (s)</label>
                <input
                  type="number"
                  id="exposureTime"
                  value={exposureTime}
                  onChange={(e) => setExposureTime(e.target.value)}
                  step="0.1"
                  min="0.5"
                  max="20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pestaña Costos */}
        {activeTab === 'costs' && (
          <div className="tab-content">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="resinPrice">🧪 Precio Resina (€/L)</label>
                <input
                  type="number"
                  id="resinPrice"
                  value={resinPrice}
                  onChange={(e) => setResinPrice(e.target.value)}
                  step="0.50"
                  min="0"
                  className={errors.resinPrice ? 'error' : ''}
                />
                {errors.resinPrice && <span className="error-text">{errors.resinPrice}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="electricityCost">⚡ Costo Electricidad (€/kWh)</label>
                <input
                  type="number"
                  id="electricityCost"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="calculator-actions">
          <button 
            type="button"
            onClick={calculateTimeCost}
            className="btn btn-primary"
          >
            🧮 Calcular Tiempo y Costo
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
          <h3>📊 Análisis Completo de Impresión</h3>
          
          {/* Tiempo de impresión */}
          <div className="result-section">
            <h4>⏱️ Tiempo de Impresión</h4>
            <div className="result-grid">
              <div className="result-item highlight">
                <span className="label">Tiempo total:</span>
                <span className="value">{formatTime(result.totalPrintTimeMinutes)}</span>
              </div>
              <div className="result-item">
                <span className="label">Capas totales:</span>
                <span className="value">{result.totalLayers}</span>
              </div>
              <div className="result-item">
                <span className="label">Hora estimada fin:</span>
                <span className="value">{result.estimatedFinishTime}</span>
              </div>
            </div>
          </div>

          {/* Material */}
          <div className="result-section">
            <h4>🧪 Consumo de Material</h4>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Volumen pieza:</span>
                <span className="value">{result.solidVolume} mm³</span>
              </div>
              <div className="result-item">
                <span className="label">Volumen soportes:</span>
                <span className="value">{result.supportVolume} mm³</span>
              </div>
              <div className="result-item highlight">
                <span className="label">Resina total:</span>
                <span className="value">{result.totalVolumeMl} ml</span>
              </div>
            </div>
          </div>

          {/* Costos */}
          <div className="result-section">
            <h4>💰 Análisis de Costos</h4>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Costo material:</span>
                <span className="value">€{result.materialCost}</span>
              </div>
              <div className="result-item">
                <span className="label">Costo electricidad:</span>
                <span className="value">€{result.electricityCost}</span>
              </div>
              <div className="result-item highlight">
                <span className="label">Costo total:</span>
                <span className="value">€{result.totalCost}</span>
              </div>
              <div className="result-item">
                <span className="label">Costo por hora:</span>
                <span className="value">€{result.costPerHour}/h</span>
              </div>
            </div>
          </div>

          {/* Análisis de eficiencia */}
          <div className="result-section">
            <h4>📈 Análisis de Eficiencia</h4>
            <div className="efficiency-bars">
              <div className="efficiency-item">
                <span className="efficiency-label">Uso del volumen de impresión:</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${Math.min(100, result.buildVolumeUsage)}%` }}
                  ></div>
                </div>
                <span className="efficiency-value">{result.buildVolumeUsage}%</span>
              </div>
              
              <div className="efficiency-item">
                <span className="efficiency-label">Eficiencia general:</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${result.efficiency}%` }}
                  ></div>
                </div>
                <span className="efficiency-value">{result.efficiency}%</span>
              </div>
            </div>
          </div>

          {/* Resumen técnico */}
          <div className="result-section">
            <h4>🔧 Configuración Utilizada</h4>
            <div className="tech-summary">
              <div className="tech-item">
                <strong>Impresora:</strong> {result.profile}
              </div>
              <div className="tech-item">
                <strong>Altura de capa:</strong> {result.settings.layerHeight}mm
              </div>
              <div className="tech-item">
                <strong>Relleno:</strong> {result.settings.infillDensity}%
              </div>
              <div className="tech-item">
                <strong>Exposición:</strong> {result.settings.exposureTime}s
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeCostCalculator;
