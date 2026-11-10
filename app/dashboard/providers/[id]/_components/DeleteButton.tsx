"use client";

import deleteProvider from "@/actions/providers/delete";
import { Button } from "@nextui-org/react";
import { useActionState } from "react";

export default function DeleteProviderButton({ providerId }: { providerId: string }) {
    const [state, formAction, isPending] = useActionState(deleteProvider, {});

    return (
        <form action={formAction} className="flex flex-col gap-3">
            <input type="hidden" name="providerId" value={providerId} />
            {state.error && (
                <p className="text-center text-sm text-danger-700" role="alert">
                    {state.error}
                </p>
            )}
            <Button
                type="submit"
                isLoading={isPending}
                isDisabled={isPending}
                className="w-full rounded-xl bg-pink-600 text-white hover:bg-pink-700"
            >
                Estoy seguro
            </Button>
        </form>
    );
}
