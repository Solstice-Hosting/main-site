import { useEffect, useState } from 'react';
import HeaderLink from './HeaderLink';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { log } from '@/utils/log';
import Image from 'next/image';
import PocketBase from "pocketbase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


export default function Header({ categories }) {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [pulledHeadings, setPulledHeadings] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  const path = usePathname();

  useEffect(() => {
    // Handling header shrinking
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const pb = new PocketBase("https://pb.solsticehosting.co.uk");
    const pullHeadings = async () => {
      const records = await pb.collection('categories').getFullList({
        sort: '-created',
      });
      setHeadings(records);
      setPulledHeadings(true);
    };
    if (pb.authStore.isAdmin) {
      setAdminUser(true);
    }
    if (pb.authStore.isValid) {
      setAuthenticated(true);
    }
    pullHeadings();
  }, []);

  const scrolledDownClasses =
    path === '/'
      ? scrollY >= 275
        ? 'py-2 bg-gray-900'
        : 'py-8 bg-transparent'
      : 'py-2 bg-gray-900';

  return (
    <header
      className={`${scrolledDownClasses} w-full flex flex-col gap-4 lg:gap-0 lg:flex-row lg:px-16 justify-between items-center transition-all duration-300 ${
        path === '/' && 'lg:fixed lg:top-0 lg:left-0 lg:right-0'
      }`}
      style={{ zIndex: 60 }}
    >
      <Link href={'https://solsticehosting.co.uk'}><Image src="/assets/solstice.svg" alt="Solstice Logo" width={200} height={100} /></Link>
      <ul className='flex text-gray-200 gap-x-12 gap-y-2 items-center flex-wrap justify-center' style={{ zIndex: 60 }}>
        <HeaderLink special={true} category={{ name: 'Home', slug: '/' }} />
        {headings.map((heading, index) => (
          <HeaderLink key={index} category={{ name: heading.categoryName, slug: `/store/${heading.slug}` }} />
        ))}
        <HeaderLink category={{name: 'Partners', slug: '/partners'}} />
        {adminUser && (<>
          <HeaderLink category={{ name: 'Admin', slug: `/admin` }} />
        </>)}
        {authenticated && (<>
          <HeaderLink category={{ name: 'Dashboard', slug: `/dashboard` }} />
        </>)}

        {/* <Sheet>
          <SheetTrigger>
            <div className='text-xl text-white cursor-pointer'>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </SheetTrigger>
          <SheetContent style={{zIndex: 100}} className="bg-gray-950 border-gray-700 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Your Cart</SheetTitle>
              <SheetDescription className="text-gray-200">
                Here it is! A collection of all of the products that have caught your eye.
              </SheetDescription>
            </SheetHeader>
            <ul>
            </ul>
          </SheetContent>
        </Sheet>*/}
      </ul>
    </header>
  );
}
