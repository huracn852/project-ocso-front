"use client";

import Link from "next/link"
import { Input, Button } from "@nextui-org/react"
import { useState, type FormEvent } from "react";
import axios from "axios";
import { API_URL } from "@/constants";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");

    if (typeof userEmail !== "string" || typeof userPassword !== "string") {
      setErrorMessage("Ingresa tu correo y contraseña.");
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/login`, { userEmail, userPassword });
    } catch (error) {
      if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
        const apiMessage = error.response?.data?.message;
        setErrorMessage(
          Array.isArray(apiMessage)
            ? apiMessage.join(", ")
            : apiMessage ?? "No se pudo conectar con el servicio de inicio de sesión."
        );
        return;
      }

  
    }
  }

  return (
    <form className="rounded-md bg-orange-500 px-10 py-2" onSubmit={handleSubmit}>
      <p className="my-4 text-2xl text-white">Iniciar sesión</p>
      <div className="my-4 flex flex-col items-center gap-2">
        <Input label="Email" name="userEmail" type="email" isRequired size="sm" />
        <Input label="Contraseña" name="userPassword" type="password" isRequired size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2">
        {errorMessage && <p className="text-center text-white" role="alert">{errorMessage}</p>}
        <Button color="primary" type="submit">Iniciar sesión</Button>
        <p>
          ¿No tienes cuenta? <Link href="/signup" className="text-red-600 underline">Regístrate</Link>
        </p>
      </div>
    </form>
  );
}