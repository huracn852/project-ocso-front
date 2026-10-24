"use client";

import type { Employee } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const fullName = employee.employeeName + " " + employee.employeeLastName;

  return (
    <Card className="mx-10">
      <CardHeader>
        <p className="w-full"> Nombre: <b>{fullName}</b></p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="w-full">Nombre: <b>{fullName}</b></p>
        <p className="w-full">Email: <b>{employee.employeeEmail}</b></p>
        <p className="w-full">Teléfono: <b>{employee.employeePhoneNumber}</b></p>
      </CardBody>
    </Card>
  );
}