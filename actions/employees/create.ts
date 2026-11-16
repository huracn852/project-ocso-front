"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createEmployee(formData: FormData) {
    const employeeName = formData.get("employeeName");
    const employeeLastName = formData.get("employeeLastName");
    const employeeEmail = formData.get("employeeEmail");
    const employeePhoneNumber = formData.get("employeePhoneNumber");

    if (
        typeof employeeName !== "string" ||
        !employeeName.trim() ||
        typeof employeeLastName !== "string" ||
        !employeeLastName.trim() ||
        typeof employeeEmail !== "string" ||
        !employeeEmail.trim() ||
        typeof employeePhoneNumber !== "string" ||
        !employeePhoneNumber.trim()
    ) {
        throw new Error("Los datos del empleado no son válidos.");
    }

    const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...await AuthHeaders(),
        },
        body: JSON.stringify({
            employeeName: employeeName.trim(),
            employeeLastName: employeeLastName.trim(),
            employeeEmail: employeeEmail.trim(),
            employeePhoneNumber: employeePhoneNumber.trim(),
        }),
    });

    if (!response.ok) {
        throw new Error(`No se pudo crear el empleado (HTTP ${response.status}).`);
    }

    revalidatePath("/dashboard/employees");
    redirect("/dashboard/employees");
}
