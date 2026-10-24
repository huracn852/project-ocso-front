"use client";

import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function DeleteLocationButton({ store }: { store: string }) {
    if (!store || store === "0") return null;

    return (
        <form action={deleteLocation}>
            <input type="hidden" name="locationId" value={store} />
            <Button
                isIconOnly
                type="submit"
                name="deleteValue"
                value={store}
                aria-label="Borrar tienda"
                title="Borrar tienda"
                className="h-10 w-20 min-w-20 rounded-xl bg-pink-600 text-white hover:bg-pink-700"
            >
                <FaRegTrashAlt size={18} />
            </Button>
        </form>
    );
}