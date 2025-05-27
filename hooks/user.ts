import { useEffect,useState } from "react";

export const useUser=()=>{
    const [loading,setLoading]=useState(0);
    const [user,setUser]=useState();
    try{

    }catch(e:any){
        console.log("error from the custom hook = ",e.message);
    }
}