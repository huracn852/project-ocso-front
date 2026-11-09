"use server"
import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function updateProvider(providerId: string, formData: FormData) {
    const providerName = formData.get("providerName");
    const providerEmail = formData.get("providerEmail");
    const providerPhoneNumber = formData.get("providerPhoneNumber");

    if (
        typeof providerName !== "string" ||
        !providerName.trim() ||
        typeof providerEmail !== "string" ||
        !providerEmail.trim() ||
        typeof providerPhoneNumber !== "string"
    ) {
        throw new Error("Los datos del proveedor no son válidos.");
    }

    const response = await fetch(`${API_URL}/providers/${providerId}`, {
        method: "PATCH",
        body: JSON.stringify({
            providerName: providerName.trim(),
            providerEmail: providerEmail.trim(),
            providerPhoneNumber: providerPhoneNumber.trim(),
        }),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudo actualizar el proveedor (${response.status}).`);
    }

    revalidateTag("dashboard:provider", "max");
    revalidatePath(`/dashboard/providers/${providerId}`);
    revalidatePath("/dashboard/providers");
}