"use client"
import { FaGoogle, FaGithub } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

function Auth() {
    const path = usePathname();
    const router = useRouter();

    const role = path.includes('/admin') ? 'admin' : 'user';
    const isSignup = path.includes('/signup');

    const handleRedirect = () => {
        const target = isSignup ? 'signin' : 'signup';
        router.push(`/auth/${role}/${target}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-4">
                <h1 className="text-xl font-semibold text-center">Welcome Anon to HirngNexus</h1>
                {isSignup ? (
                    <h4 className="font-semibold text-center">Create a New Account</h4>
                ) : (
                    <h4 className="font-semibold text-center">Welcome Again Anon..!</h4>
                )}

                <div className="flex justify-center space-x-6 text-2xl text-gray-600">
                    <button
                        className="cursor-pointer"
                        onClick={async () => {
                            await signIn('google')
                        }}><FaGoogle /></button>
                    <button
                        className="cursor-pointer"
                        onClick={async () => {
                            await signIn('github')
                        }
                        }
                    >
                        <FaGithub />
                    </button>
                </div>

                {isSignup && (
                    <p className="text-sm text-gray-500 text-center">
                        We recommend you to make an account with GitHub
                    </p>
                )}

                <form className="space-y-4">
                    {path.includes('/admin/signup') && (
                        <input
                            type="text"
                            name="specailid"
                            placeholder="Enter PassId"
                            className="w-full border border-gray-300 text-black py-2 px-4 rounded-xl focus:outline-none focus:ring-2"
                        />
                    )}

                    {isSignup && (
                        <>
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
                        </>
                    )}

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

                    {isSignup && (
                        <>
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
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-blue-900 text-slate-200 cursor-pointer"
                    >
                        Start Your Journey
                    </button>
                </form>

                <div className="text-center">
                    <span className="text-gray-600 text-sm">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                    </span>
                    <button
                        className="text-blue-600 font-semibold ml-1 hover:underline cursor-pointer"
                        onClick={handleRedirect}
                    >
                        {isSignup ? "Login" : "Create a New Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Auth;
