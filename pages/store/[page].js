import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import Header from "@/components/main/Header";
import { ShopCard, ShopSpecialCard } from "@/components/cards";
import Footer from "@/components/main/Footer";
import Head from "next/head";
import PocketBase from "pocketbase";

export default function StorePage() {
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [categoryInformation, setCategoryInformation] = useState(null);
    const [slug, setSlug] = useState(null);

    useEffect(() => {
        const pathname = window.location.pathname;
        const slug = pathname.substring(pathname.lastIndexOf('/') + 1);
        setSlug(slug);
        if (!slug) {
            console.error(`Category slug is empty or not provided.`);
            return;
        }
    }, []);

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                const newCategoryInformation = await pb.collection('categories').getFullList({
                    filter: `slug="${slug}"`
                });
                const newProducts = await pb.collection('products').getFullList({
                    filter: `category.id="${newCategoryInformation[0].id}"`,
                    sort: 'price',
                });
                setCategoryInformation(newCategoryInformation[0]);
                setProducts(newProducts);
                console.log(`Successfully pulled products for ${slug}`);
            } catch (error) {
                console.error(`An error occurred: ${error.message}`);
            }
        };

        if (slug) {
            fetchCategoryAndProducts();
        }
    }, [slug]);

    useEffect(() => {
        const handleRouteChange = (url) => {
            const newSlug = url.substring(url.lastIndexOf('/') + 1);
            setSlug(newSlug);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <>
            {categoryInformation && (
                <>
            <Suspense>
            {categoryInformation && 
            <Head>
                <title>{categoryInformation ? categoryInformation.categoryNameLong : 'Loading'} - SolsticeHosting</title>
                <meta name="description" content={categoryInformation && categoryInformation.metaDescription} />
                <meta name="keywords" content={categoryInformation && categoryInformation.keywords} />
            </Head>}
            </Suspense>
            <Header />
            <Suspense>
            <div className="w-full flex items-center p-12 flex-col bg-gray-950 gap-8">
                {categoryInformation && (
                    <div className="flex flex-col gap-2 items-center p-4 lg:p-10 text-center">
                        <h1 className="font-extrabold text-5xl text-gray-100 whitespace-nowrap">
                            <span className="hidden lg:block">{categoryInformation.categoryWhamWord}</span>
                            <span className="bg-gradient-to-r from-orange-400 transition-all duration-200 to-purple-500 bg-clip-text text-transparent hover:saturate-150 hover:to-orange-400 hover:from-purple-500">
                                {categoryInformation.categoryNameLong}
                            </span>
                        </h1>
                        <span className="text-2xl text-gray-50">{categoryInformation.categoryTagline}</span>
                    </div>
                )}
                <div className="grid grid-cols-2 lg:grid-cols-8 gap-24">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            ((index + 1) % 5 === 2) ? (
                                <ShopSpecialCard
                                    key={product.id}
                                    title={product.name}
                                    price={parseFloat(product.price).toFixed(2)}
                                    items={product.features}
                                    link={`https://billing.solsticehosting.co.uk/store/${categoryInformation?.billingSlug}/${product.itemId}`}
                                />
                            ) : (
                                <ShopCard
                                    key={product.id}
                                    title={product.name}
                                    price={parseFloat(product.price).toFixed(2)}
                                    items={product.features}
                                    link={`https://billing.solsticehosting.co.uk/store/${categoryInformation?.billingSlug}/${product.itemId}`}
                                />
                            )
                        ))
                    ) : (
                        <main className="bg-gray-950 h-screen w-screen" />
                    )}
                </div>
            </div>
            </Suspense>
            <Footer />
            </>)}
        </>
    );
}
