"use client";

import type { Product, Provider } from "@/entities";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useMemo, useState } from "react";
import ProductCard from "./productCard";

export default function FilteredCards({
    products,
    providers,
}: {
    products: Product[];
    providers: Provider[];
}) {
    const [search, setSearch] = useState("");
    const [selectedProviderId, setSelectedProviderId] = useState("");
    const providerProducts = useMemo(
        () =>
            selectedProviderId
                ? products.filter(
                    (product) => product.provider?.providerId === selectedProviderId,
                )
                : products,
        [products, selectedProviderId],
    );
    const orderedProducts = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();
        if (!query) return providerProducts;

        const matches: Product[] = [];
        const remaining: Product[] = [];

        for (const product of providerProducts) {
            const nameMatches = product.productName.toLocaleLowerCase().includes(query);
            const providerMatches = product.provider?.providerName
                .toLocaleLowerCase()
                .includes(query);
            if (nameMatches || providerMatches) {
                matches.push(product);
            } else {
                remaining.push(product);
            }
        }

        return [...matches, ...remaining];
    }, [providerProducts, search]);
    const providerOptions = [
        <SelectItem key="all-providers" textValue="Todos los proveedores">
            Todos los proveedores
        </SelectItem>,
        ...providers.map((provider) => (
            <SelectItem
                key={provider.providerId}
                textValue={provider.providerName}
            >
                {provider.providerName}
            </SelectItem>
        )),
    ];

    return (
        <section className="flex min-h-full flex-col lg:flex-row">
            <aside className="flex w-full shrink-0 flex-col gap-6 border-b-2 border-orange-500 p-6 sm:p-8 lg:w-[300px] lg:border-b-0 lg:border-r-2">
                <Select
                    label="Proveedor"
                    placeholder="Todos los proveedores"
                    selectedKeys={selectedProviderId ? [selectedProviderId] : []}
                    onSelectionChange={(keys) => {
                        const selectedKey = keys === "all" ? "all-providers" : Array.from(keys)[0];
                        setSelectedProviderId(
                            selectedKey && selectedKey !== "all-providers"
                                ? String(selectedKey)
                                : "",
                        );
                    }}
                >
                    {providerOptions}
                </Select>
                <Input
                    label="Nombre del producto"
                    placeholder="Buscar producto"
                    value={search}
                    onValueChange={setSearch}
                    aria-label="Buscar productos por nombre"
                />
            </aside>
            <div className="min-w-0 flex-1 p-6 sm:p-8">
                {products.length > 0 ? (
                    orderedProducts.length > 0 ? (
                        <div className="flex flex-wrap items-start gap-6">
                            {orderedProducts.map((product) => (
                                <ProductCard key={product.productId} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-default-600">
                            No hay productos de este proveedor.
                        </p>
                    )
                ) : (
                    <p className="text-default-600">No hay productos para mostrar.</p>
                )}
            </div>
        </section>
    );
}
