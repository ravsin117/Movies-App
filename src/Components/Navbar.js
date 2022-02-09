import React from 'react';
import Logo from '../logo.png'
import {Link} from 'react-router-dom'
function Navbar() {    
  return (
    <>
      <div className="border flex space-x-8 pl-12 items-center py-4">
        <img src={Logo}  className="w-[50px] md:w-[80px] "/>
        <Link to='/'className="text-blue-900 text-xl md:text-3xl font-bold">
          Movies
        </Link>
        <Link to='/favourites'className="text-blue-900 text-xl md:text-3xl font-bold">Favourites</Link>
      </div>
    </>
  ); 
}

export default Navbar;
