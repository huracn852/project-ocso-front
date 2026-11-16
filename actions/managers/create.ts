"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createManager(formData: FormData) {
    const managerFullName = formData.get("managerFullName");
    const managerEmail = formData.get("managerEmail");
    const managerPhoneNumber = formData.get("managerPhoneNumber");
    const managerSalaryValue = formData.get("managerSalary");
    const locationIdValue = formData.get("locationId");

    if (
        typeof managerFullName !== "string" || !managerFullName.trim() ||
        typeof managerEmail !== "string" || !managerEmail.trim() ||
        typeof managerPhoneNumber !== "string" || !managerPhoneNumber.trim() ||
        typeof managerSalaryValue !== "string" || !managerSalaryValue.trim() ||
        typeof locationIdValue !== "string"
    ) {
        throw new Error("Los datos del manager no son válidos.");
    }

    const managerSalary = Number(managerSalaryValue);
    const locationId = locationIdValue === "none" ? undefined : Number(locationIdValue);
    if (!Number.isFinite(managerSalary) || managerSalary < 0) {
        throw new Error("El salario del manager no es válido.");
    }
    if (
        locationId !== undefined &&
        (!Number.isInteger(locationId) || locationId <= 0)
    ) {
        throw new Error("La tienda seleccionada no es válida.");
    }

    const response = await fetch(`${API_URL}/managers`, {
        method: "POST",
        body: JSON.stringify({
            managerFullName: managerFullName.trim(),
            managerEmail: managerEmail.trim(),
            managerPhoneNumber: managerPhoneNumber.trim(),
            managerSalary,
            ...(locationId ? { location: { locationId } } : {}),
        }),
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudo crear el manager (${response.status}).`);
    }

    const createdManager: unknown = await response.json();
    if (
        typeof createdManager !== "object" ||
        createdManager === null ||
        !("managerId" in createdManager) ||
        typeof createdManager.managerId !== "string"
    ) {
        throw new Error("El backend no devolvió el ID del manager creado.");
    }

    revalidateTag("dashboard:managers", "max");
    revalidatePath("/dashboard/managers");
    redirect(`/dashboard/managers/${encodeURIComponent(createdManager.managerId)}`);
}