import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PocketBase from "pocketbase";
import Link from "next/link";
import { useRouter } from "next/router";

// Dropdown component
const Dropdown = ({ title, children, isOpen, onClick }) => (
  <div className="group relative">
    <motion.span
      className="text-white font-semibold cursor-pointer select-none"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {title}
    </motion.span>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute bg-gray-700 mt-5 w-[12rem] rounded-b-lg border-2 border-gray-600 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'fit-content' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function AdminNavbar() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
    
  useEffect(() => {
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');
    const fetchNavbarData = async () => {
        const navbarData = await pb.collection('admin_nav').getFullList();
        setNavItems(navbarData);
        console.log(navbarData);
    }


      if (pb.authStore.isAdmin) {
          setAuthenticated(true);
          fetchNavbarData();
      }
      else {
          router.push('/admin/login');
      }
  }, [])





  const handleDropdownClick = (dropdown) => {
    setOpenDropdown(dropdown === openDropdown ? null : dropdown);
  };

  return (
    <>
      {authenticated === true && (
      <div className="relative z-30">
        <div className="w-full bg-gray-800 h-[4rem] flex justify-center items-center gap-4" style={{ zIndex: 30 }}>
            <div className="w-11/12 flex items-center gap-12">


            {navItems.length > 0 && navItems.map((item) => (
                <Dropdown
                key={item.id}
                title={item.name}
                isOpen={openDropdown === item.id}
                onClick={() => handleDropdownClick(item.id)}
              >
                <ul className="py-2">
                {item.items.map((dropItem, index) => (
                  <motion.li className="text-white cursor-pointer hover:bg-gray-600 px-4 py-2"
                  key={index}
                  onClick={() => router.push(dropItem.link)}
                  >
                  <span className="w-full h-full">{dropItem.name}</span>
                </motion.li>

                ))}

                </ul>
              </Dropdown>
            ))}
            </div>
        </div>
      </div>
      )}
    </>
  );
}
