"use client";

import type { Product } from "@/entities";
import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import ProductCard from "./productCard";

export default function FilteredCards({ products }: { products: Product[] }) {
    const [search, setSearch] = useState("");
    const orderedProducts = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();
        if (!query) return products;

        const matches: Product[] = [];
        const remaining: Product[] = [];

        for (const product of products) {
            if (product.productName.toLocaleLowerCase().includes(query)) {
                matches.push(product);
            } else {
                remaining.push(product);
            }
        }

        return [...matches, ...remaining];
    }, [products, search]);

    return (
        <section className="w-full">
            <Input
                label="Buscar producto"
                placeholder="Escribe el nombre del producto"
                value={search}
                onValueChange={setSearch}
                className="mb-8 max-w-xl"
                aria-label="Buscar productos por nombre"
            />
            {products.length > 0 ? (
                <div className="flex flex-wrap items-start gap-6">
                    {orderedProducts.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-default-600">No hay productos para mostrar.</p>
            )}
        </section>
    );
}
