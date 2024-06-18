import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const json = await request.json();
    const { nombre, apellido, genero, telefono } = json;

    if (!nombre || !apellido || !genero || !telefono) {
      return new Response("Todos los campos deben estar rellenados", { status: 400 });
    }

    const { data, error } = await supabase
      .from('usuario')
      .insert([{ nombre, apellido, genero, telefono, creado_en: "L'accesorios" }]);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
