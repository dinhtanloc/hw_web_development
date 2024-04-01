"use client"
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewDetailProduct = ()=>{
    const params = useParams()
    const [product, setProduct] = useState(null)
    console.log(params)
    useEffect(()=>{
        getDetailProduct()
    },[])
    const getDetailProduct = async()=>{
        try {
            const res = await callAPI("/products/" + params.id, "GET")
            console.log(res)
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        product !== null?
            <div className="w-72 bg-white ">
            <a href="#">
            <img src={product.images[0]}
                alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">{product.brand}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{product.title}</p>
                <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                
                <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg></div>
                </div>
            </div>
            </a>
        </div>
        :
            <div>Sản phẩm không tìm thấy</div>
    )
}
export default ViewDetailProduct;