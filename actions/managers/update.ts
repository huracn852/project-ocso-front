"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

async function getErrorMessage(response: Response) {
    const body = await response.text();
    if (!body) return "";

    try {
        const payload: unknown = JSON.parse(body);
        if (typeof payload === "object" && payload !== null) {
            const message = (payload as Record<string, unknown>).message;
            if (typeof message === "string") return message;
            if (
                Array.isArray(message) &&
                message.every((item): item is string => typeof item === "string")
            ) {
                return message.join(", ");
            }
        }
    } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
    }

    return body;
}

export default async function updateManager(managerId: string, formData: FormData) {
    const managerFullName = formData.get("managerFullName");
    const managerEmail = formData.get("managerEmail");
    const managerSalaryValue = formData.get("managerSalary");
    const managerPhoneNumber = formData.get("managerPhoneNumber");
    const locationIdValue = formData.get("locationId");
    const currentLocationIdValue = formData.get("currentLocationId");

    if (
        typeof managerFullName !== "string" ||
        !managerFullName.trim() ||
        typeof managerEmail !== "string" ||
        !managerEmail.trim() ||
        typeof managerSalaryValue !== "string" ||
        !managerSalaryValue.trim() ||
        typeof managerPhoneNumber !== "string" ||
        !managerPhoneNumber.trim() ||
        (locationIdValue !== null && typeof locationIdValue !== "string") ||
        (currentLocationIdValue !== null &&
            typeof currentLocationIdValue !== "string")
    ) {
        throw new Error("Los datos del manager no son válidos.");
    }

    const managerSalary = Number(managerSalaryValue);
    const selectedLocationId =
        locationIdValue && locationIdValue !== "none"
            ? Number(locationIdValue)
            : undefined;
    const currentLocationId = currentLocationIdValue
        ? Number(currentLocationIdValue)
        : undefined;

    if (!Number.isFinite(managerSalary)) {
        throw new Error("El salario del manager no es válido.");
    }
    if (
        (selectedLocationId !== undefined &&
            (!Number.isInteger(selectedLocationId) || selectedLocationId <= 0)) ||
        (currentLocationId !== undefined &&
            (!Number.isInteger(currentLocationId) || currentLocationId <= 0))
    ) {
        throw new Error("La tienda seleccionada no es válida.");
    }

    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify({
            managerFullName,
            managerEmail,
            managerSalary,
            managerPhoneNumber,
        }),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        throw new Error(
            `No se pudo actualizar el manager (${response.status})${errorMessage ? `: ${errorMessage}` : "."}`
        );
    }

    if (selectedLocationId !== currentLocationId) {
        if (currentLocationId !== undefined) {
            const removeManagerResponse = await fetch(
                `${API_URL}/locations/${currentLocationId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...await AuthHeaders(),
                    },
                    body: JSON.stringify({ managerId: null }),
                }
            );
            if (!removeManagerResponse.ok) {
                const errorMessage = await getErrorMessage(removeManagerResponse);
                throw new Error(
                    `No se pudo quitar el manager de su tienda actual (${removeManagerResponse.status})${errorMessage ? `: ${errorMessage}` : "."}`
                );
            }
        }

        if (selectedLocationId !== undefined) {
            const assignManagerResponse = await fetch(
                `${API_URL}/locations/${selectedLocationId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...await AuthHeaders(),
                    },
                    body: JSON.stringify({ managerId }),
                }
            );
            if (!assignManagerResponse.ok) {
                const errorMessage = await getErrorMessage(assignManagerResponse);
                throw new Error(
                    `No se pudo asignar el manager a la tienda seleccionada (${assignManagerResponse.status})${errorMessage ? `: ${errorMessage}` : "."}`
                );
            }
        }
    }

    revalidateTag("dashboard:managers", "max");
    revalidateTag(`dashboard:managers:${managerId}`, "max");
    revalidateTag("dashboard:locations", "max");
}