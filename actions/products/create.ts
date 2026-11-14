"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData) {
    const productName = formData.get("productName");
    const priceValue = formData.get("price");
    const countSealValue = formData.get("countSeal");
    const providerId = formData.get("providerId");

    if (
        typeof productName !== "string" ||
        !productName.trim() ||
        typeof priceValue !== "string" ||
        !priceValue.trim() ||
        typeof countSealValue !== "string" ||
        !countSealValue.trim() ||
        typeof providerId !== "string" ||
        !providerId.trim()
    ) {
        throw new Error("Los datos del producto no son válidos.");
    }

    const price = Number(priceValue);
    const countSeal = Number(countSealValue);
    if (!Number.isFinite(price) || !Number.isInteger(countSeal) || countSeal < 0) {
        throw new Error("El precio o la cantidad del producto no son válidos.");
    }

    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
            productName: productName.trim(),
            price,
            countSeal,
            provider: { providerId },
        }),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudo crear el producto (${response.status}).`);
    }

    revalidateTag("dashboard:products", "max");
    revalidateTag("dashboard:provider", "max");
    revalidatePath("/dashboard/products");
}