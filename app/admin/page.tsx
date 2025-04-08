"use react"
export default function Page() {
    console.log("admin  got called")
    return (
        <div>
        <h1 className="text-3xl font-bold text-blue-900">Welcome to Admin Panel</h1>
        <p className="text-gray-600 mt-2">Select a section from the sidebar to get started.</p>
      </div>
    );
  }