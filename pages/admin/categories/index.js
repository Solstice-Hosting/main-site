import Footer from "@/components/main/Footer"
import Header from "@/components/main/Header"
import { useEffect, useState } from "react"
import { log } from "@/utils/log";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faGlobe, faWhmcs } from "@fortawesome/free-solid-svg-icons";
import EditBlob from "@/components/admin/edit/editBlock";
import PocketBase from "pocketbase";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/admin/AdminNavbar";
import Head from "next/head";

export default function Edit() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [formData, setFormData] = useState({
        newCatName: "",
        solSlug: "",
        billingSlug: "",
        newCatWhamWord: "",
        newCatNameLong: "",
        newCatTagline: ""
    });

    useEffect(() => {
        const pb = new PocketBase('https://pb.solsticehosting.co.uk');
        const fetchData = async () => {
            try {
                if (pb.authStore.isAdmin) {
                    setAuthenticated(true);
                    const categories = await pb.collection('categories').getFullList();
                    setCategories(categories);
                } else {
                    router.push('/admin/login');
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
                // Handle error gracefully, maybe show a message to the user
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
      if (!e.target.value.includes('/')) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
      }
    };

    const confirmNewCategory = async () => {
        const { newCatName, solSlug, billingSlug, newCatWhamWord, newCatNameLong, newCatTagline } = formData;
        if (!newCatName || !solSlug || !billingSlug || !newCatWhamWord || !newCatNameLong || !newCatTagline) {
            console.error('All fields must be filled out.');
            return;
        }

        const pb = new PocketBase('https://pb.solsticehosting.co.uk');
        try {
            const update = await pb.collection('categories').create({
                categoryName: newCatName, slug: solSlug, billingSlug, categoryWhamWord: newCatWhamWord, categoryNameLong: newCatNameLong, categoryTagline: newCatTagline
            })
            if (update?.id) {
                router.reload()
            } else {
                console.error('Something went wrong.');
            }
        } catch (err) {
            console.error('Error creating new category:', err);
            // Handle error gracefully, maybe show a message to the user
        }
    }

    return (
        <>
            {authenticated && (
                <>
                    <Head>
                        <title>Categories - Solstice Admin</title>
                    </Head>
                    <Header />
                    <AdminNavbar />
                    <main className="min-h-screen w-screen bg-gray-950 flex justify-center gap-8">
                        <div className="w-10/12 p-12 flex flex-col gap-6">
                            <h1 className="text-white font-extrabold text-4xl">Edit Categories</h1>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {categories.length > 0 && categories.map((category, index) => (
                                        <EditBlob key={index} category={category} />
                                    ))}
                                    <Dialog>
                                        <DialogTrigger>
                                            <div className="w-full bg-gray-800 bg-opacity-40 border-2 border-dashed border-gray-700 cursor-pointer rounded-lg min-h-[6rem] flex justify-between items-center px-6 text-white">
                                                <span className="font-bold w-full text-center text-lg flex gap-4 items-center justify-center">
                                                    <FontAwesomeIcon icon={faCirclePlus}/>  New Category
                                                </span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[800px]">
                                            <DialogHeader>
                                                <DialogTitle>Create Category</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-4 py-4">
                                                <div className="w-full flex flex-col gap-2">
                                                    <Input
                                                        id="newCatName"
                                                        placeholder="Category Name"
                                                        value={formData.newCatName}
                                                        onChange={handleChange}
                                                    />
                                                    <Input
                                                        id="solSlug"
                                                        placeholder="Main Site Slug"
                                                        value={formData.solSlug}
                                                        onChange={handleChange}
                                                    />
                                                    <Input
                                                        id="newCatWhamWord"
                                                        placeholder="Category WHAM Word"
                                                        value={formData.newCatWhamWord}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="w-full flex flex-col gap-2">
                                                    <Input
                                                        id="newCatNameLong"
                                                        placeholder="Category Name Long"
                                                        value={formData.newCatNameLong}
                                                        onChange={handleChange}
                                                    />
                                                    <Input
                                                        id="billingSlug"
                                                        placeholder="WHMCS Slug"
                                                        value={formData.billingSlug}
                                                        onChange={handleChange}
                                                    />
                                                    <Input
                                                        id="newCatTagline"
                                                        placeholder="Category Tagline"
                                                        value={formData.newCatTagline}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" onClick={confirmNewCategory}>Create Category</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
                        </div>
                    </main>
                    <Footer />
                </>
            )}
        </>
    )
}
