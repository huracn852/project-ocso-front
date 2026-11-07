import { API_URL } from "@/constants";
import type { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import { redirect } from "next/navigation";

export default async function ManagersPage() {
    const response = await fetch(`${API_URL}/managers`, {
        headers: {
            ...await AuthHeaders(),
        },
    });
    if (!response.ok) {
        throw new Error(`No se pudieron cargar los managers (${response.status}).`);
    }

    const managers: Manager[] = await response.json();
    const firstManager = managers[0];

    if (firstManager) {
        redirect(`/dashboard/managers/${firstManager.managerId}`);
    }

    return (
        <p className="w-full pt-10 text-center text-2xl">
            No hay managers registrados
        </p>
    );
}
