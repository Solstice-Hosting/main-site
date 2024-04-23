import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";


export default function Footer() {
    return (
        <>
            <div className="w-full h-[1rem] bg-gradient-to-l transition-all duration-200 hover:saturate-150 from-orange-500 to-purple-500 content-[] shadow-lg hover:to-orange-500 hover:from-purple-500"></div>
            <div className="w-full bg-gray-700 flex justify-center items-center flex-col gap-4 pb-4">
                <div className="flex w-full lg:w-1/2 justify-evenly p-8">
                    <Link href={'/sla'} className="text-gray-200 font-semibold hover:text-gray-300">SLA</Link>
                    <Link href={'/privacy'} className="text-gray-200 font-semibold hover:text-gray-300">Privacy</Link>
                    <Link href={'/terms'} className="text-gray-200 font-semibold hover:text-gray-300">Terms</Link>
                    <Link href={'mailto:abuse@solsticehosting.co.uk'} className="text-gray-200 font-semibold hover:text-gray-300">Report Abuse</Link>
                </div>
                <div className="flex flex-col gap-4 justify-center items-center text-gray-300">
                    <div><span onClick={() => {window.open('https://alexx.work')}} className="  cursor-pointer font-semibold whitespace-nowrap">Site made with <FontAwesomeIcon icon={faHeart} /> by <span className="font-bold">Alexx</span></span></div>
                    <div className="flex flex-col justify-center items-center gap-1 text-center">
                        <span className="font-bold">Registered in England & Wales.</span>
                        <span> © 2024 Solstice Hosting LTD. All rights reserved.</span>
                        <span>
                            Company number: 
                            <span  className="underline cursor-pointer" onClick={() => window.open('https://find-and-update.company-information.service.gov.uk/company/14239303', '_blank')}> 14239303</span>.
                            <br className="lg:hidden"/> 
                            VAT number: 440669879 
                            <br className="lg:hidden"/> 
                            7 The Primroses, Bristol, England, BS13 0BG </span>
                    </div>
                    <Image src={'/assets/solstice.svg'} width="1000" height="1000" className="h-[3rem]" alt="Solstice Logo"/>
                </div>
            </div>
        </>
    )
}