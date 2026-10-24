'use client'

import type { Location, Manager } from "@/entities";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import FormUpdateLocation from "./FormUpdateLocation";

type ManagerOption = Pick<Manager, "managerId" | "managerFullname">;

export default function UpdateLocation({
    location,
    managers,
}: {
    location: Location;
    managers: ManagerOption[];
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                aria-label="Editar tienda"
                title="Editar tienda"
                onPress={onOpen}
                className="h-10 w-20 min-w-20 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
                <FaPen size={18} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Editar tienda
                            </ModalHeader>
                            <ModalBody>
                                <FormUpdateLocation
                                    location={location}
                                    managers={managers}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
