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
  alreadyapplied: {
    id: string;
    title: string;
    descreption: string;
    joblink: string;
    postedbyId: string;
    timestamps: Date;
  }[];
}
