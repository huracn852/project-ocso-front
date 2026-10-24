import axios from "axios";
import { cookies } from "next/headers";
import { API_URL, TOKEN_NAME } from "@/constants";
import type { Manager } from "@/entities";

type ManagerSummary = Pick<Manager, "managerId" | "managerFullname"> &
    Partial<Pick<Manager, "managerEmail" | "managerPhoneNumber">>;

function getManagers(payload: unknown): ManagerSummary[] | null {
    let records = payload;

    for (let depth = 0; depth < 3 && !Array.isArray(records); depth++) {
        if (typeof records !== "object" || records === null) return null;

        const response = records as Record<string, unknown>;
        records =
            response.managers ??
            response.data ??
            response.items ??
            response.results;
    }

    if (!Array.isArray(records)) return null;

    const managers: ManagerSummary[] = [];
    for (const record of records) {
        if (typeof record !== "object" || record === null) return null;

        const manager = record as Record<string, unknown>;
        const managerFullname =
            manager.managerFullname ?? manager.managerFullName;
        if (
            (typeof manager.managerId !== "string" &&
                typeof manager.managerId !== "number") ||
            typeof managerFullname !== "string"
        ) {
            return null;
        }

        managers.push({
            managerId: String(manager.managerId),
            managerFullname,
            managerEmail:
                typeof manager.managerEmail === "string"
                    ? manager.managerEmail
                    : undefined,
            managerPhoneNumber:
                typeof manager.managerPhoneNumber === "string"
                    ? manager.managerPhoneNumber
                    : undefined,
        });
    }

    return managers;
}

export default async function ManagersPage() {
    const token = (await cookies()).get(TOKEN_NAME)?.value;
    const { data } = await axios.get<unknown>(`${API_URL}/managers`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const managers = getManagers(data);

    return (
        <main className="h-full w-4/12 overflow-y-auto p-8">
            <h1 className="mb-6 text-2xl font-semibold">Managers</h1>
            {managers === null ? (
                <p>No se pudo leer la respuesta de managers.</p>
            ) : managers.length === 0 ? (
                <p>No hay managers registrados.</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {managers.map((manager) => (
                        <li
                            key={manager.managerId}
                            className="rounded-lg bg-white p-5 shadow"
                        >
                            <h2 className="text-lg font-medium">
                                {manager.managerFullname}
                            </h2>
                            {manager.managerEmail && <p>{manager.managerEmail}</p>}
                            {manager.managerPhoneNumber && (
                                <p>{manager.managerPhoneNumber}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}