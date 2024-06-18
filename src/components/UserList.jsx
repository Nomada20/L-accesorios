// UserList.js
import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/get');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este usuario?')) {
      try {
        const response = await fetch('/api/users/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idusuario: id }),
        });
        if (response.ok) {
          fetchUsers();
        } else {
          alert('Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apellido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Género
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Creado En
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idusuario}>
              <td className="px-6 py-4 whitespace-nowrap">{user.idusuario}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.apellido}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.genero}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.telefono}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.creado_en}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteUser(user.idusuario)}
                  className="text-red-600 hover:text-red-800 mr-2"
                >
                  Eliminar
                </button>
                <a
                  href={`/usuario?id=${user.idusuario}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Ver Detalles
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
