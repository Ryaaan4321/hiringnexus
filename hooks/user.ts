import { getDetailsofUser, getidOfUser } from "@/app/actions/userserveraction";
import { userDetail } from "@/interfaces/userinterface";
import { useEffect, useId, useState } from "react";
import { useParams } from "next/navigation";
import { DB_GitHubProfile, DB_Repository, GitHubRepository } from "@/interfaces/githubinterface";
import { getSavedGithubData } from "@/lib/github";
import { recentappliedJob } from "@/interfaces/jobinterface";
import { getRecentappliedJobsOfUser } from "@/app/actions/userserveraction";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { fetchUser } from "@/redux/slices/userslice";
export function useUserId() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    useEffect(() => {
        async function fetchUserId() {
            try {
                const id = await getidOfUser();
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
export function useUserDetails() {
    const dispatch = useAppDispatch();
    const { user, userId, loading, err } = useAppSelector(
        (state) => state.user
    );
    const [completeUser, setCompleteUser] = useState<userDetail>();
    const [userloading, setUserLoading] = useState(false);
    useEffect(() => {
       if(!user && !loading){
        dispatch(fetchUser())
       }
    }, [userId]);

    return { completeUser:user, userId, userloading:loading,err:err };
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
    const [err, setErr] = useState("");
    useEffect(() => {
        async function fetchdata() {
            try {
                if (!userId) {
                    return;
                }
                const data = await getSavedGithubData(userId);
                setUserGithubProfile(data.profile)
                setUserGithubRepositories(data.repositories);
            } catch (e: any) {
                setErr(e.message);
            }
        }
        fetchdata();
    }, [userId])
    return { userGithubprofile, userGithubrepositories }
}
export function useRecentappliedJobs() {
    const [jobs, setJobs] = useState<recentappliedJob[] | null>(null);
    const { userId } = useUserId();
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!userId) {
            return;
        }
        async function fetchJobs() {
            try {
                setLoading(true);
                if (!userId) {
                    return;
                }
                const data = await getRecentappliedJobsOfUser(userId)
                setJobs(data)
                setErr(null);
            } catch (e: any) {
                setErr("failed to load the recent jobs");
                setJobs(null);
            }
        }
        fetchJobs();
    }, [userId]);
    console.log("jobs from the hooks = ", jobs);
    return { jobs, loading, err }
}