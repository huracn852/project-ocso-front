"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";

export async function updateLocation(formData: FormData) {
    const locationId = Number(formData.get("locationId"));
    const locationName = formData.get("locationName");
    const locationAddress = formData.get("locationAddress");
    const locationLatValue = formData.get("locationLat");
    const locationLngValue = formData.get("locationLng");
    const managerId = formData.get("managerId");

    if (
        !Number.isInteger(locationId) ||
        locationId <= 0 ||
        typeof locationName !== "string" ||
        !locationName.trim() ||
        typeof locationAddress !== "string" ||
        !locationAddress.trim() ||
        typeof locationLatValue !== "string" ||
        !locationLatValue.trim() ||
        typeof locationLngValue !== "string" ||
        !locationLngValue.trim() ||
        (managerId !== null && typeof managerId !== "string")
    ) {
        throw new Error("Los datos de la tienda no son válidos.");
    }

    const locationLat = Number(locationLatValue);
    const locationLng = Number(locationLngValue);
    if (!Number.isFinite(locationLat) || !Number.isFinite(locationLng)) {
        throw new Error("Las coordenadas de la tienda no son válidas.");
    }

    const response = await fetch(`${API_URL}/locations/${locationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
        body: JSON.stringify({
            locationName,
            locationAddress,
            locationLatLng: [locationLat, locationLng],
            ...(managerId ? { managerId } : {}),
        }),
    });
    if (!response.ok) {
        throw new Error(`No se pudo actualizar la tienda (${response.status}).`);
    }

    revalidatePath("/dashboard");
}
