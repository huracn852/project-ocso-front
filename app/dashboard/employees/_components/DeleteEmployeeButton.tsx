"use client";

import deleteEmployee from "@/actions/employees/delete";
import { Button } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";

export default function DeleteEmployeeButton({ employeeId }: { employeeId: string }) {
    const deleteById = deleteEmployee.bind(null, employeeId);

    return (
        <form action={deleteById} className="mt-4">
            <Button
                type="submit"
                color="danger"
                variant="solid"
                className="min-w-20"
                aria-label="Eliminar empleado"
            >
                <LuTrash size={18} aria-hidden="true" />
                Eliminar empleado
            </Button>
        </form>
    );
}
