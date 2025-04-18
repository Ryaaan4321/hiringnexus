"use client"

export default function UserBasicInfo() {
    return (
        <div className="w-full bg-white rounded-xl shadow-md p-6 absolute top-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <InfoItem label="AGE" value="28 years" />
                <InfoItem label="CTC" value="12.5 Lac" />
                <InfoItem label="YEARS OF EXPERIENCE" value="6 years" />
                <InfoItem label="LOCATION" value="Ahmedabad, Gujarat" />
                <InfoItem label="PHONE" value="+91 98123 55679" />
                <InfoItem label="EMAIL" value="anaynasharma@gmail.com" />
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