import apiClient from './config/apiClient';

export const categoriesService = {
  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get('/category');
    return response.data;
  },

  // Create category
  createCategory: async (categoryData) => {
    const response = await apiClient.post('/category', categoryData);
    return response.data;
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    const response = await apiClient.put(`/category/${id}`, categoryData);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id) => {
    const response = await apiClient.delete(`/category/${id}`);
    return response.data;
  },
};
