import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Input } from "@/components/ui/input";

export default function EditProduct() {
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(null);
    const [slug, setSlug] = useState(null);
    const [product, setProduct] = useState({});

    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (pb.authStore.isAdmin) {
            setAuthenticated(true);
        } else {
            router.push('/admin/login');
        }

        const pathname = window.location.pathname;
        const slug = pathname.substring(pathname.lastIndexOf('/') + 1);
        setSlug(slug);
        if (!slug) {
            console.error(`Category slug is empty or not provided.`);
            return;
        }
    }, []);

    useEffect(() => {
        const getProductInformation = async () => {
            if (slug) {
                const productInfo = await pb.collection('products').getOne(slug, {
                    expand: 'category'
                });

                console.log(productInfo);

                setProduct(productInfo);

                // Setting states.
                setProductName(productInfo.name);
                setCategoryName(productInfo.expand.category.categoryName);
                setCategoryId(productInfo.expand.category.id);

                const getCategories = await pb.collection('categories').getFullList({
                    filter: `id != '${productInfo.expand.category.id}'`,
                });
                console.log(getCategories);
                setCategories(getCategories);
            }
        };
        getProductInformation();
    }, [authenticated, slug]);

    return (
        <>
            {authenticated && (
                <>
                    <Header />
                    <AdminNavbar />
                    <main className="min-h-screen w-screen bg-gray-950 grid grid-cols-8 gap-4 grid-rows-6 p-8">
                        <div className="col-span-2 bg-gray-800 rounded-lg overflow-hidden flex flex-col">
                            <div className="bg-gray-900 w-full p-2 text-white px-4 font-semibold shadow-xl">
                                Product Information
                            </div>
                            <div className="p-4 flex flex-col gap-4">
                                <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
                                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="p-2 w-full bg-white rounded-md py-3 px-4 text-gray-700 text-sm">
                                    <option value={categoryId}>{categoryName}</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>{category.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </>
            )}
        </>
    );
}
