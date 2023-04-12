import { useState } from "react";
import Link from "next/link"
import { Sling as Hamburger } from 'hamburger-react';
import MobileNav from "./mobilenav";

export default function Header() {
  const [isHamburger, setHamburger] = useState(false);

  return (
    <>
      <header style={{ background: '#000', position: 'fixed', top: '0', left: '0', width: '100vw', zIndex: '2000' }} className="main__layout shadow-md">
        <div className="flex justify-between pt-3 pb-3">
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src='https://www.datocms-assets.com/95279/1678549877-ganjana_logo_only.png' style={{ width: '40px', height: '40px' }} alt="" />
          </Link>
          <div style={{ display: 'flex', color: 'white', alignItems: 'center', cursor: 'pointer' }} onClick={ () => setHamburger(!isHamburger) }>
            { isHamburger ? null : 'Menu' }
            <Hamburger toggled={ isHamburger } onToggle={ setHamburger } color="#fff" size={ 24 } />
          </div>
        </div>
      </header>
      <MobileNav state={ isHamburger } handleMenu={ setHamburger } />
    </>
  )
}