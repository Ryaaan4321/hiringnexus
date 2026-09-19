import { redirect } from "next/navigation";

export default function AdminHRRedirectPage() {
  redirect("/recruiter/dashboard");
}