"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export async function createLocation(formData: FormData) {
    const location: Record<string, unknown> = {};
    const locationLatLng = [0, 0];

    for (const key of formData.keys()) {
        const value = formData.get(key);
        if (!value) continue;

        if (key === "locationLat") {
            locationLatLng[0] = Number(value);
        } else if (key === "locationLng") {
            locationLatLng[1] = Number(value);
        } else {
            location[key] = String(value);
        }
    }

    location.locationLatLng = locationLatLng;

    const response = await fetch(`${API_URL}/locations`, {
        method: "POST",
        body: JSON.stringify(location),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });
    if (!response.ok) {
        throw new Error(`No se pudo crear la tienda (${response.status}).`);
    }
    revalidateTag("dashboard:locations", "max");
}
