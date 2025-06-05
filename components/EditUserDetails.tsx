"use client";
import { useState } from "react";

export default function EditUserDetails() {
    const [user, setUser] = useState({
        id: "123",
        phonenumber: "6969",
        profession: "Student",
        email: "lalu@gmail.com",
        descreption: "I am a MERN stack developer passionate about solving real-world problems.",
    });

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full mt-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
            </div>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                    <FormItem label="Phone" value={user.phonenumber} onChange={(val) => setUser({ ...user, phonenumber: val })} />
                    <FormItem label="Profession" value={user.profession} onChange={(val) => setUser({ ...user, profession: val })} />
                    <FormItem label="Location" value="Ahmedabad, Gujarat" disabled />
                    <FormItem label="Email" value={user.email} disabled />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                    <textarea
                        value={user.descreption}
                        onChange={(e) => setUser({ ...user, descreption: e.target.value })}
                        className="w-full border rounded-md p-2 text-sm text-gray-700"
                        rows={3}
                        placeholder="Describe yourself in one line"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

function FormItem({
    label,
    value,
    onChange,
    disabled = false,
}: {
    label: string;
    value: string;
    onChange?: (val: string) => void;
    disabled?: boolean;
}) {
    return (
        <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={`text-sm font-medium text-gray-800 p-2 border rounded ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
            />
        </div>
    );
}
