import { API_URL } from "@/constants";
import type { Employee, Location } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import AccountFormModal from "@/app/dashboard/_components/AccountFormModal";
import Image from "next/image";
import Link from "next/link";
import DeleteEmployeeButton from "../_components/DeleteEmployeeButton";
import FormUpdateEmployee from "../_components/FormUpdateEmployee";
import { LuPlus } from "react-icons/lu";

export default async function EmployeePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const headers = await AuthHeaders();
    const [employeeResponse, locationsResponse] = await Promise.all([
        fetch(`${API_URL}/employees/${encodeURIComponent(id)}`, { headers }),
        fetch(`${API_URL}/locations`, { headers }),
    ]);

    if (!employeeResponse.ok) {
        throw new Error(`No se pudo cargar el empleado (HTTP ${employeeResponse.status}).`);
    }
    if (!locationsResponse.ok) {
        throw new Error(`No se pudieron cargar las tiendas (HTTP ${locationsResponse.status}).`);
    }

    const [employee, locations]: [Employee, Location[]] = await Promise.all([
        employeeResponse.json(),
        locationsResponse.json(),
    ]);
    const fullName = [employee.employeeName, employee.employeeLastName]
        .filter(Boolean)
        .join(" ");

    return (
        <main className="flex min-h-0 w-full flex-1 items-center justify-center overflow-y-auto bg-[#fff8ed] p-6 sm:p-8">
            <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2 lg:items-center">
                <section className="grid overflow-hidden rounded-lg border-2 border-orange-300 bg-white shadow-sm sm:grid-cols-[1fr_1fr]">
                    <div className="flex flex-col justify-center gap-1 p-4 text-sm sm:text-base">
                        <h1 className="mb-2 text-xl font-bold">{fullName}</h1>
                        <p>{employee.employeeEmail}</p>
                        <p>{employee.employeePhoneNumber}</p>
                        <DeleteEmployeeButton employeeId={id} />
                        {employee.location ? (
                            <Link
                                href={`/dashboard?store=${encodeURIComponent(String(employee.location.locationId))}`}
                                className="mt-1 font-semibold underline underline-offset-2 hover:text-orange-700"
                            >
                                {employee.location.locationName}
                            </Link>
                        ) : (
                            <p className="mt-1 text-default-500">Sin tienda asignada</p>
                        )}
                    </div>
                    <AccountFormModal
                        accountType="employee"
                        recordId={id}
                        accountEmail={employee.user?.userEmail}
                        triggerLabel={employee.user ? "Actualizar usuario del empleado" : "Crear usuario para el empleado"}
                        triggerClassName="relative min-h-56 w-full bg-orange-100 text-default-600"
                        trigger={
                            employee.employeePhoto ? (
                                <Image
                                    src={employee.employeePhoto}
                                    alt={`Foto de ${fullName}`}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            ) : (
                                <span className="flex h-full min-h-56 flex-col items-center justify-center gap-2">
                                    <LuPlus size={28} aria-hidden="true" />
                                    {employee.user ? "Actualizar usuario" : "Crear usuario"}
                                </span>
                            )
                        }
                    />
                </section>

                <FormUpdateEmployee employee={employee} locations={locations} />
            </div>
        </main>
    );
}
