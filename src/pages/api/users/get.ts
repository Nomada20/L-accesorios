import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const GET: APIRoute = async () => {
  try {
    let { data: usuarios, error } = await supabase
      .from('usuario')
      .select('*');

    if (error) {
      throw error;
    }

    const responseBody = JSON.stringify(usuarios); // Convertir el array de usuarios a JSON

    console.log(usuarios);

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
