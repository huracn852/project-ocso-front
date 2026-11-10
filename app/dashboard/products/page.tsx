import { API_URL } from "@/constants";
import type { Product } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./_components/FilteredCards";

export default async function ProductsPage() {
    const response = await fetch(`${API_URL}/products`, {
        headers: {
            ...await AuthHeaders(),
        },
        next: {
            tags: ["dashboard:products"],
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudieron cargar los productos (HTTP ${response.status}).`);
    }

    const products: Product[] = await response.json();

    return (
        <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-[#fff8ed] px-6 py-8 sm:px-10">
            <FilteredCards products={products} />
        </main>
    );
}