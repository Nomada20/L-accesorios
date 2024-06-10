import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";


export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const nombre_completo = formData.get("nombre_completo")?.toString();
    const telefono = formData.get("telefono")?.toString();

    if (!nombre_completo || !telefono) {
      return new Response("Nombre completo y teléfono son obligatorios", { status: 400 });
    }

    const { data, error } = await supabase
      .from('cliente')
      .insert([{ nombre_completo, telefono, creado_en: "L'accesorios" }]);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
};
