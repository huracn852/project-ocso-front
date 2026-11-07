"use client";

import deleteManager from "@/actions/managers/delete";
import { LuTrash } from "react-icons/lu";
import { Button } from "@nextui-org/react";

export default function DeletemanagerButton({
    managerid,
}: {
    managerid: string;
}) {
    const deleteBymanager = deleteManager.bind(null, managerid);

    return (
        <form action={deleteBymanager}>
            <Button
                type="submit"
                color="danger"
                variant="solid"
                className="min-w-20"
                aria-label="Eliminar manager"
            >
                <LuTrash size={20} aria-hidden="true" />
            </Button>
        </form>
    );
}
