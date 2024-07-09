import React, { useState, useEffect } from 'react';

const VerPromocion = () => {
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idPromocion = searchParams.get('id');

    const fetchPromocion = async () => {
      try {
        const response = await fetch(`https://api-promociones.vercel.app/API/promocion/getById?id=${idPromocion}`);
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
  }, []);

  // No se necesita handleChange ni handleSubmit ya que los campos son de solo lectura

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!promocion) return <p>No promotion found</p>;

  return (
    <main className="p-4 sm:ml-64">
      <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <form id="promocionForm" className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={promocion.nombre}
              readOnly // Campo de solo lectura
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={promocion.descripcion}
              readOnly // Campo de solo lectura
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
              readOnly // Campo de solo lectura
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
              readOnly // Campo de solo lectura
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
              readOnly // Campo de solo lectura
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
              readOnly // Campo de solo lectura
              className="mt-1 block w-full"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default VerPromocion;
