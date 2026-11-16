"use client";

import type { Employee, Location } from "@/entities";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { LuPlus } from "react-icons/lu";
import EmployeeCard from "./EmployeeCard";
import FormCreateEmployee from "./FormCreateEmployee";

export default function EmployeesBrowser({
    employees,
    locations,
}: {
    employees: Employee[];
    locations: Location[];
}) {
    const [selectedLocation, setSelectedLocation] = useState("all");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const filteredEmployees = useMemo(
        () =>
            selectedLocation === "all"
                ? employees
                : employees.filter(
                    (employee) =>
                        String(employee.location?.locationId ?? "") === selectedLocation,
                ),
        [employees, selectedLocation],
    );

    return (
        <section className="relative min-h-full">
            <label className="mb-6 block max-w-56">
                <span className="sr-only">Filtrar empleados por tienda</span>
                <select
                    aria-label="Filtrar empleados por tienda"
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    className="w-full rounded-lg border border-default-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-orange-500"
                >
                    <option value="all">Todas las tiendas</option>
                    {locations.map((location) => (
                        <option key={location.locationId} value={String(location.locationId)}>
                            {location.locationName}
                        </option>
                    ))}
                </select>
            </label>

            {filteredEmployees.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {filteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.employeeId} employee={employee} />
                    ))}
                </div>
            ) : (
                <p className="text-default-600">
                    {employees.length === 0
                        ? "No hay empleados para mostrar."
                        : "No hay empleados en esta tienda."}
                </p>
            )}

            <Button
                isIconOnly
                aria-label="Agregar empleado"
                title="Agregar empleado"
                onPress={onOpen}
                className="fixed bottom-6 right-6 z-10 h-11 min-w-11 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700"
            >
                <LuPlus size={22} />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" placement="center">
                <ModalContent className="bg-[#f15a0a]">
                    {() => (
                        <>
                            <ModalHeader className="pb-2 text-white">Crear empleado</ModalHeader>
                            <ModalBody className="pb-6">
                                <FormCreateEmployee />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    );
}
