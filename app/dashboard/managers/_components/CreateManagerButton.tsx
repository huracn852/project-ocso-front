"use client";

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import type { ReactNode } from "react";
import { LuPlus } from "react-icons/lu";

export default function CreateManagerButton({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                aria-label="Agregar manager"
                title="Agregar manager"
                onPress={onOpen}
                className="h-10 min-w-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
                <LuPlus size={22} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
                <ModalContent className="bg-orange-400">
                    {() => (
                        <>
                            <ModalHeader>Crear Manager</ModalHeader>
                            <ModalBody className="pb-6">{children}</ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
