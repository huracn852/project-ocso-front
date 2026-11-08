import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./_components/ProviderCard";
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
                <button
                    type="button"
                    aria-label="Agregar proveedor"
                    className="flex h-10 w-20 items-center justify-center rounded-xl bg-blue-600 text-2xl font-normal leading-none text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                    +
                </button>
            </div>
            <div className="mt-16 flex flex-wrap items-start gap-8 sm:gap-10">
                {providers.map((provider) => (
                    <ProviderCard provider={provider} key={provider.providerId} />
                ))}
            </div>
        </main>
    )
}

export default ProviderPage