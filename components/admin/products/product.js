import { Button } from "@/components/ui/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
import { useEffect, useState } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


export default function Product(props) {
    const router = useRouter();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productId, setProductId] = useState('');

    useEffect(() => {
        setProductName(props.product.name);
        setProductPrice(props.product.price);
        setProductId(props.product.id);
    }, [])

    return (
        <div key={props.product.id} className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 border-2 border-gray-700">
                        <div className="w-full flex justify-between">
                            <h3 className="text-white font-semibold text-xl">{productName}</h3>
                            <p className="text-gray-200 font-bold">£{parseFloat(productPrice).toFixed(2)}/month</p>
                        </div>
                        <ul className="text-gray-400">
                            {props.product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <div className="w-full flex gap-2">
                            <Button className="w-11/12" onClick={() => router.push(`/admin/products/edit/${productId}`)}>Edit</Button>
                        
                            <Dialog>
                                <DialogTrigger asChild><Button className="aspect-square" variant="destructive"><FontAwesomeIcon icon={faTrash} /></Button></DialogTrigger>
                                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                    <DialogHeader>
                                    <DialogTitle className="text-white">Are you absolutely sure?</DialogTitle>
                                    <DialogDescription className="text-gray-300">
                                        This action cannot be undone. This will permanently delete the product entitled: <code>{productName}</code>.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex gap-4 w-full p-4">
                                        <DialogClose asChild><Button variant="destructive" className="w-full" onClick={() => deleteProduct(props.product.id)}>Confirm Deletion of <span className="font-bold pl-1"> {productName}</span></Button></DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
    )
}


export function NewProduct() {
    return (
        <div className="h-full col-span-1 bg-gray-800 border-4 border-dashed border-gray-700 rounded-lg cursor-pointer">
            <div className="w-full h-full flex justify-center items-center gap-4 text-white text-xl select-none">
                <FontAwesomeIcon icon={faCirclePlus} /> <span className="font-semibold">Add New</span>
            </div>
        </div>
    )
}