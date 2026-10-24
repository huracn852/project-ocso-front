"use client";

import Link from "next/link"
import { Input, Button, Spinner } from "@nextui-org/react"
import React, { useState } from "react";

import { API_URL } from "@/constants";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true);
    setErrorMessage("")
    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get("userEmail")
    const userPassword = formData.get("userPassword")

    if (typeof userEmail !== "string" || typeof userPassword !== "string") {
      setErrorMessage("Ingresa tu correo y contraseña.")
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, userPassword }),
      })

      if (!response.ok) {
        let message: string | string[] | undefined
        try {
          const payload: unknown = await response.json()
          if (typeof payload === "object" && payload !== null) {
            const apiMessage = (payload as Record<string, unknown>).message
            if (typeof apiMessage === "string") {
              message = apiMessage
            } else if (
              Array.isArray(apiMessage) &&
              apiMessage.every((item): item is string => typeof item === "string")
            ) {
              message = apiMessage
            }
          }
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error
        }
        setErrorMessage(
          Array.isArray(message)
            ? message.join(", ")
            : message ?? "No se pudo iniciar sesión."
        )
        return
      }

      router.replace("/dashboard")
    } catch (error) {
      console.error("Unexpected login error:", error)
      setErrorMessage("No se pudo conectar con el servicio de inicio de sesión.")
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <form className="bg-orange-500 px-10 py-2 rounded-md" onSubmit={handleSubmit}>
      <p className="text-2xl my-4 text-white">
        Iniciar sesión
      </p>
      <div className="flex flex-col gap-2 my-4 items center">
        <Input label="Email" name="userEmail" type="email" isRequired size="sm" />
        <Input label="Contraseña" name="userPassword" type="password" isRequired size="sm" />

      </div>
      <div className="flex flex-col items-center gap-2">
        {errorMessage && <p className="text-center text-white" role="alert">{errorMessage}</p>}
        <Button color="primary" type="submit" disabled={submitting}>
          {submitting ? <><Spinner size="sm" /> Enviando</> : "Iniciar sesión"}
        </Button>
        <p>
          ¿No tienes cuenta? <Link href="/signup" className="text-red-600 underline">Regístrate</Link>
        </p>
      </div>
    </form>
  )
}