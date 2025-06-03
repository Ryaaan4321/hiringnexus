import { getidOfUser } from "@/app/actions/user";
import { useEffect, useState } from "react";

export default function useUserId() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    useEffect(() => {
        async function fetchUserId() {
            try {
                const id = await getidOfUser();
                console.log("id fromt eh useuserid hookk = ", id);
                setUserId(id);
            } catch (e: any) {
                setErr("failed to fetch the user id!")
            }
            setLoading(false);
        }
        fetchUserId();
    }, []);
    return { userId, loading, err };
}