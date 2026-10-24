"use client";

import Link from "next/link"
import { Input, Button, Spinner } from "@nextui-org/react"
import React, { useState } from "react";
import axios from "axios";
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
      await axios.post<{ message: string }>(`${API_URL}/auth/login`, {
        userEmail,
        userPassword
      }, {
        withCredentials: true,
      })
      router.replace("/dashboard")
    } catch (error) {
      if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
        const apiMessage = error.response?.data?.message
        setErrorMessage(
          Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage ?? "No se pudo conectar con el servicio de inicio de sesión."
        )
      } else {
        console.error("Unexpected login error:", error)
        setErrorMessage("Ocurrió un error inesperado al iniciar sesión.")
      }
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