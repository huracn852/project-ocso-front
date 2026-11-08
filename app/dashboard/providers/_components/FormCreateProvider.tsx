"use client";

import createProvider from "@/actions/providers/create";
import { Button, Input } from "@nextui-org/react";

export default function FormCreateProvider() {
    return (
        <form action={createProvider} className="flex grow-0 flex-col gap-4">
            <Input label="Nombre" placeholder="Pepsi" name="providerName" isRequired />
            <Input label="Correo" placeholder="business@pepsi.com" name="providerEmail" type="email" isRequired />
            <Input label="Número" placeholder="442332142" name="providerPhoneNumber" />
            <Button color="primary" type="submit">Crear Proveedor</Button>
        </form>
    )
}