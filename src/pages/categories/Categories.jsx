import React, { useState, useEffect } from 'react';
import { categoriesService } from '../../services/categories.services';
import { FiPlus, FiEdit, FiTrash2, FiTag, FiSave, FiX } from 'react-icons/fi';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesService.getCategories();
      setCategories(response.data);
    } catch (error) {
      setError('Error al cargar categorías');
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await categoriesService.createCategory(formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '' });
      loadCategories();
      alert('Categoría creada correctamente');
    } catch (error) {
      alert('Error al crear categoría');
      console.error('Error creating category:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
  };

  const handleUpdateCategory = async () => {
    try {
      await categoriesService.updateCategory(editingCategory.id, formData);
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
      loadCategories();
      alert('Categoría actualizada correctamente');
    } catch (error) {
      alert('Error al actualizar categoría');
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (category) => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`)) {
      try {
        await categoriesService.deleteCategory(category.id);
        loadCategories();
        alert('Categoría eliminada correctamente');
      } catch (error) {
        alert('Error al eliminar categoría');
        console.error('Error deleting category:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingCategory(null);
    setShowCreateModal(false);
  };

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
          onClick={loadCategories}
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
            <h1 className="page-title">Gestión de Categorías</h1>
            <p className="page-subtitle">Organiza y administra las categorías de eventos</p>
          </div>
          <div className="flex items-center space-x-4 fade-in">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Total categorías</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <FiPlus className="h-4 w-4 mr-2" />
              Nueva Categoría
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid-responsive">
        {categories.map((category) => (
          <div key={category.id} className="card-elevated group slide-up">
            <div className="card-padding">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                    <FiTag className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {editingCategory?.id === category.id ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="input-field text-sm"
                        />
                      ) : (
                        category.name
                      )}
                    </h3>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {editingCategory?.id === category.id ? (
                    <>
                      <button
                        onClick={handleUpdateCategory}
                        className="btn-ghost p-2 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200"
                        title="Guardar"
                      >
                        <FiSave className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="btn-ghost p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        title="Cancelar"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="btn-ghost p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        title="Editar categoría"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="btn-ghost p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                        title="Eliminar categoría"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                {editingCategory?.id === category.id ? (
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="input-field text-sm"
                    placeholder="Descripción de la categoría"
                  />
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description || 'Sin descripción'}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">ID de categoría</p>
                    <p className="text-sm font-semibold text-gray-900">{category.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium mb-1">Fecha de creación</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(category.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <FiTag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay categorías</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comienza creando tu primera categoría.
          </p>
        </div>
      )}

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg border border-gray-200 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Nueva Categoría</h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field"
                    placeholder="Nombre de la categoría"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="input-field"
                    placeholder="Descripción de la categoría"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateCategory}
                  disabled={!formData.name.trim()}
                  className="btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Crear Categoría
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
