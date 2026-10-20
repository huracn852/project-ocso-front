import Image from "next/image";

export default function Header() {
  return (
    <header className="flex h-[10vh] w-screen items-center bg-orange-200 px-10">
      <Image
        src="/OXXO-Logo.png"
        width={100}
        height={56}
        alt="Logo de OXXO"
        draggable={false}
      />
    </header>
  );
}
