import React, { useState, useEffect } from 'react';
import { usersService } from '../../services/users.services';
import { FiEdit, FiTrash2, FiShield, FiLogOut, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersService.getUsers();
      setUsers(response.data);
    } catch (error) {
      setError('Error al cargar usuarios');
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      birthDate: user.birthDate,
    });
    setShowEditModal(true);
  };

  const handleChangeRole = (user) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await usersService.updateUser(selectedUser.uid, editForm);
      setShowEditModal(false);
      loadUsers();
      alert('Usuario actualizado correctamente');
    } catch (error) {
      alert('Error al actualizar usuario');
      console.error('Error updating user:', error);
    }
  };

  const handleChangeUserRole = async (newRole) => {
    try {
      await usersService.changeUserRole(selectedUser.uid, newRole);
      setShowRoleModal(false);
      loadUsers();
      alert('Rol actualizado correctamente');
    } catch (error) {
      alert('Error al cambiar rol');
      console.error('Error changing role:', error);
    }
  };

  const handleRevokeTokens = async (user) => {
    if (window.confirm(`¿Estás seguro de revocar los tokens de ${user.fullName}?`)) {
      try {
        await usersService.revokeUserTokens(user.uid);
        alert('Tokens revocados correctamente');
      } catch (error) {
        alert('Error al revocar tokens');
        console.error('Error revoking tokens:', error);
      }
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${user.fullName}? Esta acción no se puede deshacer.`)) {
      try {
        await usersService.deleteUser(user.uid);
        loadUsers();
        alert('Usuario eliminado correctamente');
      } catch (error) {
        alert('Error al eliminar usuario');
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleBadge = (role) => {
    const roleStyles = {
      ADMIN: 'badge badge-danger',
      COORDINADOR: 'badge badge-info',
      USUARIO: 'badge badge-success',
    };
    return (
      <span className={roleStyles[role]}>
        {role}
      </span>
    );
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
          onClick={loadUsers}
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
            <h1 className="page-title">Gestión de Usuarios</h1>
            <p className="page-subtitle">Administra y supervisa todos los usuarios del sistema</p>
          </div>
          <div className="flex items-center space-x-4 fade-in">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Total usuarios</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{users.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-elevated slide-up">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="table-header text-left">
                  Usuario
                </th>
                <th className="table-header text-left">
                  Contacto
                </th>
                <th className="table-header text-left">
                  Rol
                </th>
                <th className="table-header text-left">
                  Fecha Registro
                </th>
                <th className="table-header text-left">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm">
                          <span className="text-gray-700 font-bold text-sm">
                            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {user.document}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiMail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate max-w-xs">{user.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="h-4 w-4 mr-2 text-gray-400" />
                        {user.phone || 'No disponible'}
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="btn-ghost p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        title="Editar usuario"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleChangeRole(user)}
                        className="btn-ghost p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                        title="Cambiar rol"
                      >
                        <FiShield className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRevokeTokens(user)}
                        className="btn-ghost p-2 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
                        title="Revocar tokens"
                      >
                        <FiLogOut className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn-ghost p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                        title="Eliminar usuario"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg border border-gray-200 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Editar Usuario</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({...editForm, gender: e.target.value})}
                    className="input-field"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateUser}
                  className="btn-primary"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg border border-gray-200 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cambiar Rol de {selectedUser?.fullName}
                </h3>
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                {['USUARIO', 'COORDINADOR', 'ADMIN'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleChangeUserRole(role)}
                    className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                      selectedUser?.role === role
                        ? 'bg-gray-100 border-gray-300 text-gray-900'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{role}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {role === 'ADMIN' && 'Acceso completo al sistema'}
                          {role === 'COORDINADOR' && 'Puede gestionar eventos y usuarios'}
                          {role === 'USUARIO' && 'Acceso básico al sistema'}
                        </div>
                      </div>
                      {selectedUser?.role === role && (
                        <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;