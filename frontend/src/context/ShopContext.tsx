import { createContext ,useEffect,useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
 // ponytail: any-typed context preserves the pre-migration untyped behaviour; give it a real value type when flipping strict on
 export const ShopContext= createContext<any>({});
 import axios from 'axios'

 const ShopContextProvider =(props)=>{
    const currency='$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const[cartItems,setCartItems] = useState({});
    const[token , setToken] = useState('')
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {
        if(!size){
        toast.error('Select Product Size');
        return;
    }
    let cartData = structuredClone(cartItems);
    

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = {  };
        cartData[itemId][size]=1;
    }

    setCartItems(cartData);
};

const getCartCount =()=>{
    let totalCount = 0;
    for(const items in cartItems){
        for( const item in cartItems[items]){
            try {
               
                totalCount += cartItems[items][item];
               
            } catch (error) {
                
            }
        }
    }
    return totalCount;
}
 const updateQuantity = async(itemId,size,quantity)=>{
  let cartData = structuredClone(cartItems);
  cartData [itemId][size]=quantity;
  setCartItems(cartData);
 }

 const getCartAmount = ()=>{
  let totalAmount = 0;
  for(const items in cartItems){
    let itemInfo = products.find((product)=> product._id===items);
    for(const item in cartItems[items] ){
        try {
            if(cartItems[items][item]>0){
                totalAmount += itemInfo.price * cartItems[items][item];
            }
        } catch (error) {
            
        }

    }
  }
  return totalAmount;
 }

 const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (!response.data.success) throw new Error(response.data.message)
      return response.data.products
    },
 })
 useEffect(()=>{
    if(!token && localStorage.getItem('token')){
         setToken(localStorage.getItem('token'))
    }
 },[])

    const value ={
        products,currency , delivery_fee , search,setSearch,showSearch,setShowSearch , cartItems , addToCart , getCartCount , updateQuantity , getCartAmount , navigate , backendUrl , setToken , token , setCartItems
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
 }
 export default ShopContextProvider;