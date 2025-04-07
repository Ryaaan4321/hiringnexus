"use react"

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function Page() {
    console.log("admin  got called")
    return (
        <div>
            <Header/>
            <Sidebar />
        </div>
    )
}