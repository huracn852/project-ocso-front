import { API_URL } from "@/constants";
import type { Product, Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import ProviderCard from "../_components/ProviderCard";
import ProductCard from "./_components/Productcard";

export default async function ProviderPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await fetch(`${API_URL}/providers/${id}`, {
        headers: {
            ...await AuthHeaders(),
        },
    });

    if (!response.ok) {
        return (
            <main className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto bg-[#fff8ed] px-6 py-8 sm:px-10">
                <Link href="/dashboard/providers" className="text-sm text-blue-700 hover:underline">
                    Volver a proveedores
                </Link>
                <section className="rounded-xl border border-danger-200 bg-white p-5 text-danger" role="alert">
                    No se pudo cargar el proveedor (HTTP {response.status}).
                </section>
            </main>
        );
    }

    const provider: Provider | null = await response.json();

    if (!provider) {
        return (
            <main className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto bg-[#fff8ed] px-6 py-8 sm:px-10">
                <Link href="/dashboard/providers" className="text-sm text-blue-700 hover:underline">
                    Volver a proveedores
                </Link>
                <p>No se encontró el proveedor solicitado.</p>
            </main>
        );
    }

    const products: Product[] = provider.products ?? [];

    return (
        <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-[#fff8ed] px-6 py-8 sm:px-10">
            <div className="pt-2">
                <ProviderCard provider={provider} className="w-full max-w-[350px]" />
            </div>
            <hr className="my-10 w-full border-0 border-t-[3px] border-[#5b1d08]" />
            {products.length > 0 ? (
                <div className="flex flex-wrap items-start gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-default-600">Este proveedor todavía no tiene productos.</p>
            )}
            <Link
                href="/dashboard/providers"
                className="mt-8 w-fit text-sm text-blue-700 hover:underline"
            >
                Volver a proveedores
            </Link>
        </main>
    );
}
