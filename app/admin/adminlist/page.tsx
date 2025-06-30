"use client"

import AdminTable from "@/components/AdminTable"
import { getalladmins, adminwithjobcountinterface } from "@/app/actions/adminserveraction";
import { useEffect, useState } from "react"

export default function Page() {
    const [admin, setadmin] = useState<adminwithjobcountinterface[]>([]);
    const [err, seterr] = useState("");
    useEffect(() => {
        async function fetchadmins() {
            try {
                const data = await getalladmins();
                setadmin(data);
            } catch (e: any) {
                seterr(e.message);
            }
        }
        fetchadmins();
    }, [])
    return (
        <div>
            {admin.length === 0 ? (
                <p className="text-sm text-gray-500">No admins found or loading...</p>
            ) : (
                <AdminTable admins={admin} />
            )}
        </div>
    )
}