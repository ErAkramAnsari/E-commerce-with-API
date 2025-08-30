import axios from 'axios';
import './App.css';
import Category from './Category';
import { useEffect, useState } from 'react';

function App() {
let [finalCategory,setFinalCategory]=useState([])
let [finalProduct, setFinalProduct]=useState([])
let [catName, setCatName]=useState('')

  let getCategory=()=>{
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>res.data)
    .then((finalRes)=>{
    setFinalCategory(finalRes)
    })
  }

  let getProducts=()=>{
    axios.get('https://dummyjson.com/products')
    .then((proRes)=>proRes.data)
    .then((finalRes)=>{
     setFinalProduct(finalRes.products)
    })
  }

  useEffect(()=>{
    getCategory();
    getProducts();
  },[])

  useEffect(()=>{
    if(catName!==""){
     axios.get(`https://dummyjson.com/products/category/${catName}`)
    .then((proRes)=>proRes.data)
    .then((finalRes)=>{
     setFinalProduct(finalRes.products)
    })
    }
  },[catName])

  let pItems=finalProduct.map((products, index)=>{  
    console.log(products) 
    return(
       <ProductItem key={index} pdata={products} />
    )
  })
  return (
     <>
     <div className='py-[40px]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-center text-[40px] font-bold mb-[30]'>OUR   PRODUCTS  </h1>
         <div className='grid grid-cols-[30%_auto] gap-[20px]'>
           <div>
             
            <Category finalCategory={finalCategory}  setCatName={setCatName} />  
           </div>

           <div>
             <div className='grid grid-cols-3 gap-4'>
                 {finalProduct.length>=1 ? pItems :    <center className='text-[red] text-[25px] font-bold p-[200px]'>"No_Product_Found...!"</center>} 
                   
             </div>
           </div>
         </div>
      </div>
     </div>
     </>
  );
}

export default App;
 
function ProductItem({pdata}) {
  return(
    <div className='shadow-lg text-center pb-4'>
      <img src={pdata.thumbnail} />
        <h4>{pdata.title}</h4>
        <b>Rs.{pdata.price+1000}</b>
    </div>
  )
  
}