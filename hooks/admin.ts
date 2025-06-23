import { useEffect, useState } from "react";
import admininterface, { getDetailsOfAdmin, getidOfAdmin } from "@/app/actions/adminserveraction";
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
export function useAdminData() {
    const [admin, setAdmin] = useState<admininterface | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchAdmin() {
            const adminpayload = await getidOfAdmin();
            if (!adminpayload) {
                setAdmin(null);
                setLoading(false);
                return;
            }
            const admindetials = await getDetailsOfAdmin(adminpayload.id);
            setAdmin(admindetials);
            setLoading(false);
        }
        fetchAdmin();
    }, []);
    return { admin, loading }
}
