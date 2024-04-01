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
            <div className="bg-white " style={{
                position:'relative',
                width:'100vw',
                height:'100vh'
            }}>
            <a href="#">
            <img src={product.image}
                alt="Product" style={{
                                    position:'absolute',
                                    top:'20vh',
                                    left:'10vw',
                                    height: '40vh',
                                    width: '25vw',
                                    // objectFit: 'cover',
                                    // borderRadius: '10px',
                                    // border: '2px solid blue'
                                }} />
                {/* <span className="text-gray-400 mr-3 uppercase text-xs" style={{
                    position:'absolute',
                    left:'300px'

                }}>{product.brand}</span> */}
                <p className="font-bold text-black truncate block capitalize" style={{
                    position:'absolute',
                    left:'700px',
                    top:'60px',
                    fontSize:'40px',
                    overflow:'hidden',
                    whiteSpace: 'nowrap',
                    }}>{product.title}</p>
                <div className="flex items-center" style={{
                    position:'absolute',
                    top:'150px',
                    left:'750px',
                    // fontSize:'40px',
                }}>
                <p className="text-black truncate block capitalize" style={{
                    position:'absolute',
                    textAlign:'center',
                    top:'60px',
                    fontSize:'20px'
                    }}>Category: {product.category}</p>
                <p className="text-lg font-semibold text-black cursor-auto my-3" style={{
                    fontSize:'40px',
                    marginRight:'10px'

                }}
                >${product.price}</p>
                
                <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                    fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg></div>

                <div style={{
                    position: 'absolute',
                    top:'100px'
                }}>
                    <input type='button' style={{
                        backgroundColor: 'red',
                        borderRadius:'5px',
                        border:'2px solid orange',
                        width: '150px',
                        fontSize:'20px',
                        fontWeight:'bold'


                    }} value={'Buy now'}>
                    </input>
                </div>

                <div style={{
                    position:'absolute',
                    top:'150px',
                    overFlow:'hidden',
                    whiteSpace: 'pre-line-break',
                    width:'500px',
                    fontSize:'20px'
                    
                    
                }}>
                    <span sttyle={{
                      

                    }}>{product.description}</span>
                </div>
                </div>
            </a>
        </div>
        :
            <div>Sản phẩm không tìm thấy</div>
    )
}
export default ViewDetailProduct;