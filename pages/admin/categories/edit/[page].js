import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/main/Header";
import { ShopCard, ShopSpecialCard } from "@/components/cards";
import Footer from "@/components/main/Footer";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { log } from "@/utils/log";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import PocketBase from "pocketbase";



export default function EditStorePage() {
  const pb = new PocketBase('https://pb.solsticehosting.co.uk');
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categoryInformation, setCategoryInformation] = useState(null);
  const [slug, setSlug] = useState("");
  const [timeToFetchProducts, setTimeToFetchProducts] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [categoryId, setCategoryId] = useState(null);
  const [categoryWhamWord, setCategoryWhamWord] = useState("");
  const [categoryNameLong, setCategoryNameLong] = useState("");
  const [categoryTagline, setCategoryTagline] = useState('');

  const categoryNameLongInputRef = useRef(null);

  const [authenticated, setAuthenticated] = useState(false);
    
  useEffect(() => {
      if (pb.authStore.isAdmin) {
          setAuthenticated(true);
      }
      else {
          router.push('/admin/login');
      }
  }, [])



  useEffect(() => {
    const pathname = window.location.pathname;
    const slug = pathname.substring(pathname.lastIndexOf("/") + 1);

    setSlug(slug);
  }, []);

/*   useEffect(() => {
    const fetchInitialCategory = async () => {
      const pathname = window.location.pathname;
      const slug = pathname.substring(pathname.lastIndexOf("/") + 1);

      setSlug(slug);

      if (!slug) {
        log.severe(`Category slug is empty or not provided.`);
        return;
      }

      try {
        const response = await axios.get("/api/store/getCategory", {
          params: { category: slug },
        });

        if (response.status === 200) {
          setTimeToFetchProducts(true);
          setCategoryInformation(response.data.category[0]);
          setCategoryWhamWord(response.data.category[0].categoryWhamWord);
          setCategoryNameLong(response.data.category[0].categoryNameLong);
          setCategoryTagline(response.data.category[0].categoryTagline);
          setLoaded(true);
          log.success(
            `Successfully pulled category information for category ${slug}`
          );
        } else {
          throw new Error("Failed to fetch products.");
        }
      } catch (error) {
        log.severe(
          `An error occured while loading the category ${slug}: ${error.message}`
        );
        router.push("/");
      }
    };

    if (typeof window !== "undefined") {
      fetchInitialCategory();
    }
  }, [router]); */

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
            setCategoryId(newCategoryInformation[0].id);
            setCategoryWhamWord(newCategoryInformation[0].categoryWhamWord);
            setCategoryNameLong(newCategoryInformation[0].categoryNameLong);
            setCategoryTagline(newCategoryInformation[0].categoryTagline);
            setLoaded(true);
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

  useEffect(() => {}, [categoryInformation]);

  useEffect(() => {
    // Update input width based on content
    if (categoryNameLongInputRef.current) {
      categoryNameLongInputRef.current.style.width = `${
        categoryNameLongInputRef.current.scrollWidth
      }px`;
    }
  }, [categoryNameLong]);


  const handleSaveChanges = async () => {
    const update = await pb.collection('categories').update(categoryId, {
      categoryWhamWord, categoryNameLong, categoryTagline
    })
    if (update?.id) {
      router.push('/admin/categories');
    }
    else {
      alert('Something went wrong.');
    }
  }
  
  const handleDeleteCategory = async () => {
    try {
      await pb.collection('categories').delete(categoryId);
      router.push('/admin/categories');
    }
    catch (e) {
      alert('Something went wrong.');
    }
  }

  const hanleContainsProducts = async () => {
    alert("Can't delete, this category contains products.");
  }

  return (
    <>
      {loaded && authenticated === true && categoryInformation ? (
        <>
          <Head>
            <title>{categoryInformation.categoryNameLong} - SolsticeHosting</title>
          </Head>
          <Header />
          <div className="w-full flex items-center p-12 flex-col bg-gray-950 gap-8">
            <div className="w-full flex justify-between">
              <div className="bg-gray-500 text-white rounded-lg p-4 self-start cursor-pointer" onClick={() => router.push('/admin/categories')}>
                <span className="flex gap-4 items-center"><FontAwesomeIcon icon={faChevronLeft}/>Go Back</span>
              </div>
              <div className="flex gap-4 items-center h-[3rem]">
                <div className="bg-red-600 text-white rounded-lg p-4 self-end cursor-pointer h-full" onClick={products.length === 0 ? handleDeleteCategory : hanleContainsProducts}>
                  <span className="flex gap-4 items-center"><FontAwesomeIcon icon={faTrash}/></span>
                </div>
                <div className="bg-gray-500 text-white rounded-lg p-4 self-end cursor-pointer h-full flex items-center" onClick={handleSaveChanges}>
                  <span className="flex gap-4 items-center"><FontAwesomeIcon icon={faSave}/>Save Changes</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center p-4 lg:p-10 text-center">
              <input
                value={categoryWhamWord}
                onChange={(e) => setCategoryWhamWord(e.target.value)}
                className="font-extrabold text-5xl text-gray-100 whitespace-nowrap bg-transparent outline-none text-center"
              />
              <input
                ref={categoryNameLongInputRef}
                value={categoryNameLong}
                onChange={(e) => setCategoryNameLong(e.target.value)}
                className="font-extrabold text-5xl bg-gradient-to-r from-orange-400 to-purple-500 caret-white hover:to-orange-400 hover:from-purple-500 hover:saturate-150 whitespace-nowrap outline-none text-center bg-clip-text text-transparent max-w-fit"
              />
              <input
                value={categoryTagline}
                onChange={(e) => setCategoryTagline(e.target.value)}
                className="text-2xl text-gray-50 w-screen bg-transparent text-center outline-none"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-8 gap-24">
              {products.length > 0 ? (
                products.map((product, index) => {
                  if ((index + 1) % 5 === 2) {
                    return (
                      <EditShopSpecialCard
                        key={product.id}
                        title={product.name}
                        price={product.price.toFixed(2)}
                        items={product.features}
                        link={`https://billing.solsticehosting.co.uk/store/${categoryInformation.billingSlug}/${product.itemId}`}
                      />
                    );
                  } else {
                    return (
                      <EditShopCard
                        key={product.id}
                        title={product.name}
                        price={product.price.toFixed(2)}
                        items={product.features}
                        link={`https://billing.solsticehosting.co.uk/store/${categoryInformation.billingSlug}/${product.itemId}`}
                      />
                    );
                  }
                })
              ) : (
                <main className="bg-gray-950 h-screen w-screen" />
              )}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Head>
            <title>Loading - SolsticeHosting</title>
          </Head>
          <Header />
          <main className="bg-gray-950 h-screen w-screen"></main>
          <Footer />
        </>
      )}
    </>
  );
}

