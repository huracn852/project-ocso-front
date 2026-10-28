import { API_URL } from "@/constants";
import type { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";

export default async function ManagerPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    let response: Response;
    try {
        response = await fetch(`${API_URL}/managers/${id}`, {
            headers: {
                ...await AuthHeaders(),
            },
        });
    } catch (error) {
        if (!(error instanceof TypeError)) {
            throw error;
        }

        return (
            <section className="w-full rounded-xl border border-danger-200 bg-white p-5 text-danger" role="alert">
                No se pudo conectar con el backend. Verifica que el servicio esté activo en {API_URL}.
            </section>
        );
    }

    if (!response.ok) {
        return (
            <section className="w-full rounded-xl border border-danger-200 bg-white p-5 text-danger" role="alert">
                No se pudo cargar el manager (HTTP {response.status}).
            </section>
        );
    }

    const data: Manager = await response.json();
    const fullName = data.managerFullname ?? data.managerFullName ?? "";
    const coordinates = data.location?.locationLatLng;
    const hasCoordinates = coordinates?.length === 2
        && coordinates.every((coordinate) => Number.isFinite(coordinate));
    const mapUrl = hasCoordinates
        ? `https://maps.google.com/maps?q=${coordinates[0]},${coordinates[1]}&z=15&output=embed`
        : undefined;

    return (
        <section className="w-full overflow-hidden rounded-xl border border-default-200 bg-white shadow-sm">
            <header className="border-b border-default-200 p-4">
                <h1 className="w-full text-center text-2xl font-semibold md:text-3xl">
                    {fullName}
                </h1>
            </header>
            <div className="p-5 md:p-6">
                <div className="grid gap-5 xl:grid-cols-[1fr_1fr_1.6fr] xl:items-start">
                    <div className="space-y-1">
                        <p>Email: <b>{data.managerEmail}</b></p>
                        <p>Teléfono: <b>{data.managerPhoneNumber}</b></p>
                    </div>
                    <div className="space-y-1">
                        <p>
                            Tienda:{" "}
                            <b>
                                {data.location
                                    ? data.location.locationName
                                    : "Sin asignar"}
                            </b>
                        </p>
                        {data.location?.locationAddress && (
                            <p>{data.location.locationAddress}</p>
                        )}
                    </div>
                    {mapUrl ? (
                        <iframe
                            title={`Mapa de ${data.location?.locationName ?? "la tienda"}`}
                            src={mapUrl}
                            className="h-48 w-full rounded-md border border-orange-900 sm:h-52"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    ) : (
                        <p className="text-sm text-default-500">
                            No hay ubicación disponible para mostrar en el mapa.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}