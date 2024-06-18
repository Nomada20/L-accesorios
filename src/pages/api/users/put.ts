import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const PUT: APIRoute = async ({ request }) => {
  try {
    const { idusuario, nombre, apellido, genero, telefono } = await request.json();

    if (!idusuario || !nombre || apellido || genero || !telefono) {
      return new Response("Debes rellenar todos los campos", { status: 400 });
    }

    const { data, error } = await supabase
      .from('usuario')
      .update({ nombre, apellido, genero, telefono })
      .eq('idusuario', idusuario);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
