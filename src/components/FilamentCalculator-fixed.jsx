import { useState, useRef } from 'react';
import './FilamentCalculator.css';

const FilamentCalculator = ({ currentProfile, onUpdateProfile }) => {
  const [pieceName, setPieceName] = useState('');
  const [gramsUsed, setGramsUsed] = useState(0);
  const [printTime, setPrintTime] = useState(0);
  const [filamentType, setFilamentType] = useState('PLA');
  const [infill, setInfill] = useState(20);
  const [pieceImage, setPieceImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const fileInputRef = useRef(null);

  if (!currentProfile) {
    return (
      <div className="filament-calculator">
        <div className="loading-message">
          <p>⏳ Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Cálculo de costos
  const calculateCosts = () => {
    const settings = currentProfile.settings || {};
    
    // Costo base de filamento (gramos a kilogramos)
    const filamentCostPerGram = (settings.filamentCostPerKg || 20) / 1000;
    const filamentCost = gramsUsed * filamentCostPerGram;
    
    // Costo de electricidad
    const powerConsumption = settings.powerConsumptionKW || 0.25;
    const electricityCostPerKWh = settings.electricityCostPerKWh || 0.12;
    const electricityCost = (printTime / 60) * powerConsumption * electricityCostPerKWh;
    
    // Costo de mano de obra
    const laborCostPerHour = settings.laborCostPerHour || 15;
    const laborCost = (printTime / 60) * laborCostPerHour;
    
    // Depreciación de la impresora
    const printerCost = settings.printerCost || 250;
    const estimatedLifePrints = 15000; // FDM suele durar más
    const depreciationCost = printerCost / estimatedLifePrints;
    
    // Costo total antes de margen
    const baseCost = filamentCost + electricityCost + laborCost + depreciationCost;
    
    // Factor de fallas
    const failureRate = (settings.failureRate || 3) / 100;
    const failureAdjustment = baseCost * failureRate;
    
    // Costo con fallas
    const costWithFailures = baseCost + failureAdjustment;
    
    // Margen de ganancia
    const profitMargin = (settings.profitMarginPercentage || 25) / 100;
    const finalPrice = costWithFailures * (1 + profitMargin);
    
    return {
      filamentCost,
      electricityCost,
      laborCost,
      depreciationCost,
      failureAdjustment,
      baseCost,
      costWithFailures,
      finalPrice,
      profitAmount: finalPrice - costWithFailures
    };
  };

  const costs = calculateCosts();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPieceImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (field, value) => {
    if (currentProfile && onUpdateProfile) {
      const updatedSettings = {
        ...currentProfile.settings,
        [field]: parseFloat(value) || 0
      };
      onUpdateProfile(currentProfile.id, {
        ...currentProfile,
        settings: updatedSettings
      });
    }
  };

  const toggleProfileEditor = () => {
    setShowProfileEditor(!showProfileEditor);
  };

  return (
    <div className="filament-calculator">
      {/* Header con información del perfil */}
      <div className="profile-info">
        <h2>🧵 Calculadora de Filamento</h2>
        <div className="current-profile">
          <span className="profile-name">📋 {currentProfile.name}</span>
          <button 
            className="edit-profile-btn"
            onClick={toggleProfileEditor}
            title="Editar configuración del perfil"
          >
            ⚙️ Configurar
          </button>
        </div>
      </div>

      {/* Editor de perfil */}
      {showProfileEditor && (
        <div className="profile-editor">
          <div className="profile-editor-header">
            <h3>⚙️ Configuración del Perfil</h3>
            <button 
              className="close-editor-btn"
              onClick={toggleProfileEditor}
            >
              ✕
            </button>
          </div>
          
          <div className="profile-settings">
            <div className="setting-group">
              <label>💰 Costo Impresora (€):</label>
              <input
                type="number"
                value={currentProfile.settings?.printerCost || 250}
                onChange={(e) => handleProfileUpdate('printerCost', e.target.value)}
                min="0"
                step="10"
              />
            </div>
            
            <div className="setting-group">
              <label>🧵 Costo Filamento por Kg (€):</label>
              <input
                type="number"
                value={currentProfile.settings?.filamentCostPerKg || 20}
                onChange={(e) => handleProfileUpdate('filamentCostPerKg', e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="setting-group">
              <label>⚡ Costo Electricidad por kWh (€):</label>
              <input
                type="number"
                value={currentProfile.settings?.electricityCostPerKWh || 0.12}
                onChange={(e) => handleProfileUpdate('electricityCostPerKWh', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="setting-group">
              <label>🔌 Consumo por hora (kW):</label>
              <input
                type="number"
                value={currentProfile.settings?.powerConsumptionKW || 0.25}
                onChange={(e) => handleProfileUpdate('powerConsumptionKW', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="setting-group">
              <label>👨‍💼 Costo Mano de Obra por Hora (€):</label>
              <input
                type="number"
                value={currentProfile.settings?.laborCostPerHour || 15}
                onChange={(e) => handleProfileUpdate('laborCostPerHour', e.target.value)}
                min="0"
                step="0.5"
              />
            </div>
            
            <div className="setting-group">
              <label>❌ Tasa de Fallas (%):</label>
              <input
                type="number"
                value={currentProfile.settings?.failureRate || 3}
                onChange={(e) => handleProfileUpdate('failureRate', e.target.value)}
                min="0"
                max="50"
                step="1"
              />
            </div>
            
            <div className="setting-group">
              <label>📈 Margen de Ganancia (%):</label>
              <input
                type="number"
                value={currentProfile.settings?.profitMarginPercentage || 25}
                onChange={(e) => handleProfileUpdate('profitMarginPercentage', e.target.value)}
                min="0"
                step="1"
              />
            </div>
          </div>
        </div>
      )}

      {/* Formulario de entrada */}
      <div className="input-section">
        <div className="input-row">
          <div className="input-group">
            <label>📝 Nombre de la Pieza:</label>
            <input
              type="text"
              value={pieceName}
              onChange={(e) => setPieceName(e.target.value)}
              placeholder="Ej: Prototipo, Repuesto..."
            />
          </div>
          
          <div className="input-group">
            <label>🧵 Filamento Usado (g):</label>
            <input
              type="number"
              value={gramsUsed}
              onChange={(e) => setGramsUsed(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              placeholder="0"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>⏰ Tiempo de Impresión (min):</label>
            <input
              type="number"
              value={printTime}
              onChange={(e) => setPrintTime(parseFloat(e.target.value) || 0)}
              min="0"
              step="1"
              placeholder="0"
            />
          </div>
          
          <div className="input-group">
            <label>📊 Relleno (%):</label>
            <input
              type="number"
              value={infill}
              onChange={(e) => setInfill(parseFloat(e.target.value) || 20)}
              min="0"
              max="100"
              step="5"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>🎨 Tipo de Filamento:</label>
            <select
              value={filamentType}
              onChange={(e) => setFilamentType(e.target.value)}
            >
              <option value="PLA">PLA</option>
              <option value="ABS">ABS</option>
              <option value="PETG">PETG</option>
              <option value="TPU">TPU (Flexible)</option>
              <option value="Wood">Wood Fill</option>
              <option value="Metal">Metal Fill</option>
              <option value="Carbon">Fibra de Carbono</option>
            </select>
          </div>
          
          <div className="input-group">
            <label>📷 Imagen (opcional):</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="upload-btn"
            >
              {pieceImage ? '✅ Imagen cargada' : '📁 Subir imagen'}
            </button>
          </div>
        </div>

        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Vista previa" />
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="results-section">
        <h3>💰 Desglose de Costos</h3>
        
        <div className="cost-breakdown">
          <div className="cost-item">
            <span className="cost-label">🧵 Costo de Filamento:</span>
            <span className="cost-value">{costs.filamentCost.toFixed(3)}€</span>
          </div>
          
          <div className="cost-item">
            <span className="cost-label">⚡ Costo Electricidad:</span>
            <span className="cost-value">{costs.electricityCost.toFixed(3)}€</span>
          </div>
          
          <div className="cost-item">
            <span className="cost-label">👨‍💼 Costo Mano de Obra:</span>
            <span className="cost-value">{costs.laborCost.toFixed(3)}€</span>
          </div>
          
          <div className="cost-item">
            <span className="cost-label">🖨️ Depreciación:</span>
            <span className="cost-value">{costs.depreciationCost.toFixed(3)}€</span>
          </div>
          
          <div className="cost-item">
            <span className="cost-label">❌ Ajuste por Fallas:</span>
            <span className="cost-value">{costs.failureAdjustment.toFixed(3)}€</span>
          </div>
          
          <div className="cost-item subtotal">
            <span className="cost-label">💼 Costo Total:</span>
            <span className="cost-value">{costs.costWithFailures.toFixed(2)}€</span>
          </div>
          
          <div className="cost-item profit">
            <span className="cost-label">📈 Ganancia ({currentProfile.settings?.profitMarginPercentage || 25}%):</span>
            <span className="cost-value">+{costs.profitAmount.toFixed(2)}€</span>
          </div>
          
          <div className="cost-item final">
            <span className="cost-label">🏆 PRECIO FINAL:</span>
            <span className="cost-value">{costs.finalPrice.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilamentCalculator;
