"use client";

import { updateLocation } from "@/actions/locations/update";
import type { Location, Manager } from "@/entities";
import { Button, Input } from "@nextui-org/react";

type ManagerOption = Pick<Manager, "managerId" | "managerFullname">;

export default function FormUpdateLocation({
    location,
    managers,
}: {
    location: Location;
    managers: ManagerOption[];
}) {
    return (
        <form action={updateLocation} className="flex flex-col gap-4">
            <input
                type="hidden"
                name="locationId"
                value={location.locationId}
            />
            <Input
                label="Nombre"
                name="locationName"
                defaultValue={location.locationName}
                isRequired
            />
            <Input
                label="Dirección"
                name="locationAddress"
                defaultValue={location.locationAddress}
                isRequired
            />
            <Input
                label="Latitud"
                name="locationLat"
                type="number"
                step="any"
                defaultValue={String(location.locationLatLng[0] ?? "")}
                isRequired
            />
            <Input
                label="Longitud"
                name="locationLng"
                type="number"
                step="any"
                defaultValue={String(location.locationLatLng[1] ?? "")}
                isRequired
            />
            <label className="flex flex-col gap-1 text-sm">
                Manager
                <select
                    className="rounded-medium border border-default-200 bg-default-100 px-3 py-2"
                    name="managerId"
                    defaultValue={location.manager?.managerId ?? ""}
                >
                    <option value="">Sin cambios</option>
                    {managers.map((manager) => (
                        <option key={manager.managerId} value={manager.managerId}>
                            {manager.managerFullname}
                        </option>
                    ))}
                </select>
            </label>
            <Button color="primary" type="submit">
                Guardar cambios
            </Button>
        </form>
    );
}