"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateManager(managerId: string, formData: FormData) {
    const manager: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
        manager[key] = value;
    }

    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify(manager),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudo actualizar el manager (${response.status}).`);
    }
    revalidateTag("dashboard:managers", "max");
    revalidateTag(`dashboard:managers:${managerId}`, "max");
}