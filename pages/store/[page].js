import { useRouter } from 'next/router';
import { useEffect, useState, Suspense } from 'react';
import Header from "@/components/main/Header";
import { ShopCard, ShopSpecialCard } from "@/components/cards";
import Footer from "@/components/main/Footer";
import Head from "next/head";
import PocketBase from "pocketbase";

function Loader() {
    return (
        <div className='h-[100vh] w-full bg-gray-950 content-[]'>

        </div>
    )
}

export default function StorePage() {
    const router = useRouter();
    const { page } = router.query;
    const [categoryInformation, setCategoryInformation] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            const pb = new PocketBase('https://pb.solsticehosting.co.uk');

            try {
                const newCategoryInformation = await pb.collection('categories').getFullList({
                    filter: `slug="${page}"`
                });
                const newProducts = await pb.collection('products').getFullList({
                    filter: `category.id="${newCategoryInformation[0].id}"`,
                    sort: 'price',
                });
                setCategoryInformation(newCategoryInformation[0]);
                setProducts(newProducts);
            } catch (error) {
                console.error(`An error occurred: ${error.message}`);
                // Handle error (e.g., show error message, redirect to error page)
            }
        };

        if (page) {
            fetchStoreData();
        }
    }, [page]);

    if (products?.length > 0) {
        return (
            <>
                <Head>
                    <title>{categoryInformation?.categoryNameLong} - SolsticeHosting</title>
                    <meta name="description" content={categoryInformation?.metaDescription} />
                    <meta name="keywords" content={categoryInformation?.keywords} />
                </Head>
                <Header />
                <div className="w-full flex items-center p-12 flex-col bg-gray-950 gap-8 min-h-screen">
                    <div className="flex flex-col gap-2 items-center p-4 lg:p-10 text-center">
                        <h1 className="font-extrabold text-5xl text-gray-100 whitespace-wrap">
                            <span className="hidden lg:block">{categoryInformation?.categoryWhamWord}</span>
                            <span className="bg-gradient-to-r from-orange-400 transition-all duration-200 to-purple-500 bg-clip-text text-transparent hover:saturate-150 hover:to-orange-400 hover:from-purple-500">
                                {categoryInformation?.categoryNameLong}
                            </span>
                        </h1>
                        <span className="text-2xl text-gray-50">{categoryInformation?.categoryTagline}</span>
                    </div>
                    <Suspense fallback={<Loader />}>
                        <div className="grid grid-cols-2 lg:grid-cols-8 gap-24">
                            {products?.map((product, index) => (
                                ((index + 1) % 5 === 2) ? (
                                    <ShopSpecialCard
                                        key={product?.id}
                                        title={product?.name}
                                        price={parseFloat(product?.price).toFixed(2)}
                                        items={product?.features}
                                        link={`https://billing.solsticehosting.co.uk/store/${categoryInformation?.billingSlug}/${product?.itemId}`}
                                    />
                                ) : (
                                    <ShopCard
                                        key={product?.id}
                                        title={product?.name}
                                        price={parseFloat(product?.price).toFixed(2)}
                                        items={product?.features}
                                        link={`https://billing.solsticehosting.co.uk/store/${categoryInformation?.billingSlug}/${product?.itemId}`}
                                    />
                                )
                            ))}
                        </div>
                    </Suspense>
                </div>
                <Footer />
            </>
        );
    }
}
