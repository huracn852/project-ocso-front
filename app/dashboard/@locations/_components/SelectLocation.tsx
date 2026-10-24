"use client";

import type { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Selectlocation({
    locations,
    selectedStore,
}: {
    locations: Location[];
    selectedStore: string;
}) {
    const router = useRouter();

    return (
        <Select
            placeholder="Selecciona una tienda"
            label="Tienda"
            classNames={{
                mainWrapper: "hover:ring-2 ring-red-300 rounded-x1 transition-all",
            }}
            selectedKeys={new Set([selectedStore])}
            onSelectionChange={(keys) => {
                if (keys === "all") {
                    return;
                }

                const storeId = keys.values().next().value;
                if (storeId === undefined) {
                    return;
                }
                if (storeId === "0") {
                    router.push("/dashboard");
                    return;
                }

                router.push(`/dashboard?store=${encodeURIComponent(String(storeId))}`);
            }}>
            {locations.map((location) => (
                <SelectItem key={String(location.locationId)}>
                    {location.locationName}
                </SelectItem>
            ))}
        </Select>
    );
}