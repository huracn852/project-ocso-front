import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const AuthHeaders = cache(async () => {
    const token = (await cookies()).get(TOKEN_NAME)?.value;
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
});