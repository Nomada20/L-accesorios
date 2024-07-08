import React, { useState, useEffect } from 'react';
import { default as ReactRouterDOM } from 'react-router-dom'; // Importa como CommonJS
const { useHistory } = ReactRouterDOM; // Extrae useHistory del objeto importado

const EditarPromocion = ({ promocionId }) => {
  const [promocion, setPromocion] = useState({
    nombre: '',
    descripcion: '',
    descuento: 0,
    valido_desde: '',
    valido_hasta: '',
    productos: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); // Ahora useHistory está extraído correctamente

  useEffect(() => {
    const fetchPromocion = async () => {
      try {
        const response = await fetch(`https://api-promociones.vercel.app/API/promocion/getById?id=${promocionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPromocion({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          descuento: data.descuento || 0,
          valido_desde: data.valido_desde ? data.valido_desde.split('T')[0] : '',
          valido_hasta: data.valido_hasta ? data.valido_hasta.split('T')[0] : '',
          productos: Array.isArray(data.productos) ? data.productos.join(', ') : '',
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromocion();
  }, [promocionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromocion((prevPromocion) => ({
      ...prevPromocion,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4322/API/promocion/update?id=${promocionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promocion),
      });
      if (!response.ok) {
        throw new Error('Error updating promotion');
      }
      // Redirigir a la página de detalles después de editar
      history.push(`/detallepromocion?id=${promocionId}`);
    } catch (error) {
      console.error('Error updating promotion:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-4 sm:ml-64">
      <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <form id="editarPromocionForm" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={promocion.nombre}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={promocion.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="descuento" className="block text-sm font-medium text-gray-700">Descuento</label>
            <input
              type="number"
              id="descuento"
              name="descuento"
              value={promocion.descuento}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="valido_desde" className="block text-sm font-medium text-gray-700">Válido Desde</label>
            <input
              type="date"
              id="valido_desde"
              name="valido_desde"
              value={promocion.valido_desde}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="valido_hasta" className="block text-sm font-medium text-gray-700">Válido Hasta</label>
            <input
              type="date"
              id="valido_hasta"
              name="valido_hasta"
              value={promocion.valido_hasta}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="productos" className="block text-sm font-medium text-gray-700">Productos</label>
            <input
              type="text"
              id="productos"
              name="productos"
              value={promocion.productos}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => history.push(`/editpromocion?id=${promocionId}`)} // Redirige al hacer clic
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditarPromocion;
