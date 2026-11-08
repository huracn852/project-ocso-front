"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createProvider(formData: FormData) {
    const provider: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
        provider[key] = value;
    }

    const response = await fetch(`${API_URL}/providers`, {
        method: "POST",
        body: JSON.stringify(provider),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudo crear el provider (${response.status}).`);
    }

    revalidateTag("dashboard:provider", "max");
}