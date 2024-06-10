import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from('cliente')
      .select('*');

    if (error) {
      throw error;
    }

    // Construir una respuesta HTML
    const clientesHtml = data.map(cliente => `
      <tr>
        <td>${cliente.idcliente}</td>
        <td>${cliente.nombre_completo}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.creado_en}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Clientes</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #f4f4f4; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>Lista de Clientes</h1>
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
            ${clientesHtml}
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