"use client";

import type { Employee } from "@/entities";
import Image from "next/image";
import Link from "next/link";

export default function EmployeeCard({ employee }: { employee: Employee }) {
    const fullName = [employee.employeeName, employee.employeeLastName]
        .filter(Boolean)
        .join(" ");

    return (
        <article className="overflow-hidden rounded-xl border border-default-200 bg-white shadow-sm">
            <Link
                href={`/dashboard/employees/${encodeURIComponent(employee.employeeId)}`}
                className="relative block h-40 bg-orange-100"
            >
                {employee.employeePhoto ? (
                    <Image
                        src={employee.employeePhoto}
                        alt={`Foto de ${fullName}`}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                ) : null}
                <h2 className="absolute inset-x-0 top-0 truncate bg-black/40 px-3 py-2 text-lg font-semibold text-white">
                    {fullName}
                </h2>
            </Link>
            <div className="p-3">
                <Link
                    href={`/dashboard/employees/${encodeURIComponent(employee.employeeId)}`}
                    className="inline-flex rounded-lg border border-default-300 px-3 py-1.5 text-sm font-medium hover:bg-default-100"
                >
                    Actualizar datos
                </Link>
            </div>
        </article>
    );
}