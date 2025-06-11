import { getDetailsofUser, getidOfUser } from "@/app/actions/userserveraction";
import { userDetail } from "@/interfaces/userinterface";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GitHubProfile } from "@prisma/client";
import { DB_GitHubProfile, DB_Repository, GitHubRepository } from "@/interfaces/githubinterface";
import { getSavedGithubData } from "@/lib/github";
export function useUserId() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    useEffect(() => {
        async function fetchUserId() {
            try {
                const id = await getidOfUser();
                console.log("id from the useuserid hookk = ", id);
                setUserId(id);
            } catch (e: any) {
                setErr("failed to fetch the user id!")
            }
            setLoading(false);
        }
        fetchUserId();
    }, []);
    return { userId, loading, err };
}

export function useUserDetails(id: string | null | undefined) {
    const [user, setUser] = useState<userDetail>();
    const [err, setErr] = useState("");
    useEffect(() => {
        async function fetchUsers() {
            try {
                if (!id) {
                    setErr("user id not found!");
                    return;
                }
                const userdetail = await getDetailsofUser(id);
                if (userdetail) {
                    setUser(userdetail);
                }
            } catch (e: any) {
                setErr("yes something went wrong!");
            }
        }

        fetchUsers();
    }, [id]);

    return { user, err };
}
export function useUserFromParam() {
    const [user, setUser] = useState<userDetail>();
    const [err, setErr] = useState("");
    const params = useParams();
    useEffect(() => {
        async function fetchUsers() {
            try {
                const param = params?.id as string | undefined;
                if (!param) {
                    setErr("user id not found!");
                    return;
                }
                const userdetail = await getDetailsofUser(param);
                if (userdetail) {
                    setUser(userdetail);
                }
            } catch (e: any) {
                setErr("yes something went wrong!");
            }
        }

        fetchUsers();
    }, [params]);
    return { user, err };
}
export function useGithub() {
    const [userGithubprofile, setUserGithubProfile] = useState<DB_GitHubProfile | null>()
    const [userGithubrepositories, setUserGithubRepositories] = useState<DB_Repository[]>([]);
    const { userId, loading: useridLoading, err: useridError } = useUserId();
    const [err,setErr]=useState("");
    useEffect(()=>{
        async function fetchdata(){
            try{
                if(!userId){
                    return;
                }
                const data=await getSavedGithubData(userId);
                setUserGithubProfile(data.profile)
                setUserGithubRepositories(data.repositories);
            }catch(e:any){
                setErr(e.message);
            }
        }
        fetchdata();
    },[userId])
    return {userGithubprofile,userGithubrepositories}
}