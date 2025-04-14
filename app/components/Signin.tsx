import { SiOnlyfans } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiAppleFill } from "react-icons/ri";
import Link from "next/link";

function Login() {
    return (
        <>
            <div className=" flex flex-col items-center ">
                <div className="shadow-md m-4 p-5 mt-12 ">
                    <div>"Welcome Again Anon..!"</div>
                    <h3>
                        "Let's explore the life again.."
                    </h3>
                    <div className="flex flex-col mt-4 space-y-3 w-96 ">

                        <input
                            type="text"
                            placeholder="Username"
                            className="border-black text-black  py-2 px-4 rounded-2xl"
                        ></input>
                        <input
                            type="email"
                            placeholder="Email"
                            className="border-black text-black py-2 px-4 rounded-2xl"
                        ></input>
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-black text-black  py-2 px-4 rounded-2xl"
                        ></input>
                    </div>
                    <button>Start Your Journey</button>
                    <div className="flex space-x-1 mt-2">
                        <div>
                            <h3 className="text-1xl">Don't have an Account ?</h3>
                        </div>
                        <div>
                            <Link href="/auth/signup">
                                <span className="text-blue-900">Signup</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;