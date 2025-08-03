"use client"

import type { userDetail } from "@/interfaces/userinterface"
import { useRecentappliedJobs } from "@/hooks/user"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Buttons } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, Briefcase, MapPin, Mail, Phone, ExternalLink, Plus, Edit3, Clock } from "lucide-react"

export default function UserProfileSidebar({ user }: { user: userDetail | null }) {
    if (!user) {
        return (
            <Card className="w-full max-w-sm shadow-lg border-0">
                <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-slate-500 font-medium">Please login or wait!</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-sm shadow-lg border-0 sticky top-6">
            <CardHeader className="pb-4">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                            {user.name ? user.name[0].toUpperCase() : "H"}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                        <div className="flex items-center gap-1 text-slate-600">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-sm font-medium capitalize">{user.profession}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 w-full">
                        <Buttons size="sm" className="flex-1 bg-slate-800 hover:bg-slate-700">
                            <Edit3 className="w-4 h-4 mr-1" />
                            Edit
                        </Buttons>
                        <Buttons size="sm" variant="outline" className="flex-1 border-slate-300 hover:bg-slate-50 bg-transparent">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                        </Buttons>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {user.descreption && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            About
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">{user.descreption}</p>
                    </div>
                )}

                <Separator />
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                            Skills
                        </h3>
                        <Buttons size="sm" variant="ghost" className="h-6 px-2 text-slate-500 hover:text-slate-700">
                            <Plus className="w-3 h-3" />
                        </Buttons>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {user.skills?.length > 0 ? (
                            user.skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                                >
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <div className="w-full text-center py-4">
                                <div className="text-slate-400 mb-2">
                                    <Plus className="w-8 h-8 mx-auto" />
                                </div>
                                <p className="text-sm text-slate-500">No skills added yet</p>
                                <Buttons size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                                    Add Skills
                                </Buttons>
                            </div>
                        )}
                    </div>
                </div>

                <Separator />
                <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Recent Applications
                    </h3>

                    <div className="space-y-2">
                        {user.alreadyapplied && user.alreadyapplied.length > 0 ? (
                            user.alreadyapplied.slice(0, 4).map((job) => (
                                <Link
                                    key={job.id}
                                    href={`/user/job/${job.id}`}
                                    className="group block p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-slate-800 group-hover:text-slate-900 truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" />
                                                Company name
                                            </p>
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600 flex-shrink-0 ml-2" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Briefcase className="w-6 h-6 text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-500 mb-2">No recent applications</p>
                                <Link href="/jobs">
                                    <Buttons size="sm" variant="outline" className="text-xs bg-transparent">
                                        Browse Jobs
                                    </Buttons>
                                </Link>
                            </div>
                        )}
                    </div>

                    {user.alreadyapplied && user.alreadyapplied.length > 4 && (
                        <div className="mt-3 text-center">
                            <Link href="/user/applications">
                                <Buttons size="sm" variant="ghost" className="text-xs text-slate-600 hover:text-slate-800">
                                    View All Applications
                                </Buttons>
                            </Link>
                        </div>
                    )}
                </div>

                <Separator />
                <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Contact
                    </h3>

                    <div className="space-y-2 text-sm">
                        {user.email && (
                            <div className="flex items-center gap-2 text-slate-600">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{user.email}</span>
                            </div>
                        )}
                        {user.phonenumber && (
                            <div className="flex items-center gap-2 text-slate-600">
                                <Phone className="w-3 h-3" />
                                <span>{user.phonenumber}</span>
                            </div>
                        )}
                        {user.location && (
                            <div className="flex items-center gap-2 text-slate-600">
                                <MapPin className="w-3 h-3" />
                                <span>{user.location}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Profile Completion</span>
                        <span className="text-sm font-bold text-slate-800">75%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-slate-800 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Add more details to improve your visibility</p>
                </div>
            </CardContent>
        </Card>
    )
}
