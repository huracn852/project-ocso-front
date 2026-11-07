"use client";

import type { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectStore({
    stores,
    defaultStore,
    managerId,
}: {
    stores: Location[];
    defaultStore?: number;
    managerId: string;
}) {
    const disabledStores = stores
        .filter((store) => store.manager && store.manager.managerId !== managerId)
        .map((store) => String(store.locationId));

    return (
        <Select
            label="Tienda"
            name="locationId"
            defaultSelectedKeys={defaultStore ? [String(defaultStore)] : []}
            disabledKeys={disabledStores}
        >
            {stores.map((store) => (
                <SelectItem
                    key={String(store.locationId)}
                    textValue={store.locationName}
                >
                    {store.locationName}
                </SelectItem>
            ))}
        </Select>
    );
}