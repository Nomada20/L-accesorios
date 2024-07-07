import { supabase } from "../db/supabase";

export async function getProducts() {
    const { data, error } = await supabase
        .from('producto')
        .select(`
            idproducto,
            nombre,
            precio,
            descripcion,
            imagen,
            stock,
            categoria ( idcategoria, nombre ),
            opcion ( idopcion, nombre ),
            sucursal ( idsucursal, nombre )
        `);

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data;
}
export async function getProductDetails(idproducto: string) {
    const { data, error } = await supabase
        .from('producto')
        .select(`
            idproducto,
            nombre,
            precio,
            descripcion,
            imagen,
            categoria ( idcategoria, nombre ),
            opcion ( idopcion, nombre ),
            sucursal ( idsucursal, nombre )
        `)
        .eq('idproducto', idproducto)
        .single();

    if (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
    return data;
}
export async function addProduct(product: { nombre: string; precio: string; descripcion: string; imagen: string; stock: string; idcategoria: string; idopcion: string; idsucursal: string; }) {
    const { data, error } = await supabase
        .from('producto')
        .insert([product]);

    if (error) {
        console.error('Error adding product:', error);
        return null;
    }
    return data;
}

export async function updateProduct(idproducto: any, updatedProduct: {}) {
    const { data, error } = await supabase
        .from('producto')
        .update(updatedProduct)
        .eq('idproducto', idproducto);

    if (error) {
        console.error('Error updating product:', error);
        return null;
    }
    return data;
}

export async function deleteProduct(idproducto: any) {
    const { data, error } = await supabase
        .from('producto')
        .delete()
        .eq('idproducto', idproducto);

    if (error) {
        console.error('Error deleting product:', error);
        return null;
    }
    return data;
}

export async function getProductById(idproducto: number) {
    const { data, error } = await supabase
    .from('producto')
    .select(`
        idproducto,
        nombre,
        precio,
        descripcion,
        imagen,
        categoria ( idcategoria, nombre ),
        opcion ( idopcion, nombre ),
        sucursal ( idsucursal, nombre ),
        reseña ( valoracion, comentario )
    `)
    .eq('idproducto', idproducto)
    .single();

if (error) {
    console.error('Error fetching product details:', error);
    return null;
}
return data;
}