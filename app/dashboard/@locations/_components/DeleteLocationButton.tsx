"use client";

import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";

export default function DeleteLocationButton({ store }: { store: string }) {
    if (!store || store === "0") return null;

    return (
        <form action={deleteLocation}>
            <input type="hidden" name="locationId" value={store} />
            <Button type="submit" name="deleteValue" value={store} color="danger">
                Borrar tienda
            </Button>
        </form>
    );
}