export function EditShopCard(props) {
  return (
    <div className='col-span-2 bg-gradient-to-r from-orange-400 to-purple-500 rounded-lg'>
      <div className='bg-white h-full w-full rounded-lg p-8 px-0 flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col gap-1 items-center'>
          <span className='text-3xl font-extrabold text-gray-900 pb-2'>{props.title}</span>
          <span className='text-lg font-semibold text-gray-700 pb-6'>£{props.price}/month</span>
        </div>
        <div className='flex flex-col gap-8 items-center'>
          <span className='flex flex-col w-full text-gray-700 px-20 font-medium gap-4 whitespace-nowrap'>
          {props.items && (props.items).map((item, index) => (
            <span className='flex gap-4 items-center whitespace-nowrap' key={index}>{item}</span>
          ))}
          </span>
          <button className='w-4/5 bg-gray-900 text-white py-2 rounded-lg transition-all duration-200 hover:font-semibold hover:scale-95' onClick={() => (props.link && window.open(props.link, '_blank'))}>{props.link ? 'Order' : 'Coming Soon'}</button>
        </div>
      </div>
    </div>
  )
}

export function EditShopSpecialCard(props) {
  return (
    <div className='col-span-2 p-2 bg-gradient-to-r from-orange-400 to-purple-500 transition-all duration-200 rounded-lg hover:saturate-150 hover:to-orange-400 hover:from-purple-500'>
    <div className='bg-white h-full w-full rounded-lg p-8 px-0 flex flex-col items-center gap-4'>
      <div className='w-full flex flex-col gap-1 items-center'>
        <span className='text-3xl font-extrabold text-gray-900 pb-2'>{props.title}</span>
        <span className='text-lg font-semibold text-gray-700 pb-6'>£{props.price}/month</span>
      </div>
      <div className='flex flex-col gap-6 items-center'>
        <span className='flex flex-col w-full text-gray-700 px-20 font-medium gap-4'>
        {props.items && (props.items).map((item, index) => (
            <span className='flex gap-4 items-center whitespace-nowrap' key={index}>{item}</span>
          ))}
        </span>
        <button className='w-4/5 bg-gray-900 text-white py-2 rounded-lg transition-all duration-200 hover:font-semibold hover:scale-95' onClick={() => (props.link && window.open(props.link, '_blank'))}>{props.link ? 'Order' : 'Coming Soon'}</button>
      </div>
    </div>
  </div>
  )
}