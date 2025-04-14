"use client"
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function Signup() {
    const path = usePathname();
    const router = useRouter();
    console.log("path = ",path);
    const handleRedirect = () => {
        console.log("hmlo insede the fuccc");
        if (path.includes('/admin/signup')) {
            router.push('/auth/admin/signin')
        } else if (path.includes('/user/signup')) {
            router.push('/auth/user/signin')
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-4">

                <h1 className="text-xl font-semibold text-center">Welcome to HirngNexus</h1>
                <h4 className="font-bold text-center">Create a New Account</h4>
                {/* <h4 className="text-sm text-center text-gray-600"></h4> */}
                <div className="flex justify-center space-x-6 text-2xl text-gray-600 cursor-pointer">
                    <FaGoogle />
                    <FaGithub />
                </div>

                <p className="text-sm text-gray-500 text-center">
                    We recommend you to make an account with GitHub
                </p>

                <form className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl focus:outline-none focus:ring-2"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl focus:outline-none focus:ring-2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl focus:outline-none focus:ring-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl focus:outline-none focus:ring-2"
                    />
                    <input
                        type="text"
                        name="phonenumber"
                        placeholder="Phone Number"
                        className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl focus:outline-none focus:ring-2"
                    />

                    <div>
                        <label htmlFor="profession" className="text-sm text-gray-500 block mb-1">
                            Select your profession
                        </label>
                        <select
                            id="profession"
                            name="profession"
                            className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl bg-white focus:outline-none focus:ring-2"
                            defaultValue=""
                        >
                            <option value="" disabled>Select your profession</option>
                            <option value="fresher">Fresher</option>
                            <option value="student">Student</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl transition duration-200 focus:outline-none"
                    >
                        Start Your Journey
                    </button>
                </form>

                <div className="text-center">
                    <span className="text-gray-600 text-sm">Already have an account?</span>
                    <div className="text-blue-600 font-semibold ml-1 hover:underline cursor-pointer"
                        onClick={handleRedirect}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
