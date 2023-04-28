import { useState } from 'react';
import {navigationMenu} from '../../siteconfig.json';
import Link from 'next/link';
import Image from 'next/image';
import shortid from "shortid";
import { useEffect } from 'react';

export default function MobileNav({ ...props }) {
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const onResize = (entries) => {
      const { width } =  entries[0].contentRect;
      if (width >= 1024) {
        return setLarge(true)
      }
      return setLarge(false)
    }
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    }
  }, [])
  return (
    <nav className='bg-primary' style={{ position: 'fixed', width: '100vw', height: '100%', zIndex: '1000',  alignItems: 'center', display: props.state ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', top: '0px' }}>
      <div>
        {
          !large ? 
          <ul className='flex flex-col items-center mb-12 gap-3'>
            { navigationMenu.map(item => (
              <li key={ shortid.generate() } style={{ p: 0, justifyContent: 'center' }} onClick={ () => props.handleMenu(false) }>
                <Link href={ item.path } className='font-normal text-lg text-primary-content uppercase'>{ item.title }</Link>
              </li>
            ))}
          </ul> : null
        }
        <div>
          <h3 className="text-gray text-xl font-bold text-secondary-content mb-4">Get in Touch</h3>
          <ul className='flex justify-center items-center gap-4'>
            <li>
              <a href="https://www.facebook.com/ganjanacup/">
              <Image
                priority
                src='/facebook.svg'
                width={ 28 }
                height={ 28 }
                alt="Follow us on Facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ganjanacup/">
              <Image
                priority
                src='/instagram.svg'
                width={ 28 }
                height={ 28 }
                alt="Follow us on Instagram" />
              </a>
            </li>
            <li>
              <a href="https://lin.ee/Nc0eINQ">
              <Image
                priority
                src='/line-bw.png'
                width={ 29 }
                height={ 29 }
                alt="Follow us on Line" />
              </a>
            </li>
            {/* <li><img src={ Line } style={{ width: '32px', height: '32px'}} /></li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}