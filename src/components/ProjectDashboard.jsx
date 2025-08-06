import React, { useState, useEffect, useCallback } from 'react';
import './ProjectDashboard.css';

const ProjectDashboard = () => {
  // Estados para proyectos y estadísticas
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    successfulPrints: 0,
    failedPrints: 0,
    totalCost: 0,
    totalTime: 0,
    avgCostPerProject: 0,
    successRate: 0
  });
  
  // Estados para formulario de nuevo proyecto
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    type: 'miniature',
    estimatedTime: '',
    estimatedCost: '',
    actualTime: '',
    actualCost: '',
    status: 'planning',
    notes: ''
  });
  
  // Estados para filtros y vista
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const savedProjects = localStorage.getItem('printing-projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      calculateStats(parsedProjects);
    }
  }, [calculateStats]);

  // Calcular estadísticas
  const calculateStats = useCallback((projectList) => {
    const total = projectList.length;
    const successful = projectList.filter(p => p.status === 'completed').length;
    const failed = projectList.filter(p => p.status === 'failed').length;
    const totalCost = projectList
      .filter(p => p.actualCost)
      .reduce((sum, p) => sum + parseFloat(p.actualCost), 0);
    const totalTime = projectList
      .filter(p => p.actualTime)
      .reduce((sum, p) => sum + parseFloat(p.actualTime), 0);
    
    setStats({
      totalProjects: total,
      successfulPrints: successful,
      failedPrints: failed,
      totalCost: Math.round(totalCost * 100) / 100,
      totalTime: Math.round(totalTime * 100) / 100,
      avgCostPerProject: total > 0 ? Math.round((totalCost / total) * 100) / 100 : 0,
      successRate: total > 0 ? Math.round((successful / total) * 100) : 0
    });
  }, []);

  // Guardar proyectos en localStorage
  const saveProjects = useCallback((projectList) => {
    localStorage.setItem('printing-projects', JSON.stringify(projectList));
    calculateStats(projectList);
  }, [calculateStats]);

  // Agregar nuevo proyecto
  const addProject = useCallback(() => {
    if (!newProject.name.trim()) return;
    
    const project = {
      ...newProject,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [project, ...projects];
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    
    // Limpiar formulario
    setNewProject({
      name: '',
      type: 'miniature',
      estimatedTime: '',
      estimatedCost: '',
      actualTime: '',
      actualCost: '',
      status: 'planning',
      notes: ''
    });
    setShowAddForm(false);
  }, [newProject, projects, saveProjects]);

  // Actualizar estado de proyecto
  const updateProjectStatus = useCallback((id, newStatus) => {
    const updatedProjects = projects.map(project =>
      project.id === id 
        ? { ...project, status: newStatus, updatedAt: new Date().toISOString() }
        : project
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  }, [projects, saveProjects]);

  // Eliminar proyecto
  const deleteProject = useCallback((id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  }, [projects, saveProjects]);

  // Filtrar proyectos
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  // Ordenar proyectos
  const sortedProjects = filteredProjects.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'cost':
        return (parseFloat(b.actualCost) || 0) - (parseFloat(a.actualCost) || 0);
      case 'time':
        return (parseFloat(b.actualTime) || 0) - (parseFloat(a.actualTime) || 0);
      default:
        return 0;
    }
  });

  // Obtener datos para el gráfico de costos (últimos 7 proyectos)
  const getRecentCostData = () => {
    return projects
      .filter(p => p.actualCost)
      .slice(0, 7)
      .reverse()
      .map(p => parseFloat(p.actualCost));
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  // Obtener color por estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'failed': return '#ef4444';
      case 'printing': return '#3b82f6';
      case 'planning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  // Obtener icono por tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case 'miniature': return '🎭';
      case 'terrain': return '🏔️';
      case 'vehicle': return '🚗';
      case 'decoration': return '🎨';
      case 'functional': return '🔧';
      default: return '📦';
    }
  };

  return (
    <div className="project-dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard de Proyectos 3D</h2>
        <p>Gestión completa y análisis de tus impresiones</p>
        <button 
          className="add-project-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Nuevo Proyecto
        </button>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalProjects}</div>
            <div className="stat-label">Proyectos Totales</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.successfulPrints}</div>
            <div className="stat-label">Exitosos</div>
          </div>
        </div>

        <div className="stat-card failed">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <div className="stat-value">{stats.failedPrints}</div>
            <div className="stat-label">Fallidos</div>
          </div>
        </div>

        <div className="stat-card cost">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">€{stats.totalCost}</div>
            <div className="stat-label">Costo Total</div>
          </div>
        </div>

        <div className="stat-card time">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalTime}h</div>
            <div className="stat-label">Tiempo Total</div>
          </div>
        </div>

        <div className="stat-card success-rate">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{stats.successRate}%</div>
            <div className="stat-label">Tasa de Éxito</div>
          </div>
        </div>
      </div>

      {/* Gráfico simple de costos */}
      {getRecentCostData().length > 0 && (
        <div className="chart-section">
          <h3>📈 Costos Proyectos Recientes</h3>
          <div className="simple-chart">
            {getRecentCostData().map((cost, index) => (
              <div 
                key={index}
                className="chart-bar"
                style={{ 
                  height: `${Math.max(10, (cost / Math.max(...getRecentCostData())) * 100)}%` 
                }}
                title={`€${cost}`}
              >
                <span className="bar-value">€{cost}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controles de filtrado y vista */}
      <div className="controls-section">
        <div className="filters">
          <label>Filtrar por estado:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="planning">Planificando</option>
            <option value="printing">Imprimiendo</option>
            <option value="completed">Completados</option>
            <option value="failed">Fallidos</option>
          </select>
        </div>

        <div className="sorting">
          <label>Ordenar por:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Fecha</option>
            <option value="name">Nombre</option>
            <option value="cost">Costo</option>
            <option value="time">Tiempo</option>
          </select>
        </div>

        <div className="view-mode">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            🔲 Grid
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📝 Lista
          </button>
        </div>
      </div>

      {/* Lista/Grid de proyectos */}
      <div className={`projects-container ${viewMode}`}>
        {sortedProjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No hay proyectos aún</h3>
            <p>Comienza agregando tu primer proyecto de impresión 3D</p>
          </div>
        ) : (
          sortedProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-type">
                  {getTypeIcon(project.type)}
                </div>
                <div className="project-title">
                  <h4>{project.name}</h4>
                  <span className="project-date">{formatDate(project.updatedAt)}</span>
                </div>
                <div 
                  className="project-status"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </div>
              </div>

              <div className="project-details">
                {project.estimatedCost && (
                  <div className="detail-item">
                    <span className="detail-label">Costo Est.:</span>
                    <span className="detail-value">€{project.estimatedCost}</span>
                  </div>
                )}
                {project.actualCost && (
                  <div className="detail-item">
                    <span className="detail-label">Costo Real:</span>
                    <span className="detail-value">€{project.actualCost}</span>
                  </div>
                )}
                {project.estimatedTime && (
                  <div className="detail-item">
                    <span className="detail-label">Tiempo Est.:</span>
                    <span className="detail-value">{project.estimatedTime}h</span>
                  </div>
                )}
                {project.actualTime && (
                  <div className="detail-item">
                    <span className="detail-label">Tiempo Real:</span>
                    <span className="detail-value">{project.actualTime}h</span>
                  </div>
                )}
              </div>

              {project.notes && (
                <div className="project-notes">
                  <strong>Notas:</strong> {project.notes}
                </div>
              )}

              <div className="project-actions">
                <select 
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                  className="status-select"
                >
                  <option value="planning">Planificando</option>
                  <option value="printing">Imprimiendo</option>
                  <option value="completed">Completado</option>
                  <option value="failed">Fallido</option>
                </select>
                <button 
                  className="delete-btn"
                  onClick={() => deleteProject(project.id)}
                  title="Eliminar proyecto"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para agregar proyecto */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 Nuevo Proyecto</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del proyecto:</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="Ej: Miniatura Guerrero Élfico"
                  />
                </div>

                <div className="form-group">
                  <label>Tipo:</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                  >
                    <option value="miniature">Miniatura</option>
                    <option value="terrain">Terreno</option>
                    <option value="vehicle">Vehículo</option>
                    <option value="decoration">Decoración</option>
                    <option value="functional">Funcional</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tiempo estimado (h):</label>
                  <input
                    type="number"
                    value={newProject.estimatedTime}
                    onChange={(e) => setNewProject({...newProject, estimatedTime: e.target.value})}
                    step="0.5"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Costo estimado (€):</label>
                  <input
                    type="number"
                    value={newProject.estimatedCost}
                    onChange={(e) => setNewProject({...newProject, estimatedCost: e.target.value})}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notas:</label>
                <textarea
                  value={newProject.notes}
                  onChange={(e) => setNewProject({...newProject, notes: e.target.value})}
                  placeholder="Notas adicionales sobre el proyecto..."
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={addProject}
                  disabled={!newProject.name.trim()}
                >
                  ✅ Crear Proyecto
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
