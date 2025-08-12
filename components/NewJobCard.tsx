"use client"

import Link from "next/link"
import { useState } from "react"
import type { jobinterface } from "@/interfaces/jobinterface"
import { useUserId } from "@/hooks/user"
import { visitedJobs } from "@/app/actions/userserveraction"
import { deleteJob } from "@/app/actions/adminserveraction"
import { useAdmin } from "@/hooks/admin"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Buttons } from "@/components/ui/button"
import { Building2, User, Clock, DollarSign, MapPin, ExternalLink, Trash2, Calendar, Briefcase } from "lucide-react"

export default function JobCards({ job, isLoggedIn = true }: { job: jobinterface[]; isLoggedIn?: boolean }) {
  const { userId, loading, err } = useUserId()
  const { admindata } = useAdmin()
  const [deletingJobs, setDeletingJobs] = useState<Set<string>>(new Set())
  const [visitingJobs, setVisitingJobs] = useState<Set<string>>(new Set())

  const role = admindata?.role
  const canDeleteJob = admindata?.canDeleteJob

  function AlreadyApplied({ jobId, jobLink }: { jobId: string; jobLink: string }) {
    if (!userId || !isLoggedIn) {
      return (
        <Link href="/login">
          <Buttons size="sm" className="bg-slate-800 hover:bg-slate-700 text-white">
            <ExternalLink className="w-4 h-4 mr-1" />
            Sign in to Apply
          </Buttons>
        </Link>
      )
    }

    const isVisiting = visitingJobs.has(jobId)

    const handleClick = async () => {
      setVisitingJobs((prev) => new Set(prev).add(jobId))
      try {
        const result = await visitedJobs(jobId, userId)
        setTimeout(() => {
          setVisitingJobs((prev) => {
            const newSet = new Set(prev)
            newSet.delete(jobId)
            return newSet
          })
        }, 1000)
      } catch (error) {
        setVisitingJobs((prev) => {
          const newSet = new Set(prev)
          newSet.delete(jobId)
          return newSet
        })
      }
    }

    return (
      <Link href={jobLink || "https://hiringnexus.vercel.app/"} target="_blank" onClick={handleClick}>
        <Buttons size="sm" className="bg-slate-800 hover:bg-slate-700 text-white cursor-pointer" disabled={isVisiting}>
          {isVisiting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Applying...
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4 mr-1" />
              Apply Now
            </>
          )}
        </Buttons>
      </Link>
    )
  }

  function DeleteThisJob({ jobId }: { jobId: string }) {
    if (!jobId) {
      return null
    }

    const isDeleting = deletingJobs.has(jobId)

    const handleClick = async () => {
      setDeletingJobs((prev) => new Set(prev).add(jobId))
      try {
        const result = await deleteJob(jobId)
        setTimeout(() => {
          setDeletingJobs((prev) => {
            const newSet = new Set(prev)
            newSet.delete(jobId)
            return newSet
          })
        }, 1000)
      } catch (error) {
        setDeletingJobs((prev) => {
          const newSet = new Set(prev)
          newSet.delete(jobId)
          return newSet
        })
      }
    }

    return (
      <Buttons
        size="sm"
        variant="outline"
        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-transparent"
        onClick={handleClick}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Deleting...
          </>
        ) : (
          <>
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </>
        )}
      </Buttons>
    )
  }

  const getJobTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      FullTime: "bg-green-100 text-green-800",
      PartTime: "bg-blue-100 text-blue-800",
      Internship: "bg-purple-100 text-purple-800",
      Contract: "bg-orange-100 text-orange-800",
      Remote: "bg-indigo-100 text-indigo-800",
    }
    return colors[type] || "bg-slate-100 text-slate-700"
  }
  const getTimeAgo = (createdAt?: Date | null) => {
    if (!createdAt) return "Recently posted"
    const diffMs = Date.now() - createdAt.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {job.map((item) => (
        <Card
          key={item.id}
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1"
        >
          <CardHeader className="pb-4">
            <Link href={`/user/job/${item.id}`} className="block">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center rounded-xl text-lg font-bold shadow-md ">
                  {item.title?.[0]?.toUpperCase() || "H"}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-bold text-slate-800  transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 mt-1 text-slate-600">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.companyname}</span>
                  </div>
                </div>
              </div>

              {item.descreption && (
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{item.descreption}</p>
              )}
            </Link>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Posted by</span>
                <span className="font-medium text-slate-800">{item.postedby.name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Experience</span>
                <span className="font-medium text-slate-800">
                  {item.experience === 0 ? "Fresher" : `${item.experience} year${item.experience > 1 ? "s" : ""}`}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Salary</span>
                <span className="font-semibold text-green-600">{item.salary}</span>
              </div>

              {item.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">Location</span>
                  <span className="font-medium text-slate-800">{item.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">{getTimeAgo(item.createdAt)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.jobTypes.map((type, i) => (
                <Badge key={i} variant="secondary" className={`text-xs font-medium ${getJobTypeColor(type)}`}>
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500">Job ID: {item.id.slice(0, 8)}</span>
            </div>

            <div className="flex gap-2">
              {role === "admin" && canDeleteJob && <DeleteThisJob jobId={item.id} />}
              <AlreadyApplied jobId={item.id} jobLink={item.joblink || ""} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

// Component for non-logged-in users
export function PublicJobCards({ job }: { job: jobinterface[] }) {
  return <JobCards job={job} isLoggedIn={false} />
}
