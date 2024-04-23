import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Dedicated() {
    const router = useRouter();

    useEffect(() => {
        router.push('/store/dedicated');
    })
    return (
        <>          
            <div className="w-screen h-screen bg-gray-950">

            </div>
        </>
    )
}