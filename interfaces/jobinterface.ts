export const JobType = {
  FULLTIME: 'FULLTIME',
  REMOTE: 'REMOTE',
  INTERNSHIP: 'INTERNSHIP',
  CONTRACT: 'CONTRACT'
} as const;

export type JobType = keyof typeof JobType;

export enum EnumJobType {
  FULLTIME = 'FULLTIME',
  REMOTE = 'REMOTE',
  INTERNSHIP = 'INTERNSHIP',
  CONTRACT = 'CONTRACT'
}
export interface jobinterface {
  id: string,
  title: string,
  descreption: string,
  joblink: string,
  postedbyId: string,
  postedby: {
    name: string
  },
  companyname: string,
  experience: number,
  salary: number,
  jobTypes: JobType[],
  location:string,
  createdAt:string
};
export interface recentappliedJob {
  id: string;
  title: string;
  companyname: string;
  timestamps: Date;
  joblink?: string;
  experience?: number;
  salary?: number;
  jobTypes?: string[];
}
export interface jobFilters {
  jobTypes?: EnumJobType[];
  minExperience?: number;
  salaryRange?: [number, number];
}

export interface DeleteJobInterface {
  success: boolean;
  msg?: string;
  deletedJob?: any; 
}