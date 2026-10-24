"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteLocation(formData: FormData) {
    const locationId = Number(formData.get("locationId"));
    if (!Number.isInteger(locationId) || locationId <= 0) {
        throw new Error("El ID de la tienda no es válido.");
    }

    const token = (await cookies()).get(TOKEN_NAME)?.value;
    if (!token) {
        throw new Error("Inicia sesión para borrar una tienda.");
    }

    const response = await fetch(`${API_URL}/locations/${locationId}`, {
        method: "DELETE",
        headers: {
            ...await AuthHeaders(),
        },
    });
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("Solo una cuenta con rol Admin puede borrar tiendas.");
        }
        throw new Error(`No se pudo borrar la tienda (${response.status}).`);
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}