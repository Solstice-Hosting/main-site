import loginMiddleware from "@/middleware/loginMiddleware";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft, faChevronRight, faClose, faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import PocketBase from 'pocketbase';
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [username, setUsername] = useState("");
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setProperError] = useState(null);
    const [signupPage, setSignupPage] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [info, setInfo] = useState(null);
    const [success, setSuccess] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');

    const handleSignupPress = async () => {
        if (signupPage === 1) {
            if (acceptedTerms) {
                if (emailRegex.test(email) && password.length > 2 && username.length > 2) {
                    try {
                        const createUser = await pb.collection('users').create(
                            {
                                "username": username,
                                "email": email,
                                "password": password,
                                "passwordConfirm": passwordConfirm,
                                "forename": forename,
                                "surname": surname
                            }
                        );
                        if (createUser?.id) {
                            await pb.collection('users').requestVerification(email);
                            setSuccess("Successfully created your account! Sending to login.");
                            setInfo("Don't forget to verify your email.");
                            setTimeout(() => router.push('/login'), 1500);
                        }
                    }
                    catch (e) {
                        setProperError("An account with this email already exists.");
                    }
    
                }
                else {
                    setProperError(null);
                    setSuccess(null);
                    setInfo('Username, Password or Email invalid.')
                }
            }
            
            else {
                setProperError(null);
                setSuccess(null);
                setInfo('You must agree to the terms of service and privacy policy.')
            }
        }
        else {
            setSignupPage(signupPage + 1)
        }
    }

    const handleBackButton = async () => {
        setSignupPage(signupPage - 1);
    }
    

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="w-screen h-screen bg-gray-950 lg:p-8">
                <div className="w-full h-full bg-gradient-to-bl from-purple-500 to-orange-400  flex justify-center items-center lg:p-12 lg:rounded-3xl">
                    <div className="w-full md:w-1/2 backdrop-blur-3xl bg-gray-50 bg-opacity-10 rounded-lg py-8 ring-2 ring-gray-100/[.16] flex flex-col items-center justify-evenly gap-16 shadow-2xl lg:px-12 ">
                        <span className="flex flex-col items-center"><Image src="/assets/solstice.svg" alt="Solstice Logo" width={200} height={100} /> <span className="text-2xl font-bold text-white">Signup</span></span>
                        
                        <div className="w-full flex flex-col justify-center items-center gap-4">
                            {error && (<div className="w-3/4 py-4 p-8 bg-gradient-to-l from-red-800 to-red-600 rounded-lg text-white font-bold shadow-2xl">{error}</div>)}
                            {success && (<div className="w-3/4 py-4 p-8 bg-gradient-to-l from-green-800 to-green-600 rounded-lg text-white font-bold shadow-2xl">{success}</div>)}
                            {info && (<div className="w-3/4 py-4 p-8 bg-gradient-to-l from-teal-800 to-teal-600 rounded-lg text-white font-bold shadow-2xl">{info}</div>)}

                            {signupPage === 0 && (<>
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                    <label className="text-left min-w-[5rem] text-white font-semibold">Forename</label>
                                    <input className="w-full px-8 py-4 rounded-lg m-2 ring-2 bg-gray-50 bg-opacity-70  ring-gray-100/[.76] outline-none shadow-2xl" placeholder="Forename" id={`forename`} type="text" onChange={(e) => setForename(e.target.value)} value={forename} />
                                </div>                           
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                    <label className="text-left min-w-[5rem] text-white font-semibold">Surname</label>
                                    <input className="w-full px-8 py-4 rounded-lg m-2 ring-2 bg-gray-50 bg-opacity-70  ring-gray-100/[.76] outline-none shadow-2xl" placeholder="Surname" id={`surname`} type="text" onChange={(e) => setSurname(e.target.value)} value={surname} />
                                </div>
                                
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                    <label className="text-left min-w-[5rem] text-white font-semibold">Username</label>
                                    <input className="w-full px-8 py-4 rounded-lg m-2 ring-2 bg-gray-50 bg-opacity-70  ring-gray-100/[.76] outline-none shadow-2xl" placeholder="Username" id={`username`} onChange={(e) => setUsername(e.target.value)} value={username} />
                                </div>         
                            </>)}
                            {signupPage === 1 && (<>
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                        <label className="text-left min-w-[5rem] text-white font-semibold">Email</label>
                                        <input className="w-full px-8 py-4 rounded-lg m-2 ring-2 bg-gray-50 bg-opacity-70  ring-gray-100/[.76] outline-none shadow-2xl" placeholder="Email" id={`email`} type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                    <label className="text-left min-w-[5rem] text-white font-semibold">Password</label>
                                    <div className="w-full m-2 bg-white ring-2 ring-gray-100/[.76] rounded-lg shadow-2xl overflow-hidden flex items-center gap-4">
                                        <input className="w-full py-4 pl-6 rounded-r-lg ring-gray-100/[.76] outline-none" type={showPassword ? 'text' : 'password'} placeholder="Password" id={`password`} onChange={(e) => setPassword(e.target.value)} value={password} />
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-6 w-6 text-gray-900 cursor-pointer mr-4" onClick={toggleShowPassword} />
                                    </div>
                                </div>
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                    <label className="text-left min-w-[5rem] text-white font-semibold">Confirm</label>
                                    <div className="w-full m-2 bg-white ring-2 ring-gray-100/[.76] rounded-lg shadow-2xl overflow-hidden flex items-center gap-4">
                                        <input className="w-full py-4 pl-6 rounded-r-lg ring-gray-100/[.76] outline-none" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" id={`password`} onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-6 w-6 text-gray-900 cursor-pointer mr-4" onClick={toggleShowPassword} />
                                    </div>
                                </div>
                                <div className="w-3/4 flex gap-4 justify-center items-center">
                                    <div onClick={() => setAcceptedTerms(!acceptedTerms)} className={`${acceptedTerms ? 'bg-green-600' : 'bg-gray-900'} transition-all text-white w-8 h-8 p-2 flex items-center justify-center rounded-full text-white`}>
                                        <FontAwesomeIcon icon={acceptedTerms ? faCheck : faClose} />
                                    </div>
                                    <div>
                                        <span className="text-white">I have read and agree to the <Link href={'/terms'} className="font-bold">Terms of Service</Link> and <Link href={'/privacy.html'} className="font-bold">Privacy Policy</Link>.</span>
                                    </div>
                                </div>
                            </>)}
                            
                        </div>                        
                        <div className="w-full flex justify-center gap-4">
                            {signupPage === 0 && (
                            <>
                                <button className="w-full px-8 py-4 rounded-lg bg-gray-800  text-white outline-none font-bold shadow-2xl flex gap-12 items-center justify-center" onClick={handleSignupPress}>Next <FontAwesomeIcon icon={faChevronRight} /></button>
                            </>
                            )}
                            {signupPage === 1 && (
                            <>
                                <button className="w-1/4 px-8 py-4 rounded-lg bg-gray-800  text-white outline-none font-bold shadow-2xl flex gap-4 items-center justify-center" onClick={handleBackButton}><FontAwesomeIcon icon={faChevronLeft} />  Back</button>
                                <button className="w-3/4 px-8 py-4 rounded-lg bg-gray-800  text-white outline-none font-bold shadow-2xl flex gap-12 items-center justify-center" onClick={handleSignupPress}>Signup</button>
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )   
}
