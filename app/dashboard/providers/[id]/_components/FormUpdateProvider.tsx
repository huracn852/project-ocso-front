"use client";

import updateProvider from "@/actions/providers/update";
import type { Provider } from "@/entities";
import { Button, Input } from "@nextui-org/react";

export default function FormUpdateProvider({ provider }: { provider: Provider }) {
    const updateProviderWithId = updateProvider.bind(null, provider.providerId);

    return (
        <form
            action={updateProviderWithId}
            className="grid w-full grid-cols-1 items-center gap-4 rounded-xl bg-orange-300 p-6 sm:grid-cols-2 sm:p-8"
        >
            <Input
                label="Nombre"
                defaultValue={provider.providerName}
                placeholder="Nombre del proveedor"
                name="providerName"
                isRequired
            />
            <Input
                label="Correo"
                defaultValue={provider.providerEmail}
                placeholder="business@proveedor.com"
                name="providerEmail"
                type="email"
                isRequired
            />
            <Input
                label="Número"
                defaultValue={provider.providerPhoneNumber}
                placeholder="442332142"
                name="providerPhoneNumber"
                type="tel"
            />
            <Button color="primary" type="submit" className="w-fit">
                Actualizar
            </Button>
        </form>
    );
}