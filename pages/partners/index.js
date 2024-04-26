import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { Button } from "@/components/ui/button";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PocketBase from "pocketbase";
import { Suspense, useEffect, useState } from "react";

export default function PartnerPage() {
    const [partners, setPartners] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const pb = new PocketBase("https://pb.solsticehosting.co.uk");
        const getPartners = async () => {
            const authData = await pb.collection('users').authRefresh();
            setUserId(authData?.record?.id);
            const partners = await pb.collection('partners').getFullList({
                filter: 'display = 1'
            });
            console.log(partners);
            setPartners(partners);
        }
        getPartners()
    }, []);
    
    return (
        <>
            <Head>
                <title>Partners - SolsticeHosting</title>
                <meta name="description" content="Our wonderful partners; quite literally the friends we've made along the way." />
                <meta name="keywords" content="partners, minecraft hosting, hosting, hosting partners, solstice hosting, solstice partner, partner with solstice" />
            </Head>
            <Header />
            <main className="min-h-[80vh] w-full bg-gray-950">
                    <div className="flex flex-col gap-2 items-center p-4 lg:p-10 text-center">
                        <h1 className="font-extrabold text-5xl text-gray-100 whitespace-nowrap">
                            <span className="hidden lg:block">Our</span>
                            <span className="bg-gradient-to-r from-orange-400 transition-all duration-200 to-purple-500 bg-clip-text text-transparent hover:saturate-150 hover:to-orange-400 hover:from-purple-500">
                                Partners
                            </span>
                        </h1>
                        <span className="text-2xl text-gray-50">All of the friends we&apos;ve made along the way.</span>
                    </div>
                    <div
                        className="flex flex-col gap-10 px-10"
                    >
                    <Suspense placeholder="Loading..">{partners.length > 0 && partners.map((partner) => (
                        <div key={partner.id} className="flex flex-col lg:flex-row gap-4 lg:gap-12 items-center justify-start bg-gray-900 rounded-lg p-8 my-2">
                            <Image 
                                src={`https://pb.solsticehosting.co.uk/api/files/partners/${partner.id}/${partner.logo}?thumb=250x250`}
                                width="250"
                                height="250"
                                className="object-contain object-left drop-shadow-xl"
                                alt={partner.title}
                            />
                            <div className="w-full flex flex-col justify-between h-full items-start gap-4">
                                <h3 className="text-3xl font-extrabold text-white w-full flex gap-12 items-end">
                                    {partner.title}  {(partner.account).includes(userId) && (<span className="font-semibold text-gray-400 text-lg italic"> Pssst... this is you!</span>)}
                                </h3>
                                <p className="w-full whitespace-pre-wrap text-white">
                                    {partner.memo}
                                </p>
                                <div className="flex gap-4">
                                    {partner.site &&
                                    (<Link href={`${partner.site ? partner.site : ''}`} target="_blank">
                                        <Button className="bg-gray-800 hover:bg-gray-700 h-full w-40">
                                            View Site
                                        </Button>
                                    </Link>)}
                                    {partner.discord &&
                                    (<Link href={`${partner.discord ? partner.discord : ''}`} target="_blank">
                                        <Button className="h-12 w-12 bg-gray-800 hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faDiscord} />
                                        </Button>
                                    </Link>)}
                                </div>
                            </div>
                        </div>
                    ))}</Suspense>

                    <span className="w-full text-white font-semibold text-center text-2xl py-4 mb-8">Want to become a partner? Reach out on <Link href={'https://discord.gg/tgMFqC9EzY'} target="_blank" className="font-extrabold italic">our discord</Link></span>
                    </div>
            </main>
            <Footer />

        </>
    )
}