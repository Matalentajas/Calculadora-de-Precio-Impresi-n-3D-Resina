import React, { useState, useRef, useEffect } from 'react';
import './App.css';

export default function CalculadoraPrecios3D() {
  // Estados de animación y carga
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  
  // Configuración de precios
  const [precioResina, setPrecioResina] = useState(27);
  const [costePorHoraPostProcesado, setCostePorHoraPostProcesado] = useState(15);
  const [precioLuzHora, setPrecioLuzHora] = useState(0.08);
  const [margen, setMargen] = useState(30);

  // Datos de la pieza actual
  const [nombrePieza, setNombrePieza] = useState('');
  const [mlUsados, setMlUsados] = useState(0);
  const [tiempoHoras, setTiempoHoras] = useState(0);
  const [tiempoPostProcesado, setTiempoPostProcesado] = useState(0);
  const [imagenPieza, setImagenPieza] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(null);
  
  // Piezas guardadas - con persistencia local
  const [piezasGuardadas, setPiezasGuardadas] = useState(() => {
    try {
      const piezasLocalStorage = localStorage.getItem('piezasGuardadas3D');
      return piezasLocalStorage ? JSON.parse(piezasLocalStorage) : [];
    } catch (error) {
      console.error('Error al cargar piezas guardadas:', error);
      return [];
    }
  });
  
  const fileInputRef = useRef(null);

  // Efecto de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Persistencia automática de piezas guardadas
  useEffect(() => {
    try {
      localStorage.setItem('piezasGuardadas3D', JSON.stringify(piezasGuardadas));
    } catch (error) {
      console.error('Error al guardar piezas:', error);
    }
  }, [piezasGuardadas]);

  // Función para seleccionar todo el texto al hacer focus
  const handleFocus = (e) => {
    e.target.select();
  };

  // Cálculos
  const costeResina = (mlUsados / 1000) * precioResina;
  const costeLuz = tiempoHoras * precioLuzHora;
  const costePostProcesado = tiempoPostProcesado * costePorHoraPostProcesado;
  const costeTotal = costeResina + costeLuz + costePostProcesado;
  const precioFinal = costeTotal * (1 + margen / 100);

  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return amount.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setImagenPieza(archivo);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImagen(e.target.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const guardarPieza = () => {
    if (!nombrePieza.trim()) {
      alert('Por favor, introduce un nombre para la pieza');
      return;
    }

    const nuevaPieza = {
      id: Date.now(),
      nombre: nombrePieza,
      mlUsados,
      tiempoHoras,
      tiempoPostProcesado,
      costeTotal,
      precioFinal,
      imagen: previewImagen,
      fecha: new Date().toLocaleDateString('es-ES')
    };

    setPiezasGuardadas([...piezasGuardadas, nuevaPieza]);
    
    // Limpiar formulario
    setNombrePieza('');
    setMlUsados(0);
    setTiempoHoras(0);
    setTiempoPostProcesado(0);
    setPreviewImagen(null);
    setImagenPieza(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const eliminarPieza = (id) => {
    setPiezasGuardadas(piezasGuardadas.filter(pieza => pieza.id !== id));
  };

  const cargarPieza = (pieza) => {
    setNombrePieza(pieza.nombre);
    setMlUsados(pieza.mlUsados);
    setTiempoHoras(pieza.tiempoHoras);
    setTiempoPostProcesado(pieza.tiempoPostProcesado);
    setPreviewImagen(pieza.imagen);
    setActivePanel('pieza');
  };

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      
      {/* Header Profesional */}
      <div className="modern-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="header-icon">🖨️</div>
          <div className="header-text">
            <h1>Calculadora de Precios 3D</h1>
            <p>Sistema Profesional de Cálculo de Costes</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{piezasGuardadas.length}</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">v1.0.7</span>
              <span className="stat-label">Versión</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Moderno */}
      <div className="dashboard">
        
        {/* Panel de Resumen de Costes */}
        <div className="cost-summary-panel">
          <div className="summary-header">
            <h2>💰 Resumen de Costes</h2>
            <div className="summary-badge">Cálculo en Tiempo Real</div>
          </div>
          
          <div className="cost-grid">
            <div className="cost-item">
              <div className="cost-icon">🧪</div>
              <div className="cost-details">
                <span className="cost-label">Resina</span>
                <span className="cost-value">{formatCurrency(costeResina)}</span>
              </div>
            </div>
            
            <div className="cost-item">
              <div className="cost-icon">⚡</div>
              <div className="cost-details">
                <span className="cost-label">Energía</span>
                <span className="cost-value">{formatCurrency(costeLuz)}</span>
              </div>
            </div>
            
            <div className="cost-item">
              <div className="cost-icon">🔧</div>
              <div className="cost-details">
                <span className="cost-label">Post-procesado</span>
                <span className="cost-value">{formatCurrency(costePostProcesado)}</span>
              </div>
            </div>
            
            <div className="cost-total">
              <div className="total-line"></div>
              <div className="total-details">
                <span className="total-label">Precio Final</span>
                <span className="total-value">{formatCurrency(precioFinal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Paneles de Configuración */}
        <div className="config-panels">
          
          {/* Panel de Configuración de Precios */}
          <div className={`modern-panel ${activePanel === 'precios' ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'precios' ? null : 'precios')}>
            <div className="panel-header">
              <div className="panel-icon">💲</div>
              <div className="panel-title">
                <h3>Configuración de Precios</h3>
                <p>Ajusta los costes base</p>
              </div>
              <div className="panel-toggle">
                {activePanel === 'precios' ? '−' : '+'}
              </div>
            </div>
            
            <div className="panel-content" onClick={(e) => e.stopPropagation()}>
              <div className="input-group">
                <label>Precio resina por litro</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="0.01"
                    value={precioResina} 
                    onChange={e => setPrecioResina(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">€/L</span>
                </div>
              </div>
              
              <div className="input-group">
                <label>Coste post-procesado por hora</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="0.01"
                    value={costePorHoraPostProcesado} 
                    onChange={e => setCostePorHoraPostProcesado(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">€/h</span>
                </div>
              </div>
              
              <div className="input-group">
                <label>Precio de luz por hora</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="0.001"
                    value={precioLuzHora} 
                    onChange={e => setPrecioLuzHora(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">€/h</span>
                </div>
              </div>
              
              <div className="input-group">
                <label>Margen de beneficio</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="1"
                    value={margen} 
                    onChange={e => setMargen(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Nueva Pieza */}
          <div className={`modern-panel ${activePanel === 'pieza' ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'pieza' ? null : 'pieza')}>
            <div className="panel-header">
              <div className="panel-icon">🎯</div>
              <div className="panel-title">
                <h3>Nueva Pieza</h3>
                <p>Calcula el coste de tu proyecto</p>
              </div>
              <div className="panel-toggle">
                {activePanel === 'pieza' ? '−' : '+'}
              </div>
            </div>
            
            <div className="panel-content" onClick={(e) => e.stopPropagation()}>
              <div className="input-group">
                <label>Nombre de la pieza</label>
                <div className="modern-input-container">
                  <input 
                    type="text"
                    value={nombrePieza} 
                    onChange={e => setNombrePieza(e.target.value)} 
                    className="modern-input"
                    placeholder="Ej: Miniatura dragón"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label>Volumen de resina usado</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="0.1"
                    value={mlUsados} 
                    onChange={e => setMlUsados(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">ml</span>
                </div>
              </div>
              
              <div className="input-group">
                <label>Tiempo de impresión</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="0.1"
                    value={tiempoHoras} 
                    onChange={e => setTiempoHoras(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">horas</span>
                </div>
              </div>
              
              <div className="input-group">
                <label>Tiempo de post-procesado</label>
                <div className="modern-input-container">
                  <input 
                    type="number" 
                    step="0.1"
                    value={tiempoPostProcesado} 
                    onChange={e => setTiempoPostProcesado(+e.target.value)} 
                    onFocus={handleFocus}
                    className="modern-input"
                  />
                  <span className="input-unit">horas</span>
                </div>
              </div>
              
              <div className="input-group">
                <label>Imagen de la pieza (opcional)</label>
                <div className="file-input-container">
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    onChange={manejarCambioImagen}
                    className="file-input"
                  />
                  <div className="file-input-button">
                    📷 Seleccionar imagen
                  </div>
                </div>
                
                {previewImagen && (
                  <div className="image-preview">
                    <img src={previewImagen} alt="Preview" />
                  </div>
                )}
              </div>
              
              <button 
                onClick={guardarPieza}
                className="save-button"
                disabled={!nombrePieza.trim()}
              >
                💾 Guardar Pieza
              </button>
            </div>
          </div>

          {/* Panel de Piezas Guardadas */}
          <div className={`modern-panel ${activePanel === 'guardadas' ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'guardadas' ? null : 'guardadas')}>
            <div className="panel-header">
              <div className="panel-icon">📂</div>
              <div className="panel-title">
                <h3>Piezas Guardadas</h3>
                <p>Gestiona tus proyectos</p>
              </div>
              <div className="panel-toggle">
                {activePanel === 'guardadas' ? '−' : '+'}
              </div>
            </div>
            
            <div className="panel-content" onClick={(e) => e.stopPropagation()}>
              {piezasGuardadas.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <p>No hay piezas guardadas</p>
                  <small>Crea tu primera pieza para comenzar</small>
                </div>
              ) : (
                <div className="saved-pieces">
                  {piezasGuardadas.map(pieza => (
                    <div key={pieza.id} className="saved-piece">
                      <div className="piece-info">
                        {pieza.imagen && (
                          <div className="piece-thumbnail">
                            <img src={pieza.imagen} alt={pieza.nombre} />
                          </div>
                        )}
                        <div className="piece-details">
                          <h4>{pieza.nombre}</h4>
                          <p>Coste: {formatCurrency(pieza.costeTotal)}</p>
                          <p>Precio: {formatCurrency(pieza.precioFinal)}</p>
                          <small>{pieza.fecha}</small>
                        </div>
                      </div>
                      <div className="piece-actions">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            cargarPieza(pieza);
                          }}
                          className="load-button"
                        >
                          ↻
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            eliminarPieza(pieza.id);
                          }}
                          className="delete-button"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
