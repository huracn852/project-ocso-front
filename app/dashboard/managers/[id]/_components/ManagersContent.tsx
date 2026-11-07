"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

export default function ManagersContent({
    managerCount,
    managersWithoutStore,
    maxSalary,
    averageSalary,
    children,
}: {
    managerCount: number;
    managersWithoutStore: number;
    maxSalary?: number;
    averageSalary?: number;
    children: ReactNode;
}) {
    const selectedManager = useSelectedLayoutSegment();

    return (
        <div
            className={`flex min-w-0 flex-1 ${
                selectedManager
                    ? "min-h-0 items-start overflow-y-auto py-4"
                    : "min-h-64 items-center justify-center"
            }`}
        >
            {selectedManager ? (
                children
            ) : (
                <section
                    className="rounded-xl border border-default-200 bg-white px-6 py-4 text-center shadow-sm"
                    aria-label="Resumen de managers"
                >
                    <p>Hay {managerCount} managers</p>
                    <p>Hay {managersWithoutStore} sin tienda</p>
                    <p>
                        El salario máximo es{" "}
                        {maxSalary === undefined ? "Sin datos" : maxSalary}
                    </p>
                    <p>
                        El salario promedio es{" "}
                        {averageSalary === undefined ? "Sin datos" : averageSalary.toFixed(1)}
                    </p>
                </section>
            )}
        </div>
    );
}
