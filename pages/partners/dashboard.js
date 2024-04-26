import Header from "@/components/main/Header";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function PartnerDashboard() {
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [adminAccount, setAdminAccount] = useState(false);
    const [partnerInfo, setPartnerInfo] = useState([]);
    
    useEffect(() => {
        if (pb.authStore.isValid) {
            
            if (pb.authStore.isAdmin) {
                setAdminAccount(true);
            }
            setAuthenticated(true);
        }
        else {
            router.push('/login');
        }
    }, [authenticated, pb, router]);

    useEffect(() => {
        if (authenticated === true) {
            if (!adminAccount) {            
                const getPartnerInfo = async () => {
                const authData = await pb.collection('users').authRefresh();
                console.log(authData.record.id);
                const gettingPartnerInfo = await pb.collection('partners').getFullList({
                    filter: `account ~ "${pb.authStore.model.id}"`
                });
                if (gettingPartnerInfo.length > 0) {
                    setPartnerInfo(gettingPartnerInfo);
                }
                else {
                    router.push('/partners');
                }
            };
            getPartnerInfo();
        }

        }
    }, [authenticated]);


    return (
        <>
            <Header />
            <main className="min-h-screen w-screen bg-gray-950 flex gap-8 flex-col p-24">
                <Suspense fallback="Loading...">
                    {partnerInfo.length > 0 && (
                    <>
                        <div className="w-10/12 flex flex-col gap-6">
                            <h1 className="text-white font-extrabold text-4xl">Edit your Partnership Information</h1>
                        </div>
                        <div className="flex flex-col gap-8 text-white">
                            {partnerInfo.map((partner) => (
                                <PartnerComp key={partner.id} partner={partner} />
                            ))}
                        </div >
                    </>)}
                </Suspense>
            </main>
        </>
    )
}


function PartnerComp({ key, partner }) {
    const pb = new PocketBase("https://pb.solsticehosting.co.uk");
    const [partnerName, setPartnerName] = useState('');
    const [memoInfo, setMemoInfo] = useState('');
    const [site, setSite] = useState('');
    const [discord, setDiscord] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => {
        console.log(partner);
        setPartnerName(partner.title);
        setMemoInfo(partner.memo);
        setSite(partner.site);
        setDiscord(partner.discord);
    }, [partner]);

    const saveChanges = async () => {
        const tryToUpdate = await pb.collection('partners').update(partner.id, {
            "title": partnerName,
            "memo": memoInfo,
            "site": site,
            "discord": discord,
            "logo": partner.logo,
        });

        if (!tryToUpdate.code) {
            setStatus('success');
            setTimeout(() => {setStatus('')}, 1500);
        }
        else {
            setStatus(tryToUpdate.message);
        }
    };

    return (
        <>
            <div className="w-full bg-gray-800 min-h-content rounded-lg border-2 border-gray-700 p-4 flex flex-col gap-8">
                <div className="flex w-full justify-between items-center">
                    <input
                        className="bg-gray-700 rounded-lg text-white outline-none p-4 text-2xl font-extrabold w-1/2 border-2 border-gray-600"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                    />
                    <span className="text-gray-400 font-semibold">
                        <span className="font-normal">Partner Id:</span> {partner.id}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-bold">Memo</span>
                    <textarea
                        value={memoInfo}
                        onChange={(e) => { setMemoInfo(e.target.value) }}
                        className="bg-gray-700 rounded-lg text-white outline-none p-4 min-h-[16rem] border-2 border-gray-600"
                    >

                    </textarea>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-bold flex gap-4 items-center">Website <span className="font-normal text-gray-400">(optional)</span></span>
                        <input
                            className="bg-gray-700 rounded-lg p-4 text-white w-full outline-none border-2 border-gray-600"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-bold flex gap-4 items-center">Discord Invite <span className="font-normal text-gray-400">(optional)</span></span>
                        <input
                            className="bg-gray-700 rounded-lg p-4 text-white w-full outline-none border-2 border-gray-600"
                            value={discord}
                            onChange={(e) => setDiscord(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full justify-between">
                    <div></div>
                    <Button onClick={saveChanges} className={`${!status ? 'bg-gray-900' : (status === 'success' ? 'bg-green-600' : 'bg-red-400')} transition-all duration-200`}>
                    {!status ?
                        'Save Changes'
                    : ( status === 'success' ?
                        'Success!'
                    : `${success}`
                    )}
                    </Button>
                </div>
            </div>
        </>
    );
}


async function fetchImageBlob(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching image blob:', error);
      throw error;
    }
  }