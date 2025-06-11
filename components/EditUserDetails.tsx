"use client";
import { useState } from "react";
import Link from "next/link";
import { useUserId } from "@/hooks/user";
import { updateUserDetails } from "@/app/actions/userserveraction";
import { useRouter } from "next/navigation";
import { safeuserupdateinput } from "@/interfaces/userinterface";


export default function EditUserDetails() {
    // console.log("edit page calledddd")
    const router = useRouter();
    const { userId, loading: useridLoading, err: useridError } = useUserId();
    const [formdata, setFormData] = useState<Partial<safeuserupdateinput>>({});
    function handlechange(field: keyof safeuserupdateinput, value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!userId) {
            alert("please login first!")
            return;
        };
        const updated = await updateUserDetails(userId, formdata);
        if (updated) {
            router.push(`/user/profile/${userId}`);
        } else {
            alert("failed to update profile!.");
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full mt-6 ">
                <div className="flex justify-between mb-4">
                    <div><h2 className="text-xl font-bold text-gray-800">Edit Profile</h2></div>
                    <Link href={`/user/profile/${userId}`}>
                        <div className="">
                            <h1 className="rounded-full bg-blue-900 m-2 px-4 py-2 text-white w-6 h-7 flex items-center justify-center">
                                H
                            </h1>
                        </div>
                    </Link>
                </div>
                <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                        <FormItem label="name" onChange={(val) => handlechange("name", val)} />
                        <FormItem label="username" onChange={(val) => handlechange("username", val)} />
                        <FormItem label="phonenumber" onChange={(val) => handlechange("phonenumber", val)} />
                        <FormItem label="Profession" onChange={(val) => handlechange("profession", val)} />
                        <FormItem label="descreption" onChange={(val) => handlechange("descreption", val)} />
                        <FormItem label="ctc" onChange={(val) => handlechange("ctc", val)} />
                        <FormItem label="location" onChange={(val) => handlechange("location", val)} />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2  text-white rounded bg-blue-900  cursor-pointer" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
function FormItem({
    label,
    onChange,
    disabled = false,
}: {
    label: string;
    onChange?: (val: string) => void;
    disabled?: boolean;
}) {
    return (
        <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
            <input
                type="text"
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={`text-sm font-medium text-gray-800 p-2 border rounded ${disabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
            />
        </div>
    );
}
