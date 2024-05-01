/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { productType } from '@/schema/orderSchema';
import { useCategoryStore, useProductStore } from '@/store/productStore';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button, buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: productType; }) {
  const router = useRouter();
  const { categories } = useCategoryStore((state) => ({ categories: state.categories }));
  const {deleteProduct} = useProductStore((state)=>({
    deleteProduct: state.deleteProduct  
  }))
  const [loading, setLoading] = React.useState(false);
  const {toast} = useToast()

  const handleEdit = () => {
    router.push(`/dashboard/addproduct?id=${product._id}`)
  }
  const handleDelete = async()=>{
    setLoading(true)
    const res = await deleteProduct(product._id)
    if(res){
      setLoading(false)
      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully",
      })
    }else{
      setLoading(false)
      toast({
        title: "Product Deletion Failed",
        description: "The product could not be deleted",
        variant:"destructive"
      })
    }

  }
  return (
    <div
      key={product._id}
      className="w-full drop-shadow-md h-[100px] max-sm:h-auto bg-white dark:bg-primary-foreground p-2 px-6 max-sm:px-2 rounded-md flex items-center max-sm:flex-col max-sm:justify-center relative"
    >
      <div className="w-[3%] flex justify-start max-sm:hidden">
        <Checkbox />
      </div>
      <div className="w-1/12 max-sm:w-full h-5/6 max-sm:h-auto flex justify-start ml-3 max-sm:ml-0">
        <img
          src={product.mainImage.url}
          className="h-full rounded-md"
          alt="product-image" />
      </div>
      <div className="w-3/12 max-sm:w-full h-full flex flex-col justify-start pt-2 pl-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <p className="font-semibold">{product.name}</p>
        <p className="max-sm:hidden">{product.description}</p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Price : </span>₹ {product.price}
        </p>
      </div>
      <div className="w-[11%] flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Stock : </span>
          {product.stock}
        </p>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full items-center max-sm:justify-start">
        <span className="sm:hidden pl-2 text-sm font-semibold">
          Category :{" "}
        </span>
        <div className="px-2 p-1 bg-yellow-50 dark:bg-yellow-700 rounded-md text-sm font-semibold">
          {categories[product.category]?.name}
        </div>
      </div>
      <div className="w-2/12 flex justify-center max-sm:w-full max-sm:inline">
        <p className="text-sm font-semibold">
          <span className="sm:hidden pl-2">Updated : </span>
          {new Date(product.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="w-1/12 flex justify-center max-sm:absolute max-sm:bottom-[10px] max-sm:right-[40px] gap-x-3">
        <Button size={"sm"} onClick={handleEdit}><div className='scale-150'><MdEdit/></div></Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
              <Button size={"sm"} variant={"destructive"} loading={loading} disabled={loading}><div className='scale-150'><MdDelete/></div></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='border-border'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className={cn(buttonVariants({variant:"destructive"}), "relative")}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}


export function ProductHeader() {
  return (
    <div className="w-full rounded-md flex items-center  p-3 px-6 sticky top-0 z-20 backdrop-blur-md max-sm:hidden">
      <div className="w-[3%] flex justify-start">
        <Checkbox />
      </div>
      <div className="w-1/12 flex justify-center">
        <p className="text-sm font-semibold">Image</p>
      </div>
      <div className="w-3/12 flex pl-6 justify-start">
        <p className="text-sm font-semibold">Details</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Price</p>
      </div>
      <div className="w-[11%] flex justify-center">
        <p className="text-sm font-semibold">Stock</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <p className="text-sm font-semibold">Category</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <p className="text-sm font-semibold">Last Updated</p>
      </div>
      <div className="w-1/12 flex justify-center">
        <p className="text-sm font-semibold">Actions</p>
      </div>
    </div>
  );
}

  
