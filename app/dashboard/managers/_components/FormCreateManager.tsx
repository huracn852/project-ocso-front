"use client";

import createManager from "@/actions/managers/create";
import type { Location } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default function FormCreateManager({ locations }: { locations: Location[] }) {
    return (
        <form action={createManager} className="space-y-4 rounded-lg bg-[#e94b00] p-4">
            <Input label="Nombre completo" name="managerFullName" isRequired />
            <Input label="Salario" name="managerSalary" type="number" min="0" isRequired />
            <Input label="Correo" name="managerEmail" type="email" isRequired />
            <Input label="Número de teléfono" name="managerPhoneNumber" type="tel" isRequired />
            <label className="block text-sm">
                Tienda
                <select
                    name="locationId"
                    defaultValue="none"
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
            <Button color="primary" type="submit" className="w-full">
                Crear Manager
            </Button>
        </form>
    );
}
