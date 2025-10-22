import apiClient from './config/apiClient';

export const usersService = {
  // Get all users
  getUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Change user role
  changeUserRole: async (id, role) => {
    const response = await apiClient.put(`/users/${id}`, { role });
    return response.data;
  },

  // Revoke user tokens (logout user from all devices)
  revokeUserTokens: async (id) => {
    // This would need to be implemented in the API
    // For now, we'll just update the user to force re-login
    const response = await apiClient.put(`/users/${id}`, { 
      lastLogout: new Date().toISOString() 
    });
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};
