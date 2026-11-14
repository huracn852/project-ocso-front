import { API_URL } from "@/constants";
import type { Product, Provider } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import { notFound } from "next/navigation";
import FilteredCards from "../_components/FilteredCards";
import FormUpdateProduct from "../_components/FormUpdateProduct";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [{ id }, response] = await Promise.all([
        params,
        fetch(`${API_URL}/providers`, {
            headers: await AuthHeaders(),
            next: { tags: ["dashboard:products", "dashboard:provider"] },
        }),
    ]);

    if (!response.ok) {
        throw new Error(`No se pudieron cargar los productos (HTTP ${response.status}).`);
    }

    const providers: Provider[] = await response.json();
    const products: Product[] = providers.flatMap((provider) =>
        (provider.products ?? []).map((product) => ({ ...product, provider })),
    );
    const product = products.find((item) => item.productId === id);

    if (!product) notFound();

    return (
        <FilteredCards
            products={products}
            providers={providers}
            selectedProductId={id}
        >
            <FormUpdateProduct product={product} providers={providers} />
        </FilteredCards>
    );
}
