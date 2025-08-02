import React, { useState, useEffect } from 'react';

const PrinterProfileManager = ({ profiles, onProfilesChange, currentProfile, onProfileChange }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    type: 'resin', // 'resin' or 'filament'
    settings: {
      // Resina
      resinPricePerLiter: 27,
      postProcessingCostPerHour: 15,
      electricityCostPerHour: 0.08,
      
      // Filamento
      filamentPricePerKg: 25,
      extruderTemp: 200,
      bedTemp: 60,
      
      // Común
      margin: 30,
      notes: ''
    }
  });

  const createProfile = () => {
    if (!newProfile.name.trim()) {
      alert('Por favor, introduce un nombre para el perfil');
      return;
    }

    const profile = {
      id: Date.now(),
      name: newProfile.name,
      type: newProfile.type,
      settings: { ...newProfile.settings },
      createdAt: new Date().toLocaleDateString('es-ES')
    };

    onProfilesChange([...profiles, profile]);
    setNewProfile({
      name: '',
      type: 'resin',
      settings: {
        resinPricePerLiter: 27,
        postProcessingCostPerHour: 15,
        electricityCostPerHour: 0.08,
        filamentPricePerKg: 25,
        extruderTemp: 200,
        bedTemp: 60,
        margin: 30,
        notes: ''
      }
    });
    setShowCreateForm(false);
  };

  const deleteProfile = (profileId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
      onProfilesChange(profiles.filter(p => p.id !== profileId));
      if (currentProfile?.id === profileId) {
        onProfileChange(null);
      }
    }
  };

  const loadProfile = (profile) => {
    onProfileChange(profile);
  };

  return (
    <div className="printer-profile-manager">
      <div className="profile-header">
        <div className="header-left">
          <h3>🎛️ Perfiles de Impresoras</h3>
          <p>Gestiona configuraciones para diferentes impresoras</p>
        </div>
        <button 
          className="create-profile-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? '✕ Cancelar' : '➕ Nuevo Perfil'}
        </button>
      </div>

      {showCreateForm && (
        <div className="create-profile-form">
          <div className="form-header">
            <h4>Crear Nuevo Perfil</h4>
          </div>
          
          <div className="form-grid">
            <div className="input-group">
              <label>Nombre del perfil</label>
              <input
                type="text"
                value={newProfile.name}
                onChange={(e) => setNewProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Elegoo Mars 3 Pro"
                className="modern-input"
              />
            </div>

            <div className="input-group">
              <label>Tipo de impresora</label>
              <select
                value={newProfile.type}
                onChange={(e) => setNewProfile(prev => ({ ...prev, type: e.target.value }))}
                className="modern-select"
              >
                <option value="resin">Resina (SLA/DLP/MSLA)</option>
                <option value="filament">Filamento (FDM/FFF)</option>
              </select>
            </div>

            {newProfile.type === 'resin' ? (
              <>
                <div className="input-group">
                  <label>Precio resina por litro (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProfile.settings.resinPricePerLiter}
                    onChange={(e) => setNewProfile(prev => ({
                      ...prev,
                      settings: { ...prev.settings, resinPricePerLiter: +e.target.value }
                    }))}
                    className="modern-input"
                  />
                </div>

                <div className="input-group">
                  <label>Coste post-procesado /hora (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProfile.settings.postProcessingCostPerHour}
                    onChange={(e) => setNewProfile(prev => ({
                      ...prev,
                      settings: { ...prev.settings, postProcessingCostPerHour: +e.target.value }
                    }))}
                    className="modern-input"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label>Precio filamento por kg (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProfile.settings.filamentPricePerKg}
                    onChange={(e) => setNewProfile(prev => ({
                      ...prev,
                      settings: { ...prev.settings, filamentPricePerKg: +e.target.value }
                    }))}
                    className="modern-input"
                  />
                </div>

                <div className="input-group">
                  <label>Temperatura extrusor (°C)</label>
                  <input
                    type="number"
                    value={newProfile.settings.extruderTemp}
                    onChange={(e) => setNewProfile(prev => ({
                      ...prev,
                      settings: { ...prev.settings, extruderTemp: +e.target.value }
                    }))}
                    className="modern-input"
                  />
                </div>

                <div className="input-group">
                  <label>Temperatura cama (°C)</label>
                  <input
                    type="number"
                    value={newProfile.settings.bedTemp}
                    onChange={(e) => setNewProfile(prev => ({
                      ...prev,
                      settings: { ...prev.settings, bedTemp: +e.target.value }
                    }))}
                    className="modern-input"
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <label>Coste electricidad /hora (€)</label>
              <input
                type="number"
                step="0.001"
                value={newProfile.settings.electricityCostPerHour}
                onChange={(e) => setNewProfile(prev => ({
                  ...prev,
                  settings: { ...prev.settings, electricityCostPerHour: +e.target.value }
                }))}
                className="modern-input"
              />
            </div>

            <div className="input-group">
              <label>Margen de beneficio (%)</label>
              <input
                type="number"
                value={newProfile.settings.margin}
                onChange={(e) => setNewProfile(prev => ({
                  ...prev,
                  settings: { ...prev.settings, margin: +e.target.value }
                }))}
                className="modern-input"
              />
            </div>

            <div className="input-group full-width">
              <label>Notas (opcional)</label>
              <textarea
                value={newProfile.settings.notes}
                onChange={(e) => setNewProfile(prev => ({
                  ...prev,
                  settings: { ...prev.settings, notes: e.target.value }
                }))}
                placeholder="Notas adicionales sobre esta impresora..."
                className="modern-textarea"
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button onClick={createProfile} className="save-button">
              💾 Crear Perfil
            </button>
          </div>
        </div>
      )}

      <div className="profiles-list">
        {profiles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎛️</div>
            <p>No hay perfiles guardados</p>
            <small>Crea tu primer perfil de impresora</small>
          </div>
        ) : (
          <div className="profiles-grid">
            {profiles.map(profile => (
              <div 
                key={profile.id} 
                className={`profile-card ${currentProfile?.id === profile.id ? 'active' : ''}`}
              >
                <div className="profile-header">
                  <div className="profile-type-icon">
                    {profile.type === 'resin' ? '🧪' : '🎭'}
                  </div>
                  <div className="profile-info">
                    <h4>{profile.name}</h4>
                    <small>{profile.type === 'resin' ? 'Resina' : 'Filamento'}</small>
                  </div>
                </div>

                <div className="profile-details">
                  {profile.type === 'resin' ? (
                    <>
                      <div className="detail-item">
                        <span>Resina:</span>
                        <span>{profile.settings.resinPricePerLiter}€/L</span>
                      </div>
                      <div className="detail-item">
                        <span>Post-proc:</span>
                        <span>{profile.settings.postProcessingCostPerHour}€/h</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-item">
                        <span>Filamento:</span>
                        <span>{profile.settings.filamentPricePerKg}€/kg</span>
                      </div>
                      <div className="detail-item">
                        <span>Extrusor:</span>
                        <span>{profile.settings.extruderTemp}°C</span>
                      </div>
                    </>
                  )}
                  <div className="detail-item">
                    <span>Margen:</span>
                    <span>{profile.settings.margin}%</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <button 
                    onClick={() => loadProfile(profile)}
                    className={`load-button ${currentProfile?.id === profile.id ? 'active' : ''}`}
                  >
                    {currentProfile?.id === profile.id ? '✓ Activo' : '↻ Cargar'}
                  </button>
                  <button 
                    onClick={() => deleteProfile(profile.id)}
                    className="delete-button"
                  >
                    🗑️
                  </button>
                </div>

                {profile.settings.notes && (
                  <div className="profile-notes">
                    <small>💭 {profile.settings.notes}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrinterProfileManager;
