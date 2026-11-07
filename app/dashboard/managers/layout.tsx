import { API_URL } from "@/constants";
import type { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import type { ReactNode } from "react";
import Link from "next/link";
import ManagerCards from "./[id]/_components/ManagerCards";
import ManagersContent from "./[id]/_components/ManagersContent";

export default async function LayoutManagers({
    children,
}: {
    children: ReactNode;
}) {
    let response: Response;
    try {
        response = await fetch(`${API_URL}/managers`, {
            headers: {
                ...await AuthHeaders(),
            },
        });
    } catch (error) {
        if (!(error instanceof TypeError)) {
            throw error;
        }

        return (
            <section className="m-6 rounded-lg border border-danger-200 bg-white p-5 text-danger" role="alert">
                No se pudo conectar con el backend. Verifica que el servicio esté activo en {API_URL}.
            </section>
        );
    }

    if (!response.ok) {
        return (
            <section className="m-6 rounded-lg border border-danger-200 bg-white p-5 text-danger" role="alert">
                No se pudieron cargar los managers (HTTP {response.status}).
            </section>
        );
    }

    const managers: Manager[] = await response.json();
    const managersWithoutStore = managers.filter((manager) => manager.location == null).length;
    const salaries = managers
        .map((manager) => manager.managerSalary)
        .filter((salary) => Number.isFinite(salary));
    const maxSalary = salaries.length > 0
        ? Math.max(...salaries)
        : undefined;
    const averageSalary = salaries.length > 0
        ? salaries.reduce((total, salary) => total + salary, 0) / salaries.length
        : undefined;

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-5 p-4 md:flex-row md:gap-6 md:p-6">
            <div className="max-h-[35vh] w-full space-y-5 overflow-y-auto md:max-h-[90vh] md:w-5/12 md:max-w-[26rem] md:min-w-[16rem]">
                {managers.map((manager) => (
                    <Link
                        key={manager.managerId}
                        href={`/dashboard/managers/${manager.managerId}`}
                        className="block"
                    >
                        <ManagerCards manager={manager} />
                    </Link>
                ))}
            </div>
            <ManagersContent
                managerCount={managers.length}
                managersWithoutStore={managersWithoutStore}
                maxSalary={maxSalary}
                averageSalary={averageSalary}
            >
                {children}
            </ManagersContent>
        </div>
    );
}