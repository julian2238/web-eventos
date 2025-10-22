import { create } from 'zustand';
import { authService } from '../services/auth.services';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(email, password);
      const { data } = response;
      
      // Store tokens
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify({
        uid: data.uid,
        fullName: data.fullName,
        role: data.role,
      }));

      set({ 
        user: {
          uid: data.uid,
          fullName: data.fullName,
          role: data.role,
        },
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return response;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al iniciar sesión',
        isLoading: false 
      });
      throw error;
    }
  },

  // Logout action
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  // Initialize auth from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        set({ 
          user: userData,
          isAuthenticated: true 
        });
      } catch (error) {
        authService.logout();
      }
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
