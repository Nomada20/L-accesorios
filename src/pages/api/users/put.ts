import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const PUT: APIRoute = async ({ request }) => {
  try {
    const { idcliente, nombre_completo, telefono } = await request.json();

    if (!idcliente || !nombre_completo || !telefono) {
      return new Response("ID, nombre completo y teléfono son obligatorios", { status: 400 });
    }

    const { data, error } = await supabase
      .from('cliente')
      .update({ nombre_completo, telefono })
      .eq('idcliente', idcliente);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
