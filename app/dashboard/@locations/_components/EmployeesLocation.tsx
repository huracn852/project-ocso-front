import { Employee } from "@/entities";

import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import EmployeeCard from "./EmployeeCard";
import { AuthHeaders } from "@/helpers/authHeaders";

export default async function EmployeesLocation({ store }: { store: string }) {
    if (!store) {
        return <p></p>;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    const response = await fetch(`${API_URL}/employees/location/${store}`, {
        headers: token ? {
            ...AuthHeaders
        } : {},
    });
    const data: Employee[] = await response.json()
    return data.map((employee: Employee) => {
        return <EmployeeCard key={employee.employeeId} employee={employee} />;
    });
}