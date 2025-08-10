"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Buttons } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, ArrowLeft, User, Building } from "lucide-react"
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        agreeToTerms: false,
        phonenumber:"",
        subscribeNewsletter: false,
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            alert("Please agree to the terms and conditions");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                    phonenumber: formData.phonenumber
                }),
            });
            const result = await res.json();
            if (!res.ok) {
                alert(result.msg || "Signup failed");
                return;
            }
            window.location.href = "/user/dashboard";
        } catch (err) {
            console.error("Signup error:", err);
            alert("Something went wrong. Try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="mt-15 min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <div className="text-center mb-6">
                    <Link href="/">
                        <h1 className="text-3xl font-black text-slate-800">HiringNexus</h1>
                    </Link>
                    <p className="text-gray-600 mt-2">Create your account and start your journey!</p>
                </div>

                <Card className="shadow-lg border-0">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-slate-800">Create Account</CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            Join thousands of students and HR professionals
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-3">
                                
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="Name" className="text-slate-700 font-medium">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="Name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-slate-700 font-medium">
                                        Username
                                    </Label>
                                    <Input
                                        id="lastName"
                                        name="username"
                                        type="text"
                                        placeholder="johndoee"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-medium">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={ "student@university.edu"}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-700 font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="border-gray-300 focus:border-slate-500 focus:ring-slate-500 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phonenumber" className="text-slate-700 font-medium">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="phonenumber"
                                        name="phonenumber"
                                        placeholder="999999999"
                                        value={formData.phonenumber}
                                        onChange={handleInputChange}
                                        required
                                        className="border-gray-300 focus:border-slate-500 focus:ring-slate-500 pr-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={(checked: any) =>
                                            setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                                        }
                                        className="mt-0.5"
                                    />
                                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-slate-600 hover:text-slate-800 hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-slate-600 hover:text-slate-800 hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>
                            </div>

                            <Buttons
                                type="submit"
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Buttons>
                        </form>
                        {/* <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                            </div>
                        </div> */}
                        {/* <div className="grid grid-cols-2 gap-3">
                            <Buttons
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50 bg-transparent cursor-pointer"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await signIn("google", { callbackUrl: "/user/dashboard" });
                                }}
                            >
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </Buttons>
                            <Buttons variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent cursor-pointer">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                                Twitter
                            </Buttons>
                        </div> */}
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/user/login" className="font-medium text-slate-600 hover:text-slate-800 hover:underline">
                                Sign in here
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
