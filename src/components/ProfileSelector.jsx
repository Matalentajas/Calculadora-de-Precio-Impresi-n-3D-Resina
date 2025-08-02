import { useState, useRef, useEffect } from 'react';
import './ProfileSelector.css';

const ProfileSelector = ({ 
  profiles = [], 
  currentProfile, 
  onSelectProfile, 
  onCreateProfile, 
  onDeleteProfile,
  printerType = 'resin'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCreateForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      onCreateProfile(newProfileName.trim());
      setNewProfileName('');
      setShowCreateForm(false);
      setIsOpen(false);
    }
  };

  const handleSelectProfile = (profile) => {
    onSelectProfile(profile);
    setIsOpen(false);
  };

  const handleDeleteClick = (e, profileId) => {
    e.stopPropagation();
    if (profiles.length > 1) {
      onDeleteProfile(profileId);
    }
  };

  return (
    <div className="profile-selector" ref={dropdownRef}>
      <div className="profile-selector-header">
        <label className="profile-label">
          Perfil de {printerType === 'resin' ? 'Resina' : 'Filamento'}:
        </label>
        
        <div className="profile-dropdown">
          <button 
            className={`profile-dropdown-btn ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <span className="profile-name">
              {currentProfile?.name || 'Sin perfil'}
            </span>
            <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {isOpen && (
            <div className="profile-dropdown-menu">
              <div className="profile-list">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`profile-item ${currentProfile?.id === profile.id ? 'active' : ''}`}
                    onClick={() => handleSelectProfile(profile)}
                  >
                    <span className="profile-item-name">{profile.name}</span>
                    {profiles.length > 1 && (
                      <button
                        className="profile-delete-btn"
                        onClick={(e) => handleDeleteClick(e, profile.id)}
                        title="Eliminar perfil"
                        type="button"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="profile-actions">
                {!showCreateForm ? (
                  <button
                    className="profile-create-btn"
                    onClick={() => setShowCreateForm(true)}
                    type="button"
                  >
                    <span>➕ Crear Nuevo Perfil</span>
                  </button>
                ) : (
                  <div className="profile-create-form">
                    <input
                      type="text"
                      className="profile-name-input"
                      placeholder="Nombre del perfil..."
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
                      autoFocus
                    />
                    <div className="profile-form-actions">
                      <button
                        className="profile-save-btn"
                        onClick={handleCreateProfile}
                        disabled={!newProfileName.trim()}
                        type="button"
                      >
                        ✓
                      </button>
                      <button
                        className="profile-cancel-btn"
                        onClick={() => {
                          setShowCreateForm(false);
                          setNewProfileName('');
                        }}
                        type="button"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
