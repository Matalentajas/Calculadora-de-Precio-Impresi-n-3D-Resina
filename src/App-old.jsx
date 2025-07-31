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
  
  // Piezas guardadas
  const [piezasGuardadas, setPiezasGuardadas] = useState([]);
  
  const fileInputRef = useRef(null);

  // Efecto de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
      reader.onload = (e) => setPreviewImagen(e.target.result);
      reader.readAsDataURL(archivo);
    }
  };

  const guardarPieza = () => {
    if (!nombrePieza.trim()) {
      alert('Por favor, ingresa un nombre para la pieza');
      return;
    }

    const nuevaPieza = {
      id: Date.now(),
      nombre: nombrePieza,
      mlUsados,
      tiempoHoras,
      tiempoPostProcesado,
      imagen: previewImagen,
      costeTotal,
      precioFinal,
      fechaCreacion: new Date().toLocaleDateString('es-ES')
    };

    setPiezasGuardadas([...piezasGuardadas, nuevaPieza]);
    
    // Limpiar formulario
    setNombrePieza('');
    setMlUsados(0);
    setTiempoHoras(0);
    setTiempoPostProcesado(0);
    setImagenPieza(null);
    setPreviewImagen(null);
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
            
            <div className="panel-content">
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
                type="number" 
                step="0.01"
                value={costePorHoraPostProcesado} 
                onChange={e => setCostePorHoraPostProcesado(+e.target.value)} 
                onFocus={handleFocus}
                className="form-input"
              />
              <span className="input-suffix">€/h</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Coste energético por hora</label>
            <div className="input-container">
              <input 
                type="number" 
                step="0.001"
                value={precioLuzHora} 
                onChange={e => setPrecioLuzHora(+e.target.value)} 
                onFocus={handleFocus}
                className="form-input"
              />
              <span className="input-suffix">€/h</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Margen de beneficio</label>
            <div className="input-container">
              <input 
                type="number" 
                value={margen} 
                onChange={e => setMargen(+e.target.value)} 
                onFocus={handleFocus}
                className="form-input"
              />
              <span className="input-suffix">%</span>
            </div>
          </div>
        </div>

        {/* Panel de Nueva Pieza */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Datos de la Pieza</h2>
            <p className="panel-subtitle">Información específica del trabajo</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">Nombre de la pieza</label>
            <input 
              type="text" 
              value={nombrePieza} 
              onChange={e => setNombrePieza(e.target.value)} 
              placeholder="Ej: Miniatura personalizada"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imagen de referencia</label>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={manejarCambioImagen}
              className="file-input"
            />
            {previewImagen && (
              <img 
                src={previewImagen} 
                alt="Preview" 
                className="preview-image"
              />
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Mililitros de resina</label>
            <div className="input-container">
              <input 
                type="number" 
                value={mlUsados} 
                onChange={e => setMlUsados(+e.target.value)} 
                onFocus={handleFocus}
                className="form-input"
              />
              <span className="input-suffix">ml</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Tiempo de impresión</label>
            <div className="input-container">
              <input 
                type="number" 
                step="0.1"
                value={tiempoHoras} 
                onChange={e => setTiempoHoras(+e.target.value)} 
                onFocus={handleFocus}
                className="form-input"
              />
              <span className="input-suffix">hrs</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Tiempo de post-procesado</label>
            <div className="input-container">
              <input 
                type="number" 
                step="0.1"
                value={tiempoPostProcesado} 
                onChange={e => setTiempoPostProcesado(+e.target.value)} 
                onFocus={handleFocus}
                className="form-input"
              />
              <span className="input-suffix">hrs</span>
            </div>
          </div>

          <button 
            onClick={guardarPieza} 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Guardar Pieza
          </button>
        </div>

        {/* Sección de resultados */}
        <div className="panel">
          <h2 className="panel-title">Cálculo de costes</h2>
          <div className="result-item">
            <span>Coste de material:</span>
            <span>{formatCurrency(costeResina)}</span>
          </div>
          <div className="result-item">
            <span>Coste de post-procesado:</span>
            <span>{formatCurrency(costePostProcesado)}</span>
          </div>
          <div className="result-item">
            <span>Coste de electricidad:</span>
            <span>{formatCurrency(costeLuz)}</span>
          </div>
          <div className="result-item">
            <span>Coste total sin margen:</span>
            <span className="subtotal">{formatCurrency(costeTotal)}</span>
          </div>
          <div className="result-item total">
            <span>Precio final:</span>
            <span>{formatCurrency(precioFinal)}</span>
          </div>
        </div>
      </div>

      {/* Piezas Guardadas */}
      {piezasGuardadas.length > 0 && (
        <div className="saved-pieces">
          <div className="saved-pieces-panel">
            <div className="panel-header">
              <h2 className="panel-title">Piezas Guardadas</h2>
              <p className="panel-subtitle">
                {piezasGuardadas.length} {piezasGuardadas.length === 1 ? 'pieza guardada' : 'piezas guardadas'}
              </p>
            </div>
            
            <div className="pieces-grid">
              {piezasGuardadas.map(pieza => (
                <div key={pieza.id} className="piece-card">
                  {pieza.imagen && (
                    <img 
                      src={pieza.imagen} 
                      alt={pieza.nombre} 
                      className="piece-image"
                    />
                  )}
                  
                  <h3 className="piece-name">{pieza.nombre}</h3>
                  
                  <div className="piece-details">
                    <div className="detail-row">
                      <span className="detail-label">Fecha:</span>
                      <span className="detail-value">{pieza.fechaCreacion}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Resina:</span>
                      <span className="detail-value">{pieza.mlUsados} ml</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Tiempo:</span>
                      <span className="detail-value">{pieza.tiempoHoras}h</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Post-procesado:</span>
                      <span className="detail-value">{pieza.tiempoPostProcesado}h</span>
                    </div>
                  </div>
                  
                  <div className="piece-pricing">
                    <div className="cost-row">
                      <span className="cost-label">Coste:</span>
                      <span className="cost-value">{formatCurrency(pieza.costeTotal)}</span>
                    </div>
                    <div className="cost-row">
                      <span className="cost-label">Precio:</span>
                      <span className="cost-value price-value">{formatCurrency(pieza.precioFinal)}</span>
                    </div>
                  </div>
                  
                  <div className="piece-actions">
                    <button 
                      onClick={() => cargarPieza(pieza)}
                      className="btn btn-small btn-blue"
                    >
                      Cargar
                    </button>
                    <button 
                      onClick={() => eliminarPieza(pieza.id)}
                      className="btn btn-small btn-red"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
