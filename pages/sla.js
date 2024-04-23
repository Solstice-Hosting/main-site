/* eslint-disable react/no-unescaped-entities */


import Head from "next/head";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

export default function SLA() {
    return (
        <>
            <Head>
                <title>SLA - Solstice Hosting</title>
            </Head>
            <main className="bg-gray-950 min-h-screen">
                <Header />
                <div className="flex flex-col gap-2 items-center p-4 lg:p-10 text-center">
                    <h1 className="font-extrabold text-5xl text-gray-100 whitespace-nowrap"><span className="hidden lg:block">Read Our</span> <span className="bg-gradient-to-r from-orange-400 transition-all duration-200 to-purple-500 bg-clip-text text-transparent hover:saturate-150 hover:to-orange-400 hover:from-purple-500">Service License Agreement</span></h1>
                
                    <div className="pt-[4rem]">
                        <section class="flex align-center justify-evenly gap-8 text-white">
                        <div class="w-7/12 flex flex-col">
                            <h3 class="text-3xl font-bold">Foreword</h3>
                            Here at SolsticeHosting we understand that our services may on occasion face downtime, be unusuable, or be interrupted with a cause out of our control. We will compensate you for the delay caused from service outage on the occasion that it's a fault with our systems.

                            <br /><br />
                            <h3 class="text-3xl font-bold">Downtime</h3>
                            If the duration of interruption of your service exceeds one hour, you're entitled to 1% of the previous invoice paid for that service, given in the form of account credit, each hour. This has a maximum of 10% per separate outage.
                            Downtime from the product shall only be that of where we are the cause of the downtime and this downtime shall exclude reasonable maintenance, assistance to you or add-on services.
                            
                            The following downtime causes are not entitled to compensation:
                            <ul>
                                <li> - Acts of god.</li>
                                <li> - Unlawful activities by third parties or yourself.</li>
                                <li> - Downtime caused by Path.net, our DataCenter, or actions not covered by this SLA.</li>
                                <li> - Where our services are down due to DDoS attacks.</li>
                                <li> - Exceeding limits of your products, causing a suspension.</li>
                                <li> - Outages not caused by us.</li>
                            </ul>

                            <br /><br />
                            <p class="italic text-gray-500 mb-16">Last Updated: 03/04/2023 (DD/MM/YYYY)</p>
                        </div>
                    </section>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}