import { Employee } from "@/entities";
import axios from "axios";
import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import EmployeeCard from "./EmployeeCard";

export default async function EmployeesLocation({ store }: { store: string }) {
    if (!store) {
        return <p></p>;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    const { data } = await axios.get<Employee[]>(`${API_URL}/employees/location/${store}`, {
        headers: token ? {
            Authorization: `Bearer ${token}`
        } : {},
    });
    return data.map((employee) => {
        return <EmployeeCard key={employee.employeeId} employee={employee} />;
    });
}