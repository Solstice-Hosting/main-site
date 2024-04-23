import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight, faEdit, faGlobe, faSave, faSlash } from "@fortawesome/free-solid-svg-icons";
import { faWhmcs } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";

export default function EditBlob(props) {
    const pb = new PocketBase('https://pb.solsticehosting.co.uk');
    const router = useRouter();
    const [prevSolSlug, setPrevSolSlug] = useState('');
    const [prevBillingSlug, setPrevBilingSlug] = useState('');
    const [solSlug, setSolSlug] = useState('');
    const [billingSlug, setBilingSlug] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [categoryName, setCategoryName] = useState('');
    const [prevCategoryName, setPrevCategoryName] = useState('');

    useEffect(() => {
        setBilingSlug(props.category.billingSlug);
        setPrevBilingSlug(props.category.billingSlug);
        setSolSlug(props.category.slug);
        setPrevSolSlug(props.category.slug);
        setCategoryId(props.category.id);
        setPrevCategoryName(props.category.categoryName);
        setCategoryName(props.category.categoryName);
    }, [props]);

    const handleSolSlugChange = (e) => {
        const value = e.target.value;
        if (!value.includes('/')) {
            setSolSlug(value.replace('/',''));
        }
    }  

    const handleBillingSlugChange = (e) => {
        const value = e.target.value;
        if (!value.includes('/')) {
            setBilingSlug(value.replace('/',''));
        }
    }

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    }

    const handleSolSlugSave = async () => {
        const update = await pb.collection('categories').update(categoryId, {"slug": solSlug});
        if (update?.id) { 
            setPrevSolSlug(solSlug);
        }
        else {
            alert('something went wrong');
        }
    }

    const handleBillingSlugSave = async () => {
        const update = await pb.collection('categories').update(categoryId, {"billingSlug": billingSlug});
        if (update?.id) {
            setPrevBilingSlug(billingSlug);
        }
        else {
            alert('something went wrong.');
        }
    }

    const handleCategoryNameSave = async () => {
        const update = await pb.collection('categories').update(categoryId, {"categoryName": categoryName});
        if (update?.id) {
            setPrevCategoryName(categoryName);
        }
        else {
            alert('something went wrong.');
        }
    }


    const doNothing = () => {
        // na-da
    }

    const categoryNameClasses = (categoryName === prevCategoryName || categoryName === '') && 'hidden';
    const solSlugClasses = (solSlug === prevSolSlug || solSlug === '') && 'hidden';
    const billingSlugClasses = (billingSlug === prevBillingSlug || billingSlug === '') && 'hidden';

    return (
        <div className="w-full bg-gray-800 rounded-lg min-h-[6rem] flex justify-between items-center px-6 text-white border-2 border-gray-700">            
            <div className="font-bold flex gap-2 items-center w-full" style={{ display: 'flex' }} onClick={doNothing}>
                <input type={"text"} className="font-bold bg-transparent outline-none" value={categoryName} onChange={handleCategoryNameChange} />
                <FontAwesomeIcon icon={faSave} className={`text-gray-400 cursor-pointer ${categoryNameClasses}`}  onClick={handleCategoryNameSave}/>
            </div>
            <div className="font-bold flex gap-2 items-center w-full" style={{ display: 'flex' }}>
                <FontAwesomeIcon icon={faGlobe} className="text-gray-400"/>
                <span className="text-xl font-normal text-gray-600">/</span>
                <input type={"text"} className="font-mono bg-transparent outline-none" value={solSlug} onChange={handleSolSlugChange} />
                <FontAwesomeIcon icon={faSave} className={`text-gray-400 cursor-pointer ${solSlugClasses}`}  onClick={handleSolSlugSave}/>
            </div>
            <div className="font-bold flex gap-2 items-center w-full" style={{ display: 'flex' }}>
                <FontAwesomeIcon icon={faWhmcs} className="text-gray-400"/>
                <span className="text-xl font-normal text-gray-600">/</span>
                <input type={"text"} className="font-mono bg-transparent outline-none" value={billingSlug} onChange={handleBillingSlugChange} />
                <FontAwesomeIcon icon={faSave} className={`text-gray-400 cursor-pointer ${billingSlugClasses}`}  onClick={handleBillingSlugSave}/>
            </div>
            <div className="w-full flex justify-end cursor-pointer min-h-full items-center"  onClick={() => {router.push(`/admin/categories/edit/${props.category.slug}`)}}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    )
}
