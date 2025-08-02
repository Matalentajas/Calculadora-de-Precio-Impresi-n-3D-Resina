import { useState, useRef } from 'react';
import './ResinCalculator.css';

const ResinCalculator = ({ currentProfile, onUpdateProfile }) => {
  const [pieceName, setPieceName] = useState('');
  const [mlUsed, setMlUsed] = useState(0);
  const [printTime, setPrintTime] = useState(0);
  const [resinType, setResinType] = useState('Standard');
  const [postProcessingTime, setPostProcessingTime] = useState(0.5);
  const [pieceImage, setPieceImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const fileInputRef = useRef(null);

  if (!currentProfile) {
    return (
      <div className="resin-calculator">
        <div className="loading-message">
          <p>⏳ Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Cálculo de costos
  const calculateCosts = () => {
    const settings = currentProfile.settings || {};
    
    // Costo base de resina (ml a litros)
    const resinCostPerMl = (settings.resinCostPerLiter || 25) / 1000;
    const resinCost = mlUsed * resinCostPerMl;
    
    // Costo de electricidad
    const powerConsumption = settings.powerConsumptionKW || 0.15;
    const electricityCostPerKWh = settings.electricityCostPerKWh || 0.12;
    const electricityCost = (printTime / 60) * powerConsumption * electricityCostPerKWh;
    
    // Costo de mano de obra (impresión + post-procesado)
    const laborCostPerHour = settings.laborCostPerHour || 15;
    const totalLaborTime = (printTime / 60) + postProcessingTime;
    const laborCost = totalLaborTime * laborCostPerHour;
    
    // Depreciación de la impresora
    const printerCost = settings.printerCost || 300;
    const estimatedLifePrints = 10000; // Estimación de vida útil
    const depreciationCost = printerCost / estimatedLifePrints;
    
    // Costo total antes de margen
    const baseCost = resinCost + electricityCost + laborCost + depreciationCost;
    
    // Factor de fallas
    const failureRate = (settings.failureRate || 5) / 100;
    const failureAdjustment = baseCost * failureRate;
    
    // Costo con fallas
    const costWithFailures = baseCost + failureAdjustment;
    
    // Margen de ganancia
    const profitMargin = (settings.profitMarginPercentage || 30) / 100;
    const finalPrice = costWithFailures * (1 + profitMargin);
    
    return {
      resinCost,
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
    <div className="resin-calculator">
      {/* Header con información del perfil */}
      <div className="profile-info">
        <h2>🧪 Calculadora de Resina</h2>
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
                value={currentProfile.settings?.printerCost || 300}
                onChange={(e) => handleProfileUpdate('printerCost', e.target.value)}
                min="0"
                step="10"
              />
            </div>
            
            <div className="setting-group">
              <label>🧪 Costo Resina por Litro (€):</label>
              <input
                type="number"
                value={currentProfile.settings?.resinCostPerLiter || 25}
                onChange={(e) => handleProfileUpdate('resinCostPerLiter', e.target.value)}
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
                value={currentProfile.settings?.powerConsumptionKW || 0.15}
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
                value={currentProfile.settings?.failureRate || 5}
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
                value={currentProfile.settings?.profitMarginPercentage || 30}
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
              placeholder="Ej: Miniatura, Joyería..."
            />
          </div>
          
          <div className="input-group">
            <label>🧪 Resina Usada (ml):</label>
            <input
              type="number"
              value={mlUsed}
              onChange={(e) => setMlUsed(parseFloat(e.target.value) || 0)}
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
            <label>🛠️ Post-procesado (h):</label>
            <input
              type="number"
              value={postProcessingTime}
              onChange={(e) => setPostProcessingTime(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              placeholder="0.5"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>🎨 Tipo de Resina:</label>
            <select
              value={resinType}
              onChange={(e) => setResinType(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Tough">Resistente</option>
              <option value="Flexible">Flexible</option>
              <option value="Castable">Fundible</option>
              <option value="Bio-compatible">Bio-compatible</option>
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
            <span className="cost-label">🧪 Costo de Resina:</span>
            <span className="cost-value">{costs.resinCost.toFixed(3)}€</span>
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
            <span className="cost-label">📈 Ganancia ({currentProfile.settings?.profitMarginPercentage || 30}%):</span>
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

export default ResinCalculator;
