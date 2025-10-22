import apiClient from './config/apiClient';

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/auth/signin', {
      email,
      password,
      platform: 'web',
    });
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refreshToken', {
      refreshToken,
    });
    return response.data;
  },

  // Get profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
};