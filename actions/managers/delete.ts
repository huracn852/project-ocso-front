"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function deleteManager(managerId: string, _formData: FormData) {
    void _formData;

    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "DELETE",
        headers: {
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudo eliminar el manager (${response.status}).`);
    }

    revalidateTag("dashboard:managers", "max");
    revalidateTag(`dashboard:managers:${managerId}`, "max");
}