import { navigationMenu } from '../../siteconfig.json';
import Link from 'next/link';
import Image from 'next/image';
import line from '../images/line-bw.png';
import facebook from '../svgs/facebook.svg';
import instagram from '../svgs/instagram.svg';
import shortid from "shortid";

export default function MobileNav({ ...props }) {
  return (
    <nav style={{ position: 'fixed', width: '100vw', height: '100%', backgroundColor: 'black', zIndex: '1000',  alignItems: 'center', display: props.state ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', top: '0px' }}>
      <div>
        <ul className='flex flex-col items-center mb-12 gap-3'>
          { navigationMenu.map(item => (
            <li key={ shortid.generate() } style={{ p: 0, justifyContent: 'center' }} onClick={ () => props.handleMenu(false) }>
              <Link href={ item.path } className='font-bold text-lg text-primary-content uppercase'>{ item.title }</Link>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="text-gray-500 text-xl font-bold mb-4">Connect with us</h3>
          <ul className='flex justify-center items-center gap-4'>
            <li>
              <a href="https://www.facebook.com/ganjanacup/">
              <Image
                priority
                src={ facebook }
                width={ 24 }
                alt="Follow us on Facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ganjanacup/">
              <Image
                priority
                src={ instagram }
                width={ 24 }
                alt="Follow us on Instagram" />
              </a>
            </li>
            <li>
              <a href="https://lin.ee/Nc0eINQ">
              <Image
                priority
                src={ line }
                width={ 25 }
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