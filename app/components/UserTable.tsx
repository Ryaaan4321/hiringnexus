const invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
    { id: 'INV006', status: 'Pending', method: 'Bank Transfer', amount: '$200.00' },
    { id: 'INV007', status: 'Unpaid', method: 'Credit Card', amount: '$300.00' },
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' }
];

export default function UserTable() {
    return (
        <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white">
                <thead className=" uppercase text-xs text-black">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-blue-900 font-semibold text-2xl">Username</th>
                        <th scope="col" className="px-6 py-3  text-blue-900 font-semibold text-2xl">Email</th>
                        <th scope="col" className="px-6 py-3  text-blue-900 font-semibold text-2xl">Profession</th>
                        <th scope="col" className="px-6 py-3  text-blue-900 font-semibold text-2xl overflow-hidden">Jobs</th>
                    </tr>
                </thead>
                <tbody className="">
                    {invoices.map((item, index) => (
                        <tr key={index} className="border-b text-black ">
                            <td className="px-6 py-4 font-medium">{item.id}</td>
                            <td className="px-6 py-4 font-medium text-zinc-600">{item.status}</td>
                            <td className="px-6 py-4 font-medium text-zinc-600">{item.method}</td>
                            <td className="px-6 py-4 font-medium text-green-900">{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
