"use client";

import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";
import { useActionState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function DeleteLocationButton({ store }: { store: string }) {
    const [state, formAction, isPending] = useActionState(deleteLocation, {});

    if (!store || store === "0") return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <form action={formAction}>
                <input type="hidden" name="locationId" value={store} />
                <Button
                    isIconOnly
                    type="submit"
                    aria-label="Borrar tienda"
                    title="Borrar tienda"
                    isLoading={isPending}
                    isDisabled={isPending}
                    className="h-10 w-20 min-w-20 rounded-xl bg-pink-600 text-white hover:bg-pink-700"
                >
                    <FaRegTrashAlt size={18} />
                </Button>
            </form>
            {state.error && (
                <p className="max-w-xs text-center text-sm text-danger" role="alert">
                    {state.error}
                </p>
            )}
        </div>
    );
}