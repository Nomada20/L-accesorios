import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const GET: APIRoute = async () => {
  try {
    let { data: promociones, error } = await supabase
      .from('promociones')
      .select('*, promociones_productos(idproducto)');

    if (error) {
      throw error;
    }

    const responseBody = JSON.stringify(promociones); // Convertir el array de promociones a JSON

    console.log(promociones);

    const response = new Response(responseBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (err) {
    const errorMessage = (err as Error).message;

    const errorResponse = new Response(errorMessage, {
      status: 500,
    });

    return errorResponse;
  }
};
