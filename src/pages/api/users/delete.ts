import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { idcliente } = await request.json();

    if (!idcliente) {
      return new Response("ID es obligatorio", { status: 400 });
    }

    const { data, error } = await supabase
      .from('cliente')
      .delete()
      .eq('idcliente', idcliente);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
