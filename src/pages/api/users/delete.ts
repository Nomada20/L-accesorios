import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { idusuario } = await request.json();

    if (!idusuario) {
      return new Response("ID es obligatorio", { status: 400 });
    }

    const { data, error } = await supabase
      .from('usuario')
      .delete()
      .eq('idusuario', idusuario);

    // Agregar console.log para mostrar el JSON del resultado
    console.log("Resultado de la consulta:", data);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
