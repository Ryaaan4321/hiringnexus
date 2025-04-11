"use client"
import UserTable from "@/app/components/UserTable"
import { getallusers } from "@/app/lib/actions"
import userinterface from "@/app/api/user/signup/route"
import { useEffect, useState } from "react"

export default function Page(){
    const [users,setUsers]=useState<userinterface[]>([]);
    const [err,setErr]=useState("");
    useEffect(()=>{
        async function fetchusers(){
            try{
                const data=await getallusers();
                // console.log("data = ",data);
                setUsers(data)
            }catch(e:any){
                console.log(e.message);
                setErr(e.message);
            }
        }
        fetchusers();
    },[])
    return (
        <UserTable users={users}/>
    )
}