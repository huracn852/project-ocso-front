"use client";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import type { ReactNode } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function DeleteProvider({
    providerName,
    children,
}: {
    providerName: string;
    children: ReactNode;
}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                type="button"
                aria-label={`Eliminar proveedor ${providerName}`}
                title="Eliminar proveedor"
                onPress={onOpen}
                className="h-10 w-20 min-w-20 rounded-xl bg-pink-600 text-white hover:bg-pink-700"
            >
                <FaRegTrashAlt size={18} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
                <ModalContent className="bg-orange-400">
                    {() => (
                        <>
                            <ModalHeader className="justify-center px-6 pt-8 text-center text-3xl font-semibold leading-tight">
                                ¿Estás seguro de eliminar al proveedor {providerName}?
                            </ModalHeader>
                            <ModalBody className="gap-3 px-6 pb-2">{children}</ModalBody>
                            <div className="px-6 pb-6">
                                <Button
                                    type="button"
                                    onPress={onClose}
                                    className="w-full rounded-xl bg-default-200 text-foreground hover:bg-default-300"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
