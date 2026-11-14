"use client";

import type { Product } from "@/entities";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function ProductCard({
    product,
    selected = false,
}: {
    product: Product;
    selected?: boolean;
}) {
    return (
        <Card
            className={`w-full max-w-[220px] overflow-visible rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg ${
                selected ? "border-orange-500 ring-1 ring-orange-500" : "border-default-200"
            }`}
        >
            <CardHeader className="min-h-12 border-b border-default-200 px-3 py-2 text-base font-normal">
                {product.productName}
            </CardHeader>
            <CardBody className="gap-1 px-3 py-3 text-base leading-6">
                <p>
                    Nombre del producto: <b>{product.productName}</b>
                </p>
                <p>Precio del producto: <b>{product.price}</b></p>
                <p>Cant. de Sellos: <b>{product.countSeal}</b></p>
                {product.provider?.providerName && (
                    <p>Proveedor: <b>{product.provider.providerName}</b></p>
                )}
            </CardBody>
        </Card>
    );
}