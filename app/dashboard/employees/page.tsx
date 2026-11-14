import { API_URL } from "@/constants";
import type { Employee } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./_components/EmployeeCard";

export default async function EmployeesPage() {
    const response = await fetch(`${API_URL}/employees`, {
        headers: await AuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`No se pudieron cargar los empleados (HTTP ${response.status}).`);
    }

    const employees: Employee[] = await response.json();

    return (
        <main className="flex min-h-0 w-full flex-1 items-center justify-center overflow-y-auto bg-[#fff8ed] p-6 sm:p-8">
            {employees.length > 0 ? (
                <div className="flex w-full flex-wrap justify-center gap-0">
                    {employees.map((employee) => (
                        <EmployeeCard key={employee.employeeId} employee={employee} />
                    ))}
                </div>
            ) : (
                <p className="text-default-600">No hay empleados para mostrar.</p>
            )}
        </main>
    );
}
