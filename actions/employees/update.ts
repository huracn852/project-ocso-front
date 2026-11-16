"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";

export default async function updateEmployee(employeeId: string, formData: FormData) {
    const employeeName = formData.get("employeeName");
    const employeeLastName = formData.get("employeeLastName");
    const employeeEmail = formData.get("employeeEmail");
    const employeePhoneNumber = formData.get("employeePhoneNumber");
    const locationIdValue = formData.get("locationId");

    if (
        !employeeId.trim() ||
        typeof employeeName !== "string" ||
        !employeeName.trim() ||
        typeof employeeLastName !== "string" ||
        !employeeLastName.trim() ||
        typeof employeeEmail !== "string" ||
        !employeeEmail.trim() ||
        typeof employeePhoneNumber !== "string" ||
        !employeePhoneNumber.trim() ||
        typeof locationIdValue !== "string"
    ) {
        throw new Error("Los datos del empleado no son válidos.");
    }

    const locationId =
        locationIdValue === "none" ? null : Number(locationIdValue);
    if (
        locationId !== null &&
        (!Number.isInteger(locationId) || locationId <= 0)
    ) {
        throw new Error("La tienda seleccionada no es válida.");
    }

    const response = await fetch(
        `${API_URL}/employees/${encodeURIComponent(employeeId)}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...await AuthHeaders(),
            },
            body: JSON.stringify({
                employeeName: employeeName.trim(),
                employeeLastName: employeeLastName.trim(),
                employeeEmail: employeeEmail.trim(),
                employeePhoneNumber: employeePhoneNumber.trim(),
                location: locationId === null ? null : { locationId },
            }),
        },
    );

    if (!response.ok) {
        throw new Error(`No se pudo actualizar el empleado (HTTP ${response.status}).`);
    }

    revalidatePath("/dashboard/employees");
    revalidatePath(`/dashboard/employees/${encodeURIComponent(employeeId)}`);
    revalidatePath("/dashboard");
}
