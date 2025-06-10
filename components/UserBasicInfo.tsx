"use client"
import { userDetail } from "@/interfaces/userinterface";
import { useState } from "react";
import EditUserDetials from "./EditUserDetails";
import Link from "next/link";
export default function UserBasicInfo({ user }: { user: userDetail | null }) {
    if (!user) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full min-h-[20vh] flex flex-col justify-between lg:mt-6 left-5 mt-6 sm:mt-0">
                <div className="text-center py-2">Please login or wait!</div>
            </div>
        );
    }
    return (
        <div className="w-auto bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between">
                <div><h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2></div>
                <Link href={`/user/edit-page`}><div><h2 className="text-sky-700 cursor-pointer">Edit Profile</h2></div></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {(user.profession === "Fresher" ) ? "" : <InfoItem label="CTC" value={user.ctc ? user.ctc:"Enter your ctc"} />}
                <InfoItem label="YEARS OF EXPERIENCE" value={user.profession} />
                <InfoItem label="LOCATION" value={user.location ?user.location :"Enter Your Location"} />
                <InfoItem label="PHONE" value={user.phonenumber ? user.phonenumber : ""} />
                <InfoItem label="EMAIL" value={user.email} />
            </div>
        </div>
    )
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-medium text-gray-800 mt-1">{value}</span>
        </div>
    )
}