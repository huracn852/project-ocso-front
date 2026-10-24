"use client";

import { Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import type { Location, Manager } from "@/entities";
import SelectManager from "./selectManager";

type ManagerOption = Pick<Manager, "managerId" | "managerFullname">;

export default function FormNewLocation({
    managers,
    locations,
    managersError,
}: {
    managers: ManagerOption[];
    locations: Pick<Location, "manager">[];
    managersError?: string;
}) {
    return (
        <form action={createLocation}>
            <Input label="Nombre" placeholder="Ocso Juriquilla" name="locationName" />
            <Input label="Dirección" placeholder="Avenida de la luz" name="locationAddress" />
            <Input label="Latitud" placeholder="-120" name="locationLat" />
            <Input label="Longitud" placeholder="20" name="locationLng" />

            <SelectManager managers={managers} locations={locations} />
            {managersError ? <p>{managersError}</p> : null}
            <button type="submit">Subir</button>
        </form>
    );
}
