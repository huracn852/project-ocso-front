"use client";

import { Select, SelectItem } from "@nextui-org/react";
import type { Location, Manager } from "@/entities";

type ManagerOption = Pick<Manager, "managerId" | "managerFullname">;

type SelectManagerProps = {
    managers: ManagerOption[];
    locations?: Pick<Location, "manager">[];
};

export default function SelectManager({ managers, locations = [] }: SelectManagerProps) {
    const disabledKeys = locations
        .map((location) => location.manager?.managerId)
        .filter((managerId): managerId is string => typeof managerId === "string");

    return (
        <Select label="Manager" name="managerId" disabledKeys={disabledKeys}>
            {managers.map((manager) => (
                <SelectItem key={manager.managerId} textValue={manager.managerFullname}>
                    {manager.managerFullname}
                </SelectItem>
            ))}
        </Select>
    );
}