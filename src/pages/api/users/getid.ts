import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id'); // Obtener el ID del cliente desde los parámetros de la URL

  if (!id) {
    return new Response("ID de cliente no proporcionado", { status: 400 });
  }

  try {
    // Obtener un cliente específico por ID
    const { data, error } = await supabase
      .from('cliente')
      .select('*')
      .eq('idcliente', id)
      .single();

    if (error) {
      throw error;
    }

    // Construir la respuesta HTML
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cliente</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #f4f4f4; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>Cliente</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Creado En</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.idcliente}</td>
              <td>${data.nombre_completo}</td>
              <td>${data.telefono}</td>
              <td>${data.creado_en}</td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
