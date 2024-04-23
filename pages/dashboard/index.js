import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const pb = new PocketBase('https://pb.solsticehosting.co.uk');
        if (pb.authStore.isValid) {
            setAuthenticated(true);
        }
        else {
            router.push('/login');
        }
    }, [])

    return (
        <>
            {authenticated && (
                <>
                    <Header/>
                    <main className="bg-gray-950 h-[80vh] w-screen text-white flex justify-center items-center flex-col">
                        <h1 className="text-3xl font-bold">Uh oh! You&apos;ve stumbled across a secret!</h1>
                        <span className="text-xl font-semibold">Use the navbar to return to safety.</span>
                    </main>
                    <Footer/>
                </>
            )}
        </>
    )
}