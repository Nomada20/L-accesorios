import { useState, useEffect } from 'react';

interface Promocion {
  idpromocion: string;
  nombre: string;
  descripcion: string;
  descuento: number;
  valido_desde: string;
  valido_hasta: string;
  productos: string[];
}

interface Props {
  apiUrlMisPromociones: string;
  apiUrlPromocionesCompañeros: string;
}

const ListaPromociones: React.FC<Props> = ({
  apiUrlMisPromociones,
  apiUrlPromocionesCompañeros
}) => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [mostrarMisPromociones, setMostrarMisPromociones] = useState(true);

  const obtenerPromociones = async () => {
    let apiUrl = mostrarMisPromociones
      ? apiUrlMisPromociones
      : apiUrlPromocionesCompañeros;

    const response = await fetch(apiUrl);
    const data: Promocion[] = await response.json();
    setPromociones(data);
  };

  useEffect(() => {
    obtenerPromociones();
  }, [mostrarMisPromociones]);

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end mb-4">
              <label className="mr-2">Mostrar:</label>
              <select
                value={mostrarMisPromociones ? "misPromociones" : "compañeros"}
                onChange={(e) =>
                  setMostrarMisPromociones(e.target.value === "misPromociones")
                }
                className="border-gray-300 rounded-md"
              >
                <option value="misPromociones">L'accesorios</option>
                <option value="compañeros">Chrono</option>
              </select>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-5">
                    ID Promocion
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Descripcion
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Descuento
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Valido desde
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Valido hasta
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {promociones.length > 0 ? (
                  promociones.map((promocion) => (
                    <tr
                      key={promocion.idpromocion}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {promocion.idpromocion}
                      </th>
                      <td className="px-6 py-4">{promocion.nombre}</td>
                      <td className="px-6 py-4">{promocion.descripcion}</td>
                      <td className="px-6 py-4">{promocion.descuento}</td>
                      <td className="px-6 py-4">{promocion.valido_desde}</td>
                      <td className="px-6 py-4">{promocion.valido_hasta}</td>
                      <td className="px-6 py-4">
                        <a
                          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          href={`/promocion/verpromocion?id=${promocion.idpromocion}`}
                        >
                          Ver
                        </a>
                        <a
                          className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          href={`/promocion/editpromocion?id=${promocion.idpromocion}`}
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white dark:bg-gray-800">
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-lg text-gray-500 dark:text-gray-400"
                    >
                      No hay promociones disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaPromociones;
