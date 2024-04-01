
"use client";
import Header from "@/components/header";
import ModalAddProduct from "@/components/modal-component";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
 
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const onAddProductClick = ()=>{
    setOpenModal(true)
  }
  const closeModal = ()=>{
    setOpenModal(false)
  }
  const addProduct = (productName, price, oldPrice)=>{

    //còn 1 bước thêm dữ liệu vào database (phía backend) trước khi cập nhật giao diện
    const newProducts = [...products] //copy mang products => newProducts
    newProducts.push( {
      // brand: "Brand mặc định",
      productName: productName,
      price: price,
      oldPrice: oldPrice,
      imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=6",

    },)
    setProducts(newProducts)
    console.log(newProducts)
    closeModal();
  }
  const fetchData = async()=>{
    try {
      const res =  await callAPI("/products", "GET")
      console.log("bibi")
      console.log(res)
      console.log("bibi")
      console.log(res.data)
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <div className="relative w-[100vw] h-[100vh]" >
      <Header />
      <section id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {
            products.map((value, key)=>{
              return (
                <ProductComponent 
                  key = {key}
                  // brand={value.brand} 
                  productName={value.title} 
                  price={value.price} 
                  imageUrl={value.image}
                  id = {value.id} />
              )
            })
          }
      </section>
      {
        openModal&&<ModalAddProduct onClose={closeModal} onAdd={addProduct}/>
      }
      
      
      <button onClick={()=>onAddProductClick()} className="bottom-20 right-20 fixed  z-10 w-[50px] h-[50px] bg-blue-500 p-auto rounded-xl text-white justify-content-center justify-items-center"  type="button">+</button>
          
    </div>
  );
}
