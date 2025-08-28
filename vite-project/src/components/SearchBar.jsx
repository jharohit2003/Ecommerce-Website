import React, { useContext, useEffect  } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search ,setSearch ,showSearch , setShowSearch}= useContext(ShopContext) ;
    const [visible,setVisible] = useState(false);
    const location = useLocation();
    useEffect(()=>{
    if(location.pathname.includes('collection') && showSearch){
      setVisible(true);
    }else{
        setVisible(false);
    }
    },[location ,showSearch])
  return showSearch && visible ? (
    <div>
      <div className='border border-b bg-gray-50 text-center'>
           <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <img src={assets.search_icon} className='w-4' alt="" />
           </div>
           <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
      </div>
    </div>
  ):null
}

export default SearchBar
