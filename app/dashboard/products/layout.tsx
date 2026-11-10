import type { ReactNode } from "react";

export default function LayoutProducts({ children }: { children: ReactNode }) {
    return <div className="flex min-h-0 w-full flex-1">{children}</div>;
}
