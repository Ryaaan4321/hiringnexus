type JobType = "FULLTIME" | "REMOTE" | "INTERNSHIP" | "CONTRACT";

export default interface jobinterface {
    id: string,
    title: string,
    descreption: string,
    joblink: string,
    postedbyId: string,
    postedby: {
        name: string
    },
    companyname:string,
    experience:number,
    salary:number,
    jobTypes:JobType[]
};