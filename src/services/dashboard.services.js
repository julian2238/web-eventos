import apiClient from './config/apiClient';

export const dashboardService = {
  // Get initial dashboard data
  getInitialData: async () => {
    const response = await apiClient.get('/home');
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const [usersResponse, eventsResponse] = await Promise.all([
        apiClient.get('/users'),
        apiClient.get('/events')
      ]);

      const users = usersResponse.data.data || [];
      const events = eventsResponse.data.data || [];

      const stats = {
        totalUsers: users.length,
        totalEvents: events.length,
        activeEvents: events.filter(event => event.status === 'active').length,
        inactiveEvents: events.filter(event => event.status === 'inactive').length,
        finishedEvents: events.filter(event => event.status === 'finished').length,
        usersByRole: {
          ADMIN: users.filter(user => user.role === 'ADMIN').length,
          COORDINADOR: users.filter(user => user.role === 'COORDINADOR').length,
          USUARIO: users.filter(user => user.role === 'USUARIO').length,
        },
        recentUsers: users
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5),
        popularEvents: events
          .sort((a, b) => b.participantsCount - a.participantsCount)
          .slice(0, 5),
      };

      return { status: true, data: stats };
    } catch (error) {
      throw error;
    }
  },
};
