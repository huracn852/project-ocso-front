"use client";

import type { Employee } from "@/entities";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function EmployeeCard({ employee }: { employee: Employee }) {
    const fullName = [employee.employeeName, employee.employeeLastName]
        .filter(Boolean)
        .join(" ");

    return (
        <Card className="w-full max-w-[238px] rounded-2xl border border-default-200 bg-white shadow-sm">
            <CardHeader className="min-h-12 border-b border-default-200 px-3 py-2 text-lg font-bold">
                {fullName}
            </CardHeader>
            <CardBody className="gap-1 px-3 py-3 text-base leading-6">
                <p>
                    Correo: <b>{employee.employeeEmail}</b>
                </p>
                <p>
                    Número de teléfono: <b>{employee.employeePhoneNumber}</b>
                </p>
            </CardBody>
        </Card>
    );
}