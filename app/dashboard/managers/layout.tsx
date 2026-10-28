import { API_URL } from "@/constants";
import type { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import type { ReactNode } from "react";
import Link from "next/link";
import ManagerCards from "./_components/ManagerCards";

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
    const maxSalary = managers.length > 0
        ? Math.max(...managers.map((manager) => manager.managerSalary))
        : undefined;
    const currency = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    });

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-5 p-4 md:p-6">
            <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de managers">
                <div className="rounded-lg border border-default-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-default-500">Managers registrados</p>
                    <p className="text-2xl font-semibold">{managers.length}</p>
                </div>
                <div className="rounded-lg border border-default-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-default-500">Sin tienda asignada</p>
                    <p className="text-2xl font-semibold">{managersWithoutStore}</p>
                </div>
                <div className="rounded-lg border border-default-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-default-500">Salario máximo</p>
                    <p className="text-2xl font-semibold">
                        {maxSalary === undefined ? "Sin datos" : currency.format(maxSalary)}
                    </p>
                </div>
            </section>
            <div className="flex min-h-0 flex-1 flex-col gap-5 md:flex-row md:gap-6">
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
                <div className="flex min-w-0 flex-1 items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}