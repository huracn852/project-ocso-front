"use client";

import type { Product } from "@/entities";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="w-[214px] overflow-visible rounded-2xl border border-default-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:z-10 hover:scale-105 hover:shadow-lg">
            <CardHeader className="min-h-12 border-b border-default-200 px-3 py-2 text-base font-normal">
                {product.productName}
            </CardHeader>
            <CardBody className="gap-1 px-3 py-3 text-base leading-6">
                <p>
                    Nombre del producto: <b>{product.productName}</b>
                </p>
                <p>Precio del producto: <b>{product.price}</b></p>
            </CardBody>
        </Card>
    );
}