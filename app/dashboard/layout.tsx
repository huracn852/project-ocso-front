import type { ReactNode } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/sidebar";

export default function LayoutDashboard({
  children,
  locations
}: Readonly<{ children: ReactNode; locations: ReactNode }>) {
  return (
    <div className="flex h-screen w-screen flex-col bg-orange-50">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        {children}
        {locations}
      </div>
    </div>
  );
}
