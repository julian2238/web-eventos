import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboard.services';
import { FiUsers, FiCalendar, FiTrendingUp, FiUserCheck, FiUserX, FiClock, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      setError('Error al cargar datos del dashboard');
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="stat-card group slide-up">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="stat-card-icon stat-card-icon-primary group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

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
          onClick={loadDashboardData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50 content-padding">
      {/* Hero Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div className="fade-in">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Resumen general del sistema de eventos</p>
          </div>
          <div className="flex items-center space-x-4 fade-in">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Sistema activo</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Última actualización: {new Date().toLocaleTimeString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-stats section-spacing">
        <StatCard
          title="Total Usuarios"
          value={stats.totalUsers}
          icon={FiUsers}
          subtitle="Usuarios registrados"
        />
        <StatCard
          title="Eventos Activos"
          value={stats.activeEvents}
          icon={FiCalendar}
          subtitle={`${stats.totalEvents} eventos totales`}
        />
        <StatCard
          title="Eventos Inactivos"
          value={stats.inactiveEvents}
          icon={FiClock}
          subtitle="Pendientes de activación"
        />
        <StatCard
          title="Eventos Finalizados"
          value={stats.finishedEvents}
          icon={FiTrendingUp}
          subtitle="Completados"
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section-spacing">
        <div className="card-elevated slide-up">
          <div className="card-padding">
            <div className="flex items-center justify-between mb-6">
              <h3 className="section-title mb-0">Usuarios por Rol</h3>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiUsers className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Administradores</p>
                    <p className="text-sm text-gray-500">Acceso completo</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.usersByRole.ADMIN}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-sm font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Coordinadores</p>
                    <p className="text-sm text-gray-500">Gestión de eventos</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.usersByRole.COORDINADOR}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Usuarios</p>
                    <p className="text-sm text-gray-500">Acceso básico</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.usersByRole.USUARIO}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-elevated slide-up">
          <div className="card-padding">
            <div className="flex items-center justify-between mb-6">
              <h3 className="section-title mb-0">Usuarios Recientes</h3>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiUserCheck className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="space-y-3">
              {stats.recentUsers.map((user, index) => (
                <div key={user.uid} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-gray-700 font-bold text-sm">
                        {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Events */}
      <div className="card-elevated slide-up">
        <div className="card-padding">
          <div className="flex items-center justify-between mb-6">
            <h3 className="section-title mb-0">Eventos Más Populares</h3>
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FiStar className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <div className="space-y-3">
            {stats.popularEvents.map((event, index) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{event.title}</p>
                    <span className="badge badge-neutral text-xs">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <FiUsers className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{event.participantsCount}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <FiStar className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{event.favoritesCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
