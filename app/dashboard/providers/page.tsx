import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import ProviderCard from "./_components/ProviderCard";
import CreateProvider from "./_components/createProvider";
import FormCreateProvider from "./_components/FormCreateProvider";
type Provider = Parameters<typeof ProviderCard>[0]["provider"];

const ProviderPage = async () => {
    const response = await fetch(`${API_URL}/providers`, {
        headers: {
            ...(await AuthHeaders())
        }
    })
    const providers: Provider[] = await response.json()

    return (
        <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto bg-[#fff8ed] px-6 py-8 sm:px-10">
            <div className="flex justify-end">
                <CreateProvider>
                    <FormCreateProvider />
                </CreateProvider>
            </div>
            <div className="mt-16 flex flex-wrap items-start gap-8 sm:gap-10">
                {providers.map((provider) => (
                    <Link
                        key={provider.providerId}
                        href={`/dashboard/providers/${provider.providerId}`}
                        aria-label={`Ver proveedor ${provider.providerName}`}
                        className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
                    >
                        <ProviderCard provider={provider} />
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default ProviderPage