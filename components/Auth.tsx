"use client"

import { FaGoogle } from "react-icons/fa"
import { usePathname, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Buttons } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowLeft, User, Building, Shield } from "lucide-react"
import Link from "next/link"

export default function Auth() {
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        username: "",
        profession: "",
        specailid: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const path = usePathname()
    const router = useRouter()
    const role = path.includes("/admin") ? "admin" : "user"
    const isSignup = path.includes("/signup")

    const handleRedirect = () => {
        const target = isSignup ? "signin" : "signup"
        router.push(`/auth/admin/${target}`)
    }
    const handleChange = (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            profession: value,
        }))
    }
    async function handleSubmit(e: any) {
        const target = isSignup ? "signup" : "signin"
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`/api/admin/${target}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            })
            const data = await res.json()
            console.log("data = ",data);
            if (res.ok) {
                localStorage.setItem("token", data.token)
                router.push("/admin/users")
            } else {

            }
        } catch (e: any) {

        } finally {
            setIsLoading(false)
        }
    }

    const getRoleIcon = () => {
        if (role === "admin") return <Shield className="w-5 h-5" />
    }

    const getRoleLabel = () => {
        if (role === "admin") return "Admin"
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <div className="text-center mb-6">
                    <Link href="/">
                        <h1 className="text-3xl font-black text-slate-800">HiringNexus</h1>
                    </Link>
                    <p className="text-gray-600 mt-2">
                        {isSignup ? "Create your account and start your journey!" : "Welcome back! Please sign in to continue."}
                    </p>
                </div>

                <Card className="shadow-lg border-0">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {getRoleIcon()}
                            <span className="text-sm font-medium text-slate-600">{getRoleLabel()} Portal</span>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center text-slate-800">
                            {isSignup ? "Create Account" : "Sign In"}
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            {isSignup
                                ? `Join HiringNexus as ${role === "admin" ? "an administrator" : "a user"}`
                                : `Access your ${role} dashboard`}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* {path.includes("/admin/signup") && (
                                <div className="space-y-2">
                                    <Label htmlFor="specailid" className="text-slate-700 font-medium">
                                        Admin Pass ID
                                    </Label>
                                    <Input
                                        id="specailid"
                                        name="specailid"
                                        type="text"
                                        placeholder="Enter your admin pass ID"
                                        value={formdata.specailid}
                                        onChange={handleChange}
                                        className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                    />
                                </div>
                            )} */}
                            {isSignup && (
                                <>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-slate-700 font-medium">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                value={formdata.name}
                                                onChange={handleChange}
                                                required
                                                className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="username" className="text-slate-700 font-medium">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="johndoe"
                                                value={formdata.username}
                                                onChange={handleChange}
                                                required
                                                className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-medium">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={role === "admin" ? "admin@hiringnexus.com" : "user@example.com"}
                                    value={formdata.email}
                                    onChange={handleChange}
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
                                        placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                                        value={formdata.password}
                                        onChange={handleChange}
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
                            {isSignup && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="phonenumber" className="text-slate-700 font-medium">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phonenumber"
                                            name="phonenumber"
                                            type="tel"
                                            placeholder="+91 9876543210"
                                            value={formdata.phonenumber}
                                            onChange={handleChange}
                                            required
                                            className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                        />
                                    </div>

                                    {/* <div className="space-y-2">
                                        <Label htmlFor="profession" className="text-slate-700 font-medium">
                                            Profession
                                        </Label>
                                        <Select value={formdata.profession} onValueChange={handleSelectChange}>
                                            <SelectTrigger className="border-gray-300 focus:border-slate-500 focus:ring-slate-500">
                                                <SelectValue placeholder="Select your profession" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="student">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        Student
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="fresher">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        Fresher
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="senior">
                                                    <div className="flex items-center gap-2">
                                                        <Building className="w-4 h-4" />
                                                        Senior Professional
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                </>
                            )}

                            <Buttons
                                type="submit"
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 mt-6 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? isSignup
                                        ? "Creating Account..."
                                        : "Signing In..."
                                    : isSignup
                                        ? "Start Your Journey"
                                        : "Sign In"}
                            </Buttons>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Separator />
                        <div className="text-center text-sm text-gray-600">
                            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button
                                className="font-medium text-slate-600 hover:text-slate-800 hover:underline cursor-pointer"
                                onClick={handleRedirect}
                            >
                                {isSignup ? "Sign in here" : "Create a new account"}
                            </button>
                        </div>
                    </CardFooter>
                </Card>
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>
                        By {isSignup ? "creating an account" : "signing in"}, you agree to our{" "}
                        <Link href="/terms" className="text-slate-600 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-slate-600 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
