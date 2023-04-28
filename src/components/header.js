import { useState } from "react";
import Link from "next/link"
import { Sling as Hamburger } from 'hamburger-react';
import MobileNav from "./mobilenav";
import DesktopMenu from "./desktop-menu";

export default function Header() {
  const [isHamburger, setHamburger] = useState(false);

  return (
    <>
      <header style={{ width: '100vw', zIndex: '2000' }} className="top-0 left-0 fixed main__layout shadow-sm shadow-primary lg:h-20 grid items-center bg-primary">
        <div className="grid grid-cols-2 lg:grid-cols-header-menu pt-3 pb-3">
          <Link href="/" className="cursor-pointer flex items-center">
            <img src='https://www.datocms-assets.com/95279/1678549877-ganjana_logo_only.png' style={{ width: '40px', height: '40px' }} alt="" />
          </Link>
          <DesktopMenu />
          <div className="flex items-center justify-end text-primary-content cursor-pointer" onClick={ () => setHamburger(!isHamburger) }>
            { isHamburger ? null : 'Menu' }
            <Hamburger toggled={ isHamburger } onToggle={ setHamburger } color="#f6d860" size={ 24 } className="cursor-pointer" />
          </div>
        </div>
      </header>
      <MobileNav state={ isHamburger } handleMenu={ setHamburger } />
    </>
  )
}