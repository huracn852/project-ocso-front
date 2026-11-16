import { API_URL } from "@/constants";
import type { Employee, Location } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import EmployeesBrowser from "./_components/EmployeesBrowser";

export default async function EmployeesPage() {
    const headers = await AuthHeaders();
    const [employeesResponse, locationsResponse] = await Promise.all([
        fetch(`${API_URL}/employees`, { headers }),
        fetch(`${API_URL}/locations`, { headers }),
    ]);

    if (!employeesResponse.ok) {
        throw new Error(`No se pudieron cargar los empleados (HTTP ${employeesResponse.status}).`);
    }

    if (!locationsResponse.ok) {
        throw new Error(`No se pudieron cargar las tiendas (HTTP ${locationsResponse.status}).`);
    }

    const [employees, locations]: [Employee[], Location[]] = await Promise.all([
        employeesResponse.json(),
        locationsResponse.json(),
    ]);

    return (
        <main className="min-h-0 w-full flex-1 overflow-y-auto bg-[#fff8ed] p-6 sm:p-8">
            <EmployeesBrowser employees={employees} locations={locations} />
        </main>
    );
}
