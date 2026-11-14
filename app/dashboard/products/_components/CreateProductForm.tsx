"use client";

import createProduct from "@/actions/products/create";
import type { Provider } from "@/entities";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export default function CreateProductForm({ providers }: { providers: Provider[] }) {
    return (
        <form
            action={createProduct}
            className="w-full space-y-5 rounded-lg bg-[#e94b00] p-6 text-white sm:p-8"
        >
            <h1 className="text-2xl font-bold">Crear Producto</h1>
            <Input
                name="productName"
                placeholder="Nombre"
                aria-label="Nombre"
                isRequired
                classNames={{ inputWrapper: "bg-default-100" }}
            />
            <Input
                name="price"
                type="number"
                min="0"
                step="any"
                placeholder="Precio"
                aria-label="Precio"
                isRequired
                endContent={<span className="text-xl text-foreground">$</span>}
                classNames={{ inputWrapper: "bg-default-100" }}
            />
            <Input
                name="countSeal"
                type="number"
                min="0"
                step="1"
                placeholder="Num. de Sellos"
                aria-label="Num. de Sellos"
                isRequired
                classNames={{ inputWrapper: "bg-default-100" }}
            />
            <Select
                name="providerId"
                placeholder="Proveedor"
                aria-label="Proveedor"
                isRequired
                classNames={{ trigger: "bg-default-100" }}
            >
                {providers.map((provider) => (
                    <SelectItem key={provider.providerId} textValue={provider.providerName}>
                        {provider.providerName}
                    </SelectItem>
                ))}
            </Select>
            <Button type="submit" color="primary" className="w-full">
                Crear Producto
            </Button>
        </form>
    );
}
