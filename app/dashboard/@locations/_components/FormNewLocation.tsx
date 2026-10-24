"use client";

import { Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import type { Location, Manager } from "@/entities";
import SelectManager from "./selectManager";

type ManagerOption = Pick<Manager, "managerId" | "managerFullname">;
type SearchParams = { store?: string | string[] };

export default function FormNewLocation({
    searchParams,
    managers,
    locations,
    managersError,
}: {
    searchParams: SearchParams;
    managers: ManagerOption[];
    locations: Pick<Location, "manager">[];
    managersError?: string;
}) {
    const selectedStore = Array.isArray(searchParams.store)
        ? searchParams.store[0]
        : searchParams.store;

    if (selectedStore && selectedStore !== "0") return null;

    return (
        <form action={createLocation} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-6/12 rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear tienda</h1>
            <Input label="Nombre" placeholder="Ocso Juriquilla" name="locationName" />
            <Input label="Dirección" placeholder="Avenida de la luz" name="locationAddress" />
            <Input label="Latitud" placeholder="-120" name="locationLat" />
            <Input label="Longitud" placeholder="20" name="locationLng" />

            <SelectManager managers={managers} locations={locations} />
            {managersError ? <p>{managersError}</p> : null}

            <button type="submit" color="warning">Subir</button>
        </form>
    );
}
