// UserForm.js
import React, { useState } from 'react';

const UserForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/users/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, genero, telefono }),
      });
      if (response.ok) {
        alert('Usuario agregado correctamente');
        setNombre('');
        setApellido('');
        setGenero('');
        setTelefono('');
      } else {
        throw new Error('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      alert('Error al agregar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
          className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Género:</label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
          className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Selecciona</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Agregar
      </button>
    </form>
  );
};

export default UserForm;
