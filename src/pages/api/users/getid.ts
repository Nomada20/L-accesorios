import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id'); // Obtener el ID del cliente desde los parámetros de la URL

  if (!id) {
    return new Response(JSON.stringify({ error: "ID de usuario no proporcionado" }), { status: 400 });
  }

  try {
    // Obtener un cliente específico por ID
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('idusuario', id)
      .single();

    if (error) {
      throw error;
    }

    // Devolver la respuesta en formato JSON
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
};
