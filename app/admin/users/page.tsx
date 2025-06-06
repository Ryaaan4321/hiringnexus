"use client"
import UserTable from "@/components/UserTable"
import { getallusers } from "@/app/actions/userserveraction"
import userinterface from "@/interfaces/userinterface"
import { useEffect, useState } from "react"

export default function Page(){
    const [users,setUsers]=useState<userinterface[]>([]);
    const [err,setErr]=useState("");
    useEffect(()=>{
        async function fetchusers(){
            try{
                const data=await getallusers();
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