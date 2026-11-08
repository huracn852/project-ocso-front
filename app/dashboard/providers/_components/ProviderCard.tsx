"use client";

import { Provider } from "@/entities";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <Card className="w-[214px] overflow-visible rounded-2xl border border-default-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:z-10 hover:scale-105 hover:shadow-lg">
            <CardHeader className="min-h-12 border-b border-default-200 px-3 py-2 text-base font-normal">
                {provider.providerName}
            </CardHeader>
            <CardBody className="gap-0 px-3 py-3 text-base leading-6">
                <p>
                    Correo electrónico: <b className="break-all">{provider.providerEmail}</b>
                </p>
                <p>
                    Numero de teléfono: <b>{provider.providerPhoneNumber}</b>
                </p>
                {provider.products ? (
                    <p>
                        Tiene <b>{provider.products.length}</b> productos
                    </p>
                ) : (
                    <p>No tiene productos</p>
                )}
            </CardBody>
        </Card>
    );
}