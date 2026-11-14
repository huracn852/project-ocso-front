"use client";

import updateProduct from "@/actions/products/update";
import type { Product, Provider } from "@/entities";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import DeleteProduct from "./DeleteProduct";

export default function FormUpdateProduct({
    product,
    providers,
}: {
    product: Product;
    providers: Provider[];
}) {
    const updateProductWithId = updateProduct.bind(null, product.productId);

    return (
        <div className="space-y-5">
            <header className="bg-[#e94b00] px-4 py-2 text-center text-white">
                <h1 className="text-xl font-bold sm:text-2xl">
                    Nombre del producto: {product.productName}
                </h1>
                <p className="mt-1 text-lg font-semibold">Precio: {product.price}</p>
                <p className="font-semibold">Cant. de Sellos: {product.countSeal}</p>
            </header>
            <form action={updateProductWithId} className="space-y-2">
                <Input
                    name="productName"
                    label="Nombre"
                    defaultValue={product.productName}
                    isRequired
                />
                <Input
                    name="countSeal"
                    type="number"
                    min="0"
                    step="1"
                    label="Num. de Sellos"
                    defaultValue={String(product.countSeal)}
                    isRequired
                />
                <Input
                    name="price"
                    type="number"
                    min="0"
                    step="any"
                    label="Precio"
                    defaultValue={String(product.price)}
                    isRequired
                />
                <Select
                    name="providerId"
                    label="Proveedor"
                    defaultSelectedKeys={[product.provider.providerId]}
                    isRequired
                >
                    {providers.map((provider) => (
                        <SelectItem key={provider.providerId} textValue={provider.providerName}>
                            {provider.providerName}
                        </SelectItem>
                    ))}
                </Select>
                <div className="flex flex-col items-start gap-8 pt-1">
                    <Button type="submit" color="primary" aria-label="Guardar cambios">
                        <span aria-hidden="true">✓</span>
                    </Button>
                    <DeleteProduct productId={product.productId} />
                </div>
            </form>
        </div>
    );
}
