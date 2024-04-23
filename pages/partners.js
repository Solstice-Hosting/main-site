import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import Head from "next/head";

export default function PartnerPage() {
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
            </main>
            <Footer />
        </>
    )
}