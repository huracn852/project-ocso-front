"use client";

import updateManager from "@/actions/managers/update";
import type { Location, Manager } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import SelectStore from "./selectStore";

export default function FormUpdateManager({
    manager,
    stores,
}: {
    manager: Manager;
    stores: Location[];
}) {
    const updateManagerWithId = updateManager.bind(null, manager.managerId);

    return (
        <form
            action={updateManagerWithId}
            className="w-full space-y-3 rounded-xl bg-orange-400 p-4"
        >
            <Input
                label="Nombre"
                defaultValue={manager.managerFullname ?? manager.managerFullName ?? ""}
                placeholder="Nombre del manager"
                name="managerFullName"
                isRequired
            />
            <Input
                label="Email"
                defaultValue={manager.managerEmail}
                placeholder="manager@email.com"
                name="managerEmail"
                type="email"
                isRequired
            />
            <Input
                label="Salario"
                defaultValue={String(manager.managerSalary)}
                placeholder="1200"
                name="managerSalary"
                type="number"
                isRequired
            />
            <Input
                label="Teléfono"
                defaultValue={manager.managerPhoneNumber}
                placeholder="4421233432"
                name="managerPhoneNumber"
                isRequired
            />
            <SelectStore
                stores={stores}
                defaultStore={manager.location?.locationId}
                managerId={manager.managerId}
            />
            <Button color="primary" type="submit">
                Actualizar
            </Button>
        </form>
    );
}