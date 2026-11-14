
import { API_URL } from "@/constants";
import type { Product, Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./_components/FilteredCards";
import CreateProductForm from "./_components/CreateProductForm";

export default async function ProductsPage() {
    const response = await fetch(`${API_URL}/providers`, {
        headers: {
            ...await AuthHeaders(),
        },
        next: {
            tags: ["dashboard:products", "dashboard:provider"],
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudieron cargar los proveedores y productos (HTTP ${response.status}).`);
    }

    const providers: Provider[] = await response.json();
    const products: Product[] = providers.flatMap((provider) =>
        (provider.products ?? []).map((product) => ({ ...product, provider })),
    );

    return (
        <FilteredCards products={products} providers={providers}>
            <CreateProductForm providers={providers} />
        </FilteredCards>
    );
}