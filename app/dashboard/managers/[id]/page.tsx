import { API_URL } from "@/constants";
import type { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function ManagerPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const response = await fetch(`${API_URL}/managers/${id}`, {
        headers: {
            ...await AuthHeaders(),
        },
    });
    if (!response.ok) {
        throw new Error(`No se pudo cargar el manager (${response.status}).`);
    }

    const data: Manager = await response.json();
    const fullName = data.managerFullname ?? data.managerFullName ?? "";

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
                    Email: <b>{data.managerEmail}</b>
                </p>
                <p className="w-full">
                    Teléfono: <b>{data.managerPhoneNumber}</b>
                </p>
            </CardBody>
        </Card>
    );
}