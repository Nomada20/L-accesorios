import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

interface Promocion {
    nombre: string;
    descripcion: string;
    descuento: number;
    valido_desde: string;
    valido_hasta: string;
    productos: number[];
}

export const POST: APIRoute = async ({ request }) => {
    const { nombre, descripcion, descuento, valido_desde, valido_hasta, productos }: Promocion = await request.json();

    const { data: promocion, error } = await supabase
        .from('promociones')
        .insert([{ nombre, descripcion, descuento, valido_desde, valido_hasta }])
        .select()
        .single();

    if (error) return new Response(JSON.stringify({ error }), { status: 400 });

    const { idpromocion } = promocion;

    const productEntries = productos.map(idproducto => ({ idpromocion, idproducto }));
    await supabase.from('promociones_productos').insert(productEntries);

    return new Response(JSON.stringify(promocion), { status: 201 });
}