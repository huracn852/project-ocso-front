"use client";

import saveAccount from "@/actions/users/saveAccount";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState, type ReactNode } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

type AccountType = "employee" | "manager";

export default function AccountFormModal({
    accountType,
    recordId,
    accountEmail,
    trigger,
    triggerLabel,
    triggerClassName,
}: {
    accountType: AccountType;
    recordId: string;
    accountEmail?: string;
    trigger: ReactNode;
    triggerLabel: string;
    triggerClassName?: string;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const saveAccountForRecord = saveAccount.bind(
        null,
        accountType,
        recordId,
        accountEmail ?? null,
    );
    const isUpdating = Boolean(accountEmail);

    function generatePassword() {
        const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
        const randomValues = crypto.getRandomValues(new Uint8Array(16));
        setPassword(Array.from(
            randomValues,
            (value) => alphabet[value % alphabet.length],
        ).join(""));
    }

    return (
        <>
            <button
                type="button"
                aria-label={triggerLabel}
                title={triggerLabel}
                onClick={onOpen}
                className={triggerClassName}
            >
                {trigger}
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
                <ModalContent className="bg-orange-400">
                    {(onClose) => (
                        <>
                            <ModalHeader className="justify-center text-xl font-bold">
                                {isUpdating ? "Actualizar Usuario" : "Crear Usuario"}
                            </ModalHeader>
                            <ModalBody className="pb-6">
                                <form
                                    action={async (formData) => {
                                        await saveAccountForRecord(formData);
                                        setPassword("");
                                        onClose();
                                    }}
                                    className="space-y-3"
                                >
                                    <Input
                                        label="Correo de cuenta"
                                        name="userEmail"
                                        type="email"
                                        defaultValue={accountEmail}
                                        isReadOnly={isUpdating}
                                        isRequired
                                    />
                                    <Input
                                        label="Contraseña"
                                        name="userPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onValueChange={setPassword}
                                        minLength={8}
                                        isRequired
                                        endContent={
                                            <button
                                                type="button"
                                                aria-label={showPassword
                                                    ? "Ocultar contraseña"
                                                    : "Mostrar contraseña"}
                                                onClick={() => setShowPassword((value) => !value)}
                                                className="text-default-500"
                                            >
                                                {showPassword
                                                    ? <LuEyeOff size={20} />
                                                    : <LuEye size={20} />}
                                            </button>
                                        }
                                    />
                                    <Button
                                        type="button"
                                        color="danger"
                                        className="w-full"
                                        onPress={generatePassword}
                                    >
                                        Generar Contraseña
                                    </Button>
                                    <Button type="submit" color="primary" className="w-full">
                                        {isUpdating ? "Actualizar Usuario" : "Crear Usuario"}
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
