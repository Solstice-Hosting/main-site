import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import AdminNavbar from "@/components/admin/AdminNavbar";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductCategory from "@/components/admin/products/productCategory";

export default function Admin() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(null);
    const [currentSearch, setCurrentSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const pb = new PocketBase('https://pb.solsticehosting.co.uk');
        const gettingProducts = async () => {
            const gettingProducts = await pb.collection('products').getFullList({
                expand: 'category'
            });
            setProducts(gettingProducts);
            setFilteredProducts(gettingProducts); // Initialize filtered products
        }
        if (pb.authStore.isAdmin) {
            gettingProducts();
            setAuthenticated(true);
        }
        else {
            router.push('/admin/login');
        }
    }, []);

    // Group products by category
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const { category } = product;
        if (!acc[category]) {
            acc[category] = {
                categoryName: product.expand.category.categoryName,
                categoryTagline: product.expand.category.categoryTagline,
                products: [],
            };
        }
        acc[category].products.push(product);
        return acc;
    }, {});

    // Handle search input change
    const handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        setCurrentSearch(searchQuery);
        // Filter products based on search query
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <>
        {authenticated && (
            <>
                <Head>
                    <title>Products - Solstice Admin</title>
                </Head>
                <Header />
                <AdminNavbar />
                <main className="min-h-screen w-screen bg-gray-950 flex justify-center gap-8">
                    <div className="w-10/12 p-12 flex flex-col gap-6">
                        <h1 className="text-white font-extrabold text-4xl">Edit Products</h1>
                        <div className="bg-gray-500 flex items-center rounded-lg overflow-hidden">
                            <FontAwesomeIcon icon={faSearch} className="text-white p-6" />
                            <input 
                                value={currentSearch}
                                onChange={handleSearchChange}
                                className="outline-none bg-gray-500 text-white font-semibold h-full w-full"
                            />
                        </div>
                        {/* Render each category as a section */}
                        <div className="w-full flex justify-center">
                        <div className="w-11/12">
                            {Object.values(groupedProducts).map((category, index) => (
                                <ProductCategory 
                                key={index}
                                category={category}
                                />
                            ))}
                        </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )}
        </>
    );
}
