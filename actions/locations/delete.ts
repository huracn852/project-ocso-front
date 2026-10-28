"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type DeleteLocationState = {
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

export default async function deleteLocation(
    _previousState: DeleteLocationState,
    formData: FormData,
): Promise<DeleteLocationState> {
    const locationId = Number(formData.get("locationId"));
    if (!Number.isInteger(locationId) || locationId <= 0) {
        return { error: "El ID de la tienda no es válido." };
    }

    const token = (await cookies()).get(TOKEN_NAME)?.value;
    if (!token) {
        return { error: "Inicia sesión para borrar una tienda." };
    }

    let response: Response;
    try {
        response = await fetch(`${API_URL}/locations/${locationId}`, {
            method: "DELETE",
            headers: {
                ...await AuthHeaders(),
            },
        });
    } catch (error) {
        if (!(error instanceof TypeError)) {
            throw error;
        }
        return { error: "No se pudo conectar con el servicio para borrar la tienda." };
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

        if (response.status === 403) {
            return {
                error: apiError
                    ? `No tienes permisos para borrar esta tienda: ${apiError}`
                    : "No tienes permisos para borrar esta tienda. El backend solo permite esta acción a cuentas Admin.",
            };
        }

        return {
            error: apiError
                ? `No se pudo borrar la tienda: ${apiError}`
                : `No se pudo borrar la tienda (${response.status}).`,
        };
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}