'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import type { ReactNode } from "react";
import { LuPlus } from "react-icons/lu";

export default function CreateProvider({
    children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                aria-label="Agregar proveedor"
                title="Agregar proveedor"
                onPress={onOpen}
                className="h-10 w-20 min-w-20 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
                <LuPlus size={20} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
                <ModalContent className="bg-orange-400">
                    {() => (
                        <>
                            <ModalHeader>Crear proveedor</ModalHeader>
                            <ModalBody className="pb-6">{children}</ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
