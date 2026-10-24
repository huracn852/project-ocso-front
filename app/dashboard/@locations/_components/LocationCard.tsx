"use client";

import type { Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function LocationCard({ location }: { location: Location }) {
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
                    Manager: <Link href="/dashboard/managers"> <b>{location.manager?.managerFullname ?? location.manager?.managerFullName ?? "Sin asignar"}</b></Link>
                </p>
            </CardBody>
        </Card>
    );
}
