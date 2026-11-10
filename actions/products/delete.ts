"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function deleteProduct(productId: string, _formData: FormData) {
    void _formData;

    if (!productId.trim()) {
        throw new Error("El ID del producto no es válido.");
    }

    const response = await fetch(
        `${API_URL}/products/${encodeURIComponent(productId)}`,
        {
            method: "DELETE",
            headers: {
                ...await AuthHeaders(),
            },
        },
    );

    if (!response.ok) {
        throw new Error(`No se pudo eliminar el producto (${response.status}).`);
    }

    revalidateTag("dashboard:products", "max");
    revalidateTag("dashboard:provider", "max");
    revalidatePath("/dashboard/products");
}
