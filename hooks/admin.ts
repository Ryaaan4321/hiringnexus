import { useEffect, useState } from "react";
import { getidOfAdmin } from "@/app/actions/adminserveraction";
import { AdminPayload } from "@/app/actions/adminserveraction";
export function useAdmin() {
    const [admindata, setAdminId] = useState<AdminPayload | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchAdmin() {
            const data = await getidOfAdmin();
            if (!data) {
                return { success: false, msg: "sorry we couldn't find the admin" }
            }
            setAdminId({
                id: data?.id,
                role: data?.role,
                canDeleteJob: data?.canDeleteJob
            });
            setLoading(false);
        }
        fetchAdmin();
    }, [])
    return { admindata, loading }
}
