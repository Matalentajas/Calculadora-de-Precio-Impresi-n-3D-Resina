import React, { useState, useEffect } from 'react';
import { usePerformanceMonitor, usePerformance } from '../hooks/usePerformance';

/**
 * 🚀 Monitor de Rendimiento - PerformanceMonitor
 * Componente para monitorear y optimizar el rendimiento en tiempo real
 * Se puede activar/desactivar según el modo de desarrollo
 */
const PerformanceMonitor = ({ isVisible = false, isDevelopment = false }) => {
  const stats = usePerformanceMonitor();
  const { performanceMode } = usePerformance();
  const [expanded, setExpanded] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const newAlerts = [];
    
    // Alertas de rendimiento
    if (stats.fps < 30) {
      newAlerts.push({ type: 'warning', message: 'FPS bajo detectado' });
    }
    
    if (stats.memoryUsage > 100) {
      newAlerts.push({ type: 'error', message: 'Alto uso de memoria' });
    }
    
    if (stats.renderTime > 16) {
      newAlerts.push({ type: 'info', message: 'Tiempo de render elevado' });
    }
    
    setAlerts(newAlerts);
  }, [stats]);

  // Solo mostrar en desarrollo o si se fuerza
  if (!isDevelopment && !isVisible) return null;

  return (
    <div className={`performance-monitor ${expanded ? 'expanded' : ''}`}>
      <div className="monitor-header" onClick={() => setExpanded(!expanded)}>
        <span className="monitor-icon">⚡</span>
        <span className="monitor-title">Rendimiento</span>
        <span className={`performance-status ${getStatusClass(stats)}`}>
          {getStatusText(stats)}
        </span>
        <span className="expand-icon">{expanded ? '−' : '+'}</span>
      </div>
      
      {expanded && (
        <div className="monitor-content">
          {/* Métricas principales */}
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">FPS</span>
              <span className={`metric-value ${stats.fps < 30 ? 'warning' : 'good'}`}>
                {stats.fps}
              </span>
            </div>
            
            <div className="metric-item">
              <span className="metric-label">Memoria</span>
              <span className={`metric-value ${stats.memoryUsage > 100 ? 'warning' : 'good'}`}>
                {stats.memoryUsage}MB
              </span>
            </div>
            
            <div className="metric-item">
              <span className="metric-label">Render</span>
              <span className={`metric-value ${stats.renderTime > 16 ? 'warning' : 'good'}`}>
                {stats.renderTime.toFixed(1)}ms
              </span>
            </div>
            
            <div className="metric-item">
              <span className="metric-label">Modo</span>
              <span className="metric-value">
                {performanceMode}
              </span>
            </div>
          </div>
          
          {/* Alertas */}
          {alerts.length > 0 && (
            <div className="alerts-section">
              <h4>⚠️ Alertas de Rendimiento</h4>
              {alerts.map((alert, index) => (
                <div key={index} className={`alert alert-${alert.type}`}>
                  {alert.message}
                </div>
              ))}
            </div>
          )}
          
          {/* Consejos de optimización */}
          <div className="optimization-tips">
            <h4>💡 Consejos de Optimización</h4>
            <ul>
              {stats.memoryUsage > 100 && (
                <li>Considera recargar la aplicación para liberar memoria</li>
              )}
              {stats.fps < 30 && (
                <li>Cierra otras pestañas del navegador para mejorar el rendimiento</li>
              )}
              {stats.renderTime > 16 && (
                <li>Reduce el número de elementos visibles simultáneamente</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Funciones auxiliares
const getStatusClass = (stats) => {
  if (stats.fps < 30 || stats.memoryUsage > 100) return 'poor';
  if (stats.fps < 45 || stats.memoryUsage > 50) return 'fair';
  return 'good';
};

const getStatusText = (stats) => {
  const statusClass = getStatusClass(stats);
  switch (statusClass) {
    case 'poor': return 'Lento';
    case 'fair': return 'Regular';
    case 'good': return 'Óptimo';
    default: return 'Desconocido';
  }
};

export default PerformanceMonitor;
