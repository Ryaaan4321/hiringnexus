import { JWTPayload, jwtVerify } from 'jose';

export interface UserPayload extends JWTPayload {
  id: string,
  email: string
}
export default interface userinterface {
  id: string,
  name: string,
  username: string,
  email: string,
  phonenumber: string,
  profession: string
}
export interface usersemail {
  email: string;
}
export interface userDetail {
  id: string;
  name: string;
  username: string;
  email: string;
  profession: string;
  phonenumber: string | null;
  descreption: string | null;
  location:string |null;
  ctc:string|null;
  skills:string[]|[]
  githubprofile: {
    id: string;
    username: string;
    htmlUrl: string;
    followers: number;
    following: number;
    publicRepos: number;
    repositories: {
      id: string;
      name: string;
      htmlUrl: string;
      stargazersCount: number;
    }[];
  } | null;
  alreadyapplied: {
    id: string;
    title: string;
    descreption: string;
    joblink: string;
    postedbyId: string;
    timestamps: Date;
  }[];
}
export type safeuserupdateinput = {
  name?: string;
  username?: string;
  phonenumber?: string;
  descreption ?: string;
  profession?: string;
  ctc?:string;
  location?:string
  skills?:string[]
};


