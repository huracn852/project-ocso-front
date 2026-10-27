import { API_URL } from "@/constants";
import type { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import type { ReactNode } from "react";
import Link from "next/link";
import ManagerCards from "./_components/ManagerCards";

export default async function LayoutManagers({ children }: { children: ReactNode }) {
    const response = await fetch(`${API_URL}/managers`, {
        headers: {
            ...await AuthHeaders(),
        },
    });
    if (!response.ok) {
        throw new Error(`No se pudieron cargar los managers (${response.status}).`);
    }

    const managers: Manager[] = await response.json();

    return (
        <div className="flex w-11/12">
            <div className="h-[90vh] w-4/12 max-h-[90vh] overflow-y-auto">
                {managers.map((manager) => (
                    <Link
                        key={manager.managerId}
                        href={`/dashboard/managers/${manager.managerId}`}
                    >
                        <ManagerCards manager={manager} />
                    </Link>
                ))}
            </div>
            <div className="w-8/12">
                {children}
            </div>
        </div>
    );
}