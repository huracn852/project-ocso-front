'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { LuPencil } from "react-icons/lu";

export default function UpdateManager({
    children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                aria-label="Editar manager"
                title="Editar manager"
                onPress={onOpen}
                className="h-10 w-20 min-w-20 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
                <LuPencil size={20} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
                <ModalContent className="bg-orange-400">
                    {() => (
                        <>
                            <ModalHeader>Actualizar Manager</ModalHeader>
                            <ModalBody className="pb-6">{children}</ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
