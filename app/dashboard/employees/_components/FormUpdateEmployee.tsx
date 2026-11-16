"use client";

import updateEmployee from "@/actions/employees/update";
import type { Employee, Location } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default function FormUpdateEmployee({
    employee,
    locations,
}: {
    employee: Employee;
    locations: Location[];
}) {
    const updateEmployeeWithId = updateEmployee.bind(null, employee.employeeId);

    return (
        <form
            action={updateEmployeeWithId}
            className="space-y-3 rounded-lg bg-[#e94b00] p-4 text-white shadow-sm"
        >
            <Input
                label="Nombre"
                name="employeeName"
                defaultValue={employee.employeeName}
                isRequired
            />
            <Input
                label="Apellidos"
                name="employeeLastName"
                defaultValue={employee.employeeLastName}
                isRequired
            />
            <Input
                label="Correo electrónico"
                name="employeeEmail"
                type="email"
                defaultValue={employee.employeeEmail}
                isRequired
            />
            <Input
                label="Num. de Teléfono"
                name="employeePhoneNumber"
                type="tel"
                defaultValue={employee.employeePhoneNumber}
                isRequired
            />
            <label className="block text-sm">
                Tienda
                <select
                    name="locationId"
                    defaultValue={employee.location?.locationId
                        ? String(employee.location.locationId)
                        : "none"}
                    className="mt-1 w-full rounded-lg bg-white px-3 py-2 text-foreground"
                >
                    <option value="none">Sin tienda</option>
                    {locations.map((location) => (
                        <option key={location.locationId} value={String(location.locationId)}>
                            {location.locationName}
                        </option>
                    ))}
                </select>
            </label>
            <Button type="submit" color="primary" className="w-full">
                Actualizar datos
            </Button>
        </form>
    );
}
