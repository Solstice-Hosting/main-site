import Footer from "@/components/main/Footer"
import Header from "@/components/main/Header"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import PocketBase from "pocketbase";
import AdminNavbar from "@/components/admin/AdminNavbar"

export default function Admin() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const pb = new PocketBase('https://pb.solsticehosting.co.uk');
        if (pb.authStore.isAdmin) {
            setAuthenticated(true);
        }
        else {
            router.push('/admin/login');
        }
    }, [])

    return (
        <>
        {authenticated && (<>
            <Header />
            <AdminNavbar />
            <main className="min-h-screen w-screen bg-gray-950">

            </main>
            <Footer />
        </>)}
        </>
    )
}