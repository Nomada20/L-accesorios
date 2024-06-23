import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

interface Promocion {
    idpromocion: number;
    nombre: string;
    descripcion: string;
    descuento: number;
    valido_desde: string;
    valido_hasta: string;
    productos: number[];
}

export const PUT: APIRoute = async ({ request }) => {
    const { idpromocion, nombre, descripcion, descuento, valido_desde, valido_hasta, productos }: Promocion = await request.json();

    const { error: updateError } = await supabase
        .from('promociones')
        .update({ nombre, descripcion, descuento, valido_desde, valido_hasta })
        .eq('idpromocion', idpromocion);

    if (updateError) return new Response(JSON.stringify({ error: updateError }), { status: 400 });

    await supabase.from('promociones_productos').delete().eq('idpromocion', idpromocion);
    const productEntries = productos.map(idproducto => ({ idpromocion, idproducto }));
    await supabase.from('promociones_productos').insert(productEntries);

    return new Response(JSON.stringify({ message: 'Promoción actualizada' }), { status: 200 });
}