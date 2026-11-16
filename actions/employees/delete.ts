"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteEmployee(employeeId: string, _formData: FormData) {
    void _formData;

    if (!employeeId.trim()) {
        throw new Error("El ID del empleado no es válido.");
    }

    const response = await fetch(
        `${API_URL}/employees/${encodeURIComponent(employeeId)}`,
        {
            method: "DELETE",
            headers: {
                ...await AuthHeaders(),
            },
        },
    );

    if (!response.ok) {
        throw new Error(`No se pudo eliminar el empleado (HTTP ${response.status}).`);
    }

    revalidatePath("/dashboard/employees");
    revalidatePath("/dashboard");
    redirect("/dashboard/employees");
}
