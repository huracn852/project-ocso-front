"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { TOKEN_NAME, API_URL } from "@/constants";

export async function createLocation(formData: FormData) {
    const token = (await cookies()).get(TOKEN_NAME)?.value;
    if (!token) return;

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

    await axios.post(
        `${API_URL}/locations`,
        { ...location },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}
