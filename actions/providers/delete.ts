"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type DeleteProviderState = {
    error?: string;
};

function getApiError(payload: unknown): string | undefined {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }

    const message = (payload as Record<string, unknown>).message;
    if (typeof message === "string") {
        return message;
    }
    if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
        return message.join(", ");
    }

    return undefined;
}

export default async function deleteProvider(
    _previousState: DeleteProviderState,
    formData: FormData,
): Promise<DeleteProviderState> {
    const providerId = formData.get("providerId");
    if (typeof providerId !== "string" || !providerId.trim()) {
        return { error: "El ID del proveedor no es válido." };
    }

    let response: Response;
    try {
        response = await fetch(`${API_URL}/providers/${encodeURIComponent(providerId)}`, {
            method: "DELETE",
            headers: {
                ...await AuthHeaders(),
            },
        });
    } catch (error) {
        if (!(error instanceof TypeError)) {
            throw error;
        }
        return { error: "No se pudo conectar con el servicio para borrar el proveedor." };
    }

    if (!response.ok) {
        let apiError: string | undefined;
        try {
            apiError = getApiError(await response.json());
        } catch (error) {
            if (!(error instanceof SyntaxError)) {
                throw error;
            }
        }

        if (response.status === 401) {
            return {
                error: "Tu sesión ya no es válida. Inicia sesión nuevamente para eliminar al proveedor.",
            };
        }

        if (response.status === 403) {
            return {
                error: "Tu cuenta no tiene permisos para eliminar proveedores. Solicita acceso a un administrador.",
            };
        }

        return {
            error: apiError
                ? `No se pudo eliminar al proveedor: ${apiError}`
                : `No se pudo eliminar al proveedor (HTTP ${response.status}).`,
        };
    }

    revalidatePath("/dashboard/providers");
    redirect("/dashboard/providers");
}