import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import type { Location, Manager } from "@/entities";
import Selectlocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import UpdateLocation from "./_components/UpdateLocation";

type ManagerOption = Pick<Manager, "managerId" | "managerFullname">;

function getManagerOptions(payload: unknown): {
    managers: ManagerOption[];
    error?: string;
} {
    let records: unknown;

    if (Array.isArray(payload)) {
        records = payload;
    } else if (typeof payload === "object" && payload !== null) {
        const response = payload as Record<string, unknown>;
        records = response.managers ?? response.data ?? response.items ?? response.results;
    }

    if (!Array.isArray(records)) {
        return {
            managers: [],
            error: "La API de managers no devolvió una lista. Revisa el endpoint GET /managers del backend.",
        };
    }

    const managers: ManagerOption[] = [];
    for (const record of records) {
        if (typeof record !== "object" || record === null) {
            return {
                managers: [],
                error: "La respuesta de /managers tiene un formato inválido.",
            };
        }

        const manager = record as Record<string, unknown>;
        const managerId = manager.managerId;
        const managerFullname = manager.managerFullname ?? manager.managerFullName;

        if (
            (typeof managerId !== "string" && typeof managerId !== "number") ||
            typeof managerFullname !== "string"
        ) {
            return {
                managers: [],
                error: "La respuesta de /managers tiene un formato inválido.",
            };
        }

        managers.push({ managerId: String(managerId), managerFullname });
    }

    return { managers };
}

const LocationsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ store?: string | string[] }>;
}) => {
    const params = await searchParams;
    const { store } = params;
    const selectedStore = Array.isArray(store) ? store[0] : store;
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    const locationsResponse = await fetch(`${API_URL}/locations`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!locationsResponse.ok) {
        throw new Error(`No se pudieron cargar las tiendas (${locationsResponse.status}).`);
    }
    const locationData: Location[] = await locationsResponse.json();

    let managerResult: ReturnType<typeof getManagerOptions>;
    try {
        const managersResponse = await fetch(`${API_URL}/managers`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (managersResponse.ok) {
            managerResult = getManagerOptions(await managersResponse.json());
        } else {
            let message: string | string[] | undefined;
            try {
                const payload: unknown = await managersResponse.json();
                if (typeof payload === "object" && payload !== null) {
                    const apiMessage = (payload as Record<string, unknown>).message;
                    if (typeof apiMessage === "string") {
                        message = apiMessage;
                    } else if (
                        Array.isArray(apiMessage) &&
                        apiMessage.every((item): item is string => typeof item === "string")
                    ) {
                        message = apiMessage;
                    }
                }
            } catch (error) {
                if (!(error instanceof SyntaxError)) {
                    throw error;
                }
            }

            managerResult = {
                managers: [],
                error: Array.isArray(message)
                    ? message.join(", ")
                    : message ?? "No se pudieron cargar los managers.",
            };
        }
    } catch (error) {
        if (!(error instanceof TypeError)) {
            throw error;
        }

        managerResult = {
            managers: [],
            error: "No se pudieron cargar los managers.",
        };
    }

    const locations: Location[] = [
        {
            locationId: 0,
            locationName: "Ninguna",
            locationLatLng: [0, 0],
            locationAddress: "",
        },
        ...locationData,
    ];
    const selectedLocation = locations.find(
        (location) => String(location.locationId) === selectedStore
    );

    return (
        <div className="w-5/12">
            <div className="flex h-[90vh] w-full flex-col items-center">
                <div className="my-10 w-1/2">
                    <Selectlocation
                        locations={locations}
                        selectedStore={selectedStore ?? "0"}
                    />
                    {selectedLocation && selectedLocation.locationId !== 0 && (
                        <div className="mt-4">
                            <LocationCard
                                location={selectedLocation}
                            />
                        </div>
                    )}
                </div>
                <FormNewLocation
                    searchParams={params}
                    managers={managerResult.managers}
                    locations={locationData}
                    managersError={managerResult.error}
                />
                {selectedStore &&
                    selectedStore !== "0" &&
                    selectedLocation &&
                    selectedLocation.locationId !== 0 && (
                        <div className="flex flex-col items-center gap-4">
                            <DeleteLocationButton store={selectedStore} />
                            <UpdateLocation
                                location={selectedLocation}
                                managers={managerResult.managers}
                            />
                        </div>
                    )}
            </div>
        </div>
    );
};

export default LocationsPage;
