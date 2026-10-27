"use client";

import type { Manager } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ManagerCards({ manager }: { manager: Manager }) {
    const fullName = manager.managerFullname ?? manager.managerFullName ?? "";

    return (
        <Card className="mx-10">
            <CardHeader>
                <p className="w-full">
                    Nombre: <b>{fullName}</b>
                </p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">
                    Nombre: <b>{fullName}</b>
                </p>
                <p className="w-full">
                    Email: <b>{manager.managerEmail}</b>
                </p>
                <p className="w-full">
                    Teléfono: <b>{manager.managerPhoneNumber}</b>
                </p>
            </CardBody>
        </Card>
    );
}
