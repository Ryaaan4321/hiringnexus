"use client"
import UserTable from "@/components/UserTable"
import { getallusers } from "@/app/actions/user"
import userinterface from "@/interfaces/user"
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
    console.log("users = ",users);
    return (
        <UserTable users={users}/>
    )
}