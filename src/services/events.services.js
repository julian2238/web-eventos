import apiClient from './config/apiClient';

export const eventsService = {
  // Get all events
  getEvents: async (filters = {}) => {
    const response = await apiClient.get('/events', { params: filters });
    return response.data;
  },

  // Get event by ID
  getEventById: async (id) => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  },

  // Create event
  createEvent: async (eventData) => {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  },

  // Update event
  updateEvent: async (id, eventData) => {
    const response = await apiClient.put(`/events/${id}`, eventData);
    return response.data;
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  },

  // Participate in event
  participateInEvent: async (id) => {
    const response = await apiClient.post(`/events/participar/${id}`);
    return response.data;
  },

  // Leave event
  leaveEvent: async (id) => {
    const response = await apiClient.delete(`/events/participar/${id}`);
    return response.data;
  },

  // Add to favorites
  addToFavorites: async (id) => {
    const response = await apiClient.post(`/events/favorito/${id}`);
    return response.data;
  },

  // Remove from favorites
  removeFromFavorites: async (id) => {
    const response = await apiClient.delete(`/events/favorito/${id}`);
    return response.data;
  },

  // Get events by status
  getEventsByStatus: async (status) => {
    const response = await apiClient.get('/events', { 
      params: { status } 
    });
    return response.data;
  },

  // Activate/Deactivate event
  toggleEventStatus: async (id, status) => {
    const response = await apiClient.put(`/events/${id}`, { status });
    return response.data;
  },
};
