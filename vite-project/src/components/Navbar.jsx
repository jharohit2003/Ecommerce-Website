import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
  const[visible,setVisible]= useState(false);
  
  const {setShowSearch ,getCartCount, navigate  , token , setToken , setCartItems} = useContext(ShopContext);
  const logout =()=>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
  }
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
     <Link to='/'> <img src={assets.logo}   className="w-48"  alt="" /></Link>
      <ul className="  sm:flex  gap-5 text-sm text-gray-700 hidden">
      <NavLink to='/' className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/collection' className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/about' className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/contact' className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      </ul>
      <div className="flex items-center gap-5">
      <img src={assets.search_icon} onClick={()=>setShowSearch(true)}  className="w-5 cursor-pointer" alt="no logo" />
     
      <div className='group relative'>
    <img onClick={()=>token? null:navigate('/login')}  src={assets.profile_icon}  className="w-5 cursor-pointer"alt="" />
    {/* Drop down Menu */}
    {
      token && 
      <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
      <div className='flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded '>
        <p className='cursor-pointer hover:text-black' >My Profile</p>
        <p onClick={()=>navigate('/orders')}  className='cursor-pointer hover:text-black'>Orders</p>
        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
      </div>
    </div>
    }
      </div>
      <Link to='/cart'className='relative'> 
      <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
      <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black aspect-square rounded-full text-[8px] text-white'>{getCartCount()}</p>
      </Link>
      <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${(visible)? 'w-full':'w-0'}`}>
  <div className='flex flex-col text-gray-600'>
    <div onClick={()=>setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
   <img src={assets.dropdown_icon} className='h-4 rotate-280' alt="" />
   <p>back</p>
    </div>
    <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
    <NavLink  onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
    <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border"  to="/about">About</NavLink>
    <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
  </div>
      </div>
    </div>

  )
}

export default Navbar

