import { ColumnDef } from "@tanstack/react-table";
import { adminwithjobcountinterface } from "@/app/actions/adminserveraction";

export const adminColumns: ColumnDef<adminwithjobcountinterface>[] = [
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => <div className="font-medium">{row.getValue("username")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "jobcount",
        header: "Jobs",
    },
];
