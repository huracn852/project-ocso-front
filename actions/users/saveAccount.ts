"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";

type AccountType = "employee" | "manager";

async function getApiError(response: Response): Promise<string> {
    const body = await response.text();
    if (!body) return "";

    try {
        const payload: unknown = JSON.parse(body);
        if (typeof payload === "object" && payload !== null) {
            const message = (payload as Record<string, unknown>).message;
            if (typeof message === "string") return message;
            if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
                return message.join(", ");
            }
        }
    } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
    }

    return body;
}

export default async function saveAccount(
    accountType: AccountType,
    recordId: string,
    existingAccountEmail: string | null,
    formData: FormData,
) {
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");
    if (
        !recordId.trim() ||
        typeof userEmail !== "string" ||
        !userEmail.trim() ||
        typeof userPassword !== "string" ||
        userPassword.length < 8
    ) {
        throw new Error("Ingresa un correo de cuenta y una contraseña de al menos 8 caracteres.");
    }

    const isUpdating = existingAccountEmail !== null;
    if (isUpdating && userEmail.trim() !== existingAccountEmail) {
        throw new Error("El correo de una cuenta existente no se puede cambiar aquí.");
    }

    const endpoint = isUpdating
        ? `${API_URL}/auth/${encodeURIComponent(existingAccountEmail)}`
        : `${API_URL}/auth/register/${accountType}/${encodeURIComponent(recordId)}`;
    const response = await fetch(endpoint, {
        method: isUpdating ? "PATCH" : "POST",
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
        body: JSON.stringify(
            isUpdating
                ? { userPassword }
                : { userEmail: userEmail.trim(), userPassword },
        ),
    });

    if (!response.ok) {
        const apiError = await getApiError(response);
        throw new Error(
            `No se pudo ${isUpdating ? "actualizar" : "crear"} la cuenta (${response.status})${apiError ? `: ${apiError}` : "."}`,
        );
    }

    if (accountType === "employee") {
        revalidatePath("/dashboard/employees");
        revalidatePath(`/dashboard/employees/${encodeURIComponent(recordId)}`);
    } else {
        revalidatePath("/dashboard/managers");
        revalidatePath(`/dashboard/managers/${encodeURIComponent(recordId)}`);
    }

}
