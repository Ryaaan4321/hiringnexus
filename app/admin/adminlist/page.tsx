"use client"

import AdminTable from "@/app/components/AdminTable"
import { adminwithjobcountinterface, getalladmins } from "@/app/lib/actions"
import { useEffect, useState } from "react"

export default function Page(){
    const [admin,setadmin]=useState<adminwithjobcountinterface[]>([]);
    const [err,seterr]=useState("");
    useEffect(()=>{
        async function fetchadmins() {
            try{
                const data=await getalladmins();
                setadmin(data);
                console.log("data from the fetchdadmin",data )
            }catch(e:any){
                console.log(e.message);
                seterr(e.message);
            }
        }
        fetchadmins();
    },[])
    return (
        <AdminTable admins={admin}/>
    )
}