import React, { useState, useEffect } from 'react';
import { eventsService } from '../../services/events.services';
import { FiCalendar, FiUsers, FiHeart, FiEdit, FiTrash2, FiToggleLeft, FiToggleRight, FiDownload, FiEye } from 'react-icons/fi';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadEvents();
  }, [activeTab]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsService.getEventsByStatus(activeTab);
      setEvents(response.data);
    } catch (error) {
      setError('Error al cargar eventos');
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (event) => {
    const newStatus = event.status === 'active' ? 'inactive' : 'active';
    try {
      await eventsService.toggleEventStatus(event.id, newStatus);
      loadEvents();
      alert(`Evento ${newStatus === 'active' ? 'activado' : 'desactivado'} correctamente`);
    } catch (error) {
      alert('Error al cambiar estado del evento');
      console.error('Error toggling event status:', error);
    }
  };

  const handleDeleteEvent = async (event) => {
    if (window.confirm(`¿Estás seguro de eliminar el evento "${event.title}"?`)) {
      try {
        await eventsService.deleteEvent(event.id);
        loadEvents();
        alert('Evento eliminado correctamente');
      } catch (error) {
        alert('Error al eliminar evento');
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditForm({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      hour: event.hour,
    });
    setShowEditModal(true);
  };

  const handleUpdateEvent = async () => {
    try {
      await eventsService.updateEvent(selectedEvent.id, editForm);
      setShowEditModal(false);
      loadEvents();
      alert('Evento actualizado correctamente');
    } catch (error) {
      alert('Error al actualizar evento');
      console.error('Error updating event:', error);
    }
  };

  const generateReport = () => {
    const reportData = events.map(event => ({
      'Título': event.title,
      'Descripción': event.description,
      'Categoría': event.category,
      'Fecha': event.date,
      'Hora': event.hour,
      'Participantes': event.participantsCount,
      'Favoritos': event.favoritesCount,
      'Estado': event.status,
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eventos_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'badge badge-success',
      inactive: 'badge badge-warning',
      finished: 'badge badge-info',
    };
    return (
      <span className={statusStyles[status]}>
        {status === 'active' ? 'Activo' : status === 'inactive' ? 'Inactivo' : 'Finalizado'}
      </span>
    );
  };

  const tabs = [
    { key: 'active', label: 'Activos', count: events.length },
    { key: 'inactive', label: 'Inactivos', count: 0 },
    { key: 'finished', label: 'Finalizados', count: 0 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={loadEvents}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 content-padding">
      {/* Hero Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div className="fade-in">
            <h1 className="page-title">Gestión de Eventos</h1>
            <p className="page-subtitle">Administra y supervisa todos los eventos del sistema</p>
          </div>
          <div className="flex items-center space-x-4 fade-in">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Total eventos</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{events.length}</div>
            </div>
            <button
              onClick={generateReport}
              className="btn-primary flex items-center"
            >
              <FiDownload className="h-4 w-4 mr-2" />
              Generar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Professional Tabs */}
      <div className="tab-container section-spacing">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-button ${
                activeTab === tab.key
                  ? 'tab-button-active'
                  : 'tab-button-inactive'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.key
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Events Grid */}
      <div className="grid-responsive">
        {events.map((event) => (
          <div key={event.id} className="card-elevated group slide-up">
            <div className="card-padding">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {event.title}
                </h3>
                {getStatusBadge(event.status)}
              </div>
              
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <FiCalendar className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="font-semibold">{new Date(event.date).toLocaleDateString('es-ES')} - {event.hour}</span>
                </div>
                <div className="flex items-center">
                  <span className="badge badge-info">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <FiUsers className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">{event.participantsCount} participantes</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <FiHeart className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">{event.favoritesCount} favoritos</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="btn-ghost p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    title="Editar evento"
                  >
                    <FiEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(event)}
                    className={`btn-ghost p-2 rounded-lg transition-all duration-200 ${
                      event.status === 'active' 
                        ? 'hover:bg-yellow-50 hover:text-yellow-600' 
                        : 'hover:bg-green-50 hover:text-green-600'
                    }`}
                    title={event.status === 'active' ? 'Desactivar' : 'Activar'}
                  >
                    {event.status === 'active' ? (
                      <FiToggleLeft className="h-4 w-4" />
                    ) : (
                      <FiToggleRight className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event)}
                    className="btn-ghost p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                    title="Eliminar evento"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay eventos</h3>
          <p className="mt-1 text-sm text-gray-500">
            No se encontraron eventos con estado "{activeTab}".
          </p>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Evento</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hora</label>
                    <input
                      type="time"
                      value={editForm.hour}
                      onChange={(e) => setEditForm({...editForm, hour: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
