"use client"

import { adminwithjobcountinterface } from "@/app/actions/adminserveraction"
import { adminColumns } from "./AdminTableColumn"
import { DataTable } from "@/components/ui/DataTable"

export default function AdminTable({
    admins,
}: {
    admins: adminwithjobcountinterface[]
}) {
    return (
        <DataTable columns={adminColumns} data={admins} />
    )
}
