"use client";

import type { Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function LocationCard({
    location,
}: {
    location: Location;
}) {
    const manager = location.manager;
    const managerName = manager?.managerFullname ?? manager?.managerFullName;

    return (
        <Card>
            <CardHeader>
                <p className="w-full">
                    <b>{location.locationName}</b>
                </p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">
                    Dirección: <b>{location.locationAddress}</b>
                </p>
                <p className="w-full">
                    Manager:{" "}
                    {manager?.managerId && managerName ? (
                        <Link href={`/dashboard/managers/${manager.managerId}`}>
                            <b>{managerName}</b>
                        </Link>
                    ) : (
                        <b>Sin asignar</b>
                    )}
                </p>
            </CardBody>
        </Card>
    );
}
