"use client";

import createEmployee from "@/actions/employees/create";
import { Button, Input } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={pending}
            isDisabled={pending}
        >
            Crear empleado
        </Button>
    );
}

export default function FormCreateEmployee() {
    return (
        <form action={createEmployee} className="space-y-3 rounded-lg bg-[#e94b00] p-4">
            <Input label="Nombre" name="employeeName" isRequired />
            <Input label="Apellido" name="employeeLastName" isRequired />
            <Input label="Correo electrónico" name="employeeEmail" type="email" isRequired />
            <Input label="Num. de teléfono" name="employeePhoneNumber" type="tel" isRequired />
            <SubmitButton />
        </form>
    );
}
