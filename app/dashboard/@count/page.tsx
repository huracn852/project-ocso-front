import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { count } from "console";
import { cookies } from "next/headers";

const CountPage = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    const countLocations = await axios.get(`${API_URL}/locations`, {
        headers: token ? { Authorization: ["Bearer ", token].join("") } : {},
    });

    const cantidad = countLocations?.data?.length;
    return `Hay: ${cantidad} tiendas${cantidad > 1 ? "s" : ""}`
};

export default CountPage;
