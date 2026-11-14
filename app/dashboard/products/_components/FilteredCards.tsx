"use client";

import type { Product, Provider } from "@/entities";
import { Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import ProductCard from "./productCard";

export default function FilteredCards({
    products,
    providers,
    selectedProductId,
    children,
}: {
    products: Product[];
    providers: Provider[];
    selectedProductId?: string;
    children: ReactNode;
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
        return providerProducts.filter((product) =>
            product.productName.toLocaleLowerCase().includes(query),
        );
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
        <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-[#fff8ed] lg:flex-row">
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
                <div className="flex flex-col gap-6">
                    {orderedProducts.map((product) => (
                        <Link
                            key={product.productId}
                            href={`/dashboard/products/${product.productId}`}
                            aria-current={
                                selectedProductId === product.productId ? "page" : undefined
                            }
                            className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
                        >
                            <ProductCard
                                product={product}
                                selected={selectedProductId === product.productId}
                            />
                        </Link>
                    ))}
                    {products.length === 0 && (
                        <p className="text-default-600">No hay productos para mostrar.</p>
                    )}
                    {products.length > 0 && orderedProducts.length === 0 && (
                        <p className="text-default-600">No hay productos para mostrar.</p>
                    )}
                </div>
            </aside>
            <section className="min-w-0 flex-1 p-6 sm:p-8">
                {children}
            </section>
        </main>
    );
}
