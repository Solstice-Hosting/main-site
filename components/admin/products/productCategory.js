import { Button } from "@/components/ui/button";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"

  import PocketBase from "pocketbase";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Product, { NewProduct } from "./product";

export default function ProductCategory({category}) {
    const router = useRouter();
    const pb = new PocketBase("https://pb.solsticehosting.co.uk");
    const deleteProduct = async (id) => {
        try {
            await pb.collection('products').delete(id);
            router.reload();
        }
        catch (err) {
            alert('Something dun-goofed');
        }
    }

    return (
        <div>
        <h2 className="text-white font-bold text-3xl mt-8">{category.categoryName}</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
            {category.products.length > 0 ? (
                category.products.map(product => (
                  <Product product={product} category={category} key={product.id} />  
                ))
            ) : (
                <p className="text-white">No products available</p>
            )}
            <NewProduct />
        </div>
    </div>
    )
}