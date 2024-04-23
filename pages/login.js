import loginMiddleware from "@/middleware/loginMiddleware";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import PocketBase from "pocketbase";

export default function Login() {
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setProperError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [info, setInfo] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleLoginPress = async () => {
    
        try {
            const authData = await pb.collection('users').authWithPassword(
                username,
                password
            );
            if (authData?.token) {
                setSuccess("Logged in successfully");
                setTimeout(() => router.push('/dashboard'), 1500);
            }
        } catch (err) {
            if (err.message.includes('403')) {
                setProperError("Incorrect username or password.");
                setInfo(null);
            } else {
                setProperError("An error occurred during login, please try again.");
                console.log(err);
                setInfo(null);
            }
        }
    }
    

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="w-screen h-screen bg-gray-950 lg:p-8">
                <div className="w-full h-full bg-gradient-to-bl from-purple-500 to-orange-400  flex justify-center items-center lg:p-12 lg:rounded-3xl">
                    <div className="w-full md:w-1/2 backdrop-blur-3xl bg-gray-50 bg-opacity-10 rounded-lg py-8 ring-2 ring-gray-100/[.16] flex flex-col items-center justify-evenly gap-16 shadow-2xl lg:px-12 ">
                        <Image src="/assets/solstice.svg" alt="Solstice Logo" width={200} height={100} />
                        <div className="w-full flex flex-col justify-center items-center gap-4">
                            {error && (<div className="w-3/4 py-4 p-8 bg-gradient-to-l from-red-800 to-red-600 rounded-lg text-white font-bold shadow-2xl">{error}</div>)}
                            {info && (<div className="w-3/4 py-4 p-8 bg-gradient-to-l from-teal-800 to-teal-600 rounded-lg text-white font-bold shadow-2xl">{info}</div>)}
                            {success && (<div className="w-3/4 py-4 p-8 bg-gradient-to-l from-green-800 to-green-600 rounded-lg text-white font-bold shadow-2xl">{success}</div>)}

                            <input className="w-3/4 px-8 py-4 rounded-lg m-2 ring-2 bg-gray-50 bg-opacity-70  ring-gray-100/[.76] outline-none shadow-2xl" placeholder="Username or Email" id={`username`} onChange={(e) => setUsername(e.target.value)} value={username}></input>
                            <div className="w-3/4 m-2 bg-white ring-2 ring-gray-100/[.76] rounded-lg shadow-2xl overflow-hidden flex items-center gap-4">
                                <input className="w-full py-4 pl-6 rounded-r-lg ring-gray-100/[.76] outline-none" type={showPassword ? 'text' : 'password'} placeholder="Password" id={`password`} onChange={(e) => setPassword(e.target.value)} value={password}></input>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-6 w-6 text-gray-900 cursor-pointer mr-4" onClick={toggleShowPassword} />
                            </div>
                        </div>                        
                        <div className="w-full flex justify-center">
                            <button className="w-3/4 px-8 py-4 rounded-lg bg-gray-800  text-white outline-none font-bold shadow-2xl" onClick={handleLoginPress}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )   
}
