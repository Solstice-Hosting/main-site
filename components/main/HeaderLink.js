import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderLink = React.memo(({ category }) => {
    const path = usePathname();
    const initialSlug = `${category.slug}`;
    
    return (
        <li className={`hover:text-gray-50 transition-all duration-200 cursor-pointer z-100 ${path === category.slug && 'font-bold'}`}>
            <Link href={initialSlug} prefetch={false}>
                {category.name}
            </Link>
        </li>
    );
});

HeaderLink.displayName = 'HeaderLink';

export default HeaderLink;
