

import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="grid h-screen w-screen place-content-center overflow-hidden bg-orange-100">
      <div className="flex flex-col items-center">
        <Image
          src="/OXXO-Logo.png"
          alt="Logo de OCSO"
          width={300}
          height={100}
          loading="eager"
          style={{ width: "300px", height: "auto" }}
        />
        {children}
      </div>
    </div>
  );
}
