"use client"
import { Asterisk } from "lucide-react";
import Link from "next/link";

import { Buttons } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Building2, Trophy, Search, UserCheck, Star } from "lucide-react"
import { useUserDetails } from "@/hooks/user";
import { useUserId } from '@/hooks/user';
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
export default function HomePage() {
  const { completeUser, userloading } = useUserDetails();
  const { userId } = useUserId();
  return (
    <div className="min-h-screen w-full bg-[#faf9f6] relative ">
      
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
      `,
          backgroundSize: "8px 8px, 32px 32px, 32px 32px",
        }}
      />
      
      <div className="min-h-screen bg-transparent relative z-10">
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-slate-800">HiringNexus</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/user/dashboard" className="text-gray-700 hover:text-slate-800 font-medium">
                  Jobs
                </Link>
                <Link href="/companies" className="text-gray-700 hover:text-slate-800 font-medium">
                  Companies
                </Link>
                <Link href="/students" className="text-gray-700 hover:text-slate-800 font-medium">
                  Students
                </Link>
              </div>
              {completeUser ?
                <div>
                  <Link href={`/user/test-profile/${userId}`}>
                    <Buttons className="cursor-pointer bg-slate-800">Profile</Buttons>
                  </Link>
                </div> :
                <div className="flex items-center space-x-4">
                  <Link href='/user/login'>
                    <Buttons variant="ghost" className="text-slate-800 hover:bg-slate-100 cursor-pointer">
                      Sign In
                    </Buttons>
                  </Link>
                  <Link href='/user/signup'>
                    <Buttons className="bg-slate-800 hover:bg-slate-700 text-white cursor-pointer">Sign Up</Buttons>
                  </Link>
                </div>}

            </div>
          </div>
        </nav>
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-medium leading-relaxed">
                One Stop for the HR and the <span className="bg-slate-800 text-white px-3 py-1 rounded">Students</span>
              </h2>
            </div>

            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight">
                HiringNexus
              </h1>

            </div>

            <div className="mb-8">
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-medium">
                Start your Journey <span className="bg-slate-800 text-white px-3 py-1 rounded">Now</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href='/user/dashboard'>
                <Buttons
                  size="lg"
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
                >
                  Get Started
                </Buttons>
              </Link>
              <Buttons
                variant="outline"
                size="lg"
                className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg bg-transparent"
              >
                Learn More
              </Buttons>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-slate-800 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-800 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Partner Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-800 mb-2">2K+</div>
                <div className="text-gray-600 font-medium">Jobs Posted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-800 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Why Choose <span className="bg-slate-800 text-white px-3 py-1 rounded">HiringNexus</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We bridge the gap between talented students and forward-thinking companies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-slate-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Smart Matching</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our AI-powered system matches students with the perfect job opportunities based on skills, interests,
                    and career goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCheck className="w-8 h-8 text-slate-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Verified Profiles</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All student profiles and company listings are thoroughly verified to ensure authenticity and quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-8 h-8 text-slate-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Career Growth</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Access to mentorship programs, skill development courses, and career guidance from industry experts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Simple steps to connect talent with opportunity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  For <span className="bg-slate-800 text-white px-3 py-1 rounded">Students</span>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Create Your Profile</h4>
                      <p className="text-gray-600">
                        Build a comprehensive profile showcasing your skills, education, and projects.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Browse Opportunities</h4>
                      <p className="text-gray-600">Explore job listings from top companies tailored to your profile.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Apply & Connect  (Feature Coming Soon!)</h4>
                      <p className="text-gray-600">Apply to positions and connect directly with HR professionals .</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  For <span className="bg-slate-800 text-white px-3 py-1 rounded">HR Teams</span>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Post Job Openings</h4>
                      <p className="text-gray-600">
                        Create detailed job listings with requirements and company information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Review Applications</h4>
                      <p className="text-gray-600">
                        Access qualified candidate profiles and review applications efficiently.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Hire Top Talent</h4>
                      <p className="text-gray-600">
                        Connect with the best candidates and streamline your hiring process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600">Success stories from students and HR professionals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "HiringNexus helped me land my dream internship at a Fortune 500 company. The platform made the entire
                    process seamless!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Computer Science Student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "As an HR manager, HiringNexus has revolutionized our recruitment process. We find quality candidates
                    faster than ever."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mr-4">
                      <Building2 className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Michael Chen</div>
                      <div className="text-sm text-gray-600">HR Director, TechCorp</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "The mentorship program through HiringNexus gave me the guidance I needed to transition from student
                    to professional."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Emily Rodriguez</div>
                      <div className="text-sm text-gray-600">Marketing Graduate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Trusted by Leading Companies</h2>
              <p className="text-xl text-gray-600">Join hundreds of companies finding their next great hire</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {["TechCorp", "InnovateLab", "FutureWorks", "DataDrive", "CloudTech", "StartupHub"].map((company) => (
                <div key={company} className="text-center">
                  <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-slate-600">{company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-slate-800">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students and companies already using HiringNexus to build successful careers and teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center cursor-pointer">
              {completeUser ?
                <Link href={`/user/test-profile/${userId}`}>
                  <Buttons
                    size="lg"
                    className="bg-white cursor-pointer text-slate-800 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg"
                  >
                    Join as Student
                  </Buttons>
                </Link>
                :
                <Link href={`/user/login`}>
                  <Buttons
                    size="lg"
                    className="bg-white cursor-pointer text-slate-800 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg"
                  >
                    Join as Student
                  </Buttons>
                </Link>
              }
              <Link href={`/admin/signin`}>
                <Buttons
                  variant="outline"
                  size="lg"
                  className="border-white cursor-pointer text-white hover:bg-white hover:text-slate-800 px-8 py-3 text-lg font-semibold rounded-lg bg-transparent"
                >
                  Post Jobs
                </Buttons>
              </Link>
            </div>
          </div>
        </section>
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">HiringNexus</h3>
                <p className="text-gray-400 mb-4">
                  Connecting talented students with innovative companies for a brighter future.
                </p>
                <div className="flex space-x-4 items-center justify-items-center">
                  <div className="w-8 h-6`  rounded-full items-center justify-items-center cursor-pointer">
                    <a
                      href="https://www.linkedin.com/company/hiringnexus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                    >
                      <FaLinkedin size={30} />
                    </a>
                  </div>
                  {/*  https://t.me/hiringNexus_team */}
                  <div className="w-8 h-8  rounded-full cursor-pointer">
                    <a
                      href="https://t.me/hiringNexus_team"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                    >
                      <FaTelegram size={30} />
                    </a>
                  </div>
                  <div className="w-8 h-8  rounded-full cursor-pointer">
                    <a
                      href="https://chat.whatsapp.com/DfrYQCQtEF25sfNKbPNFIX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                    >
                      <FaWhatsapp size={30} />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">For Students</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Browse Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Create Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Career Resources
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Mentorship
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">For Companies</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Post Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Find Talent
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Enterprise
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 HiringNexus. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

