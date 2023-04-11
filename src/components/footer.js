import shortid from 'shortid';
import { navigationMenu } from '../../siteconfig.json'; 
import Image from 'next/image';
import Link from 'next/link';
import pin from '../svgs/pin_fill.svg';
import phone from '../svgs/phone_fill.svg';
import facebook from '../svgs/facebook.svg';
import instagram from '../svgs/instagram.svg';

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary text-base-content main__layout pt-4 pb-4">
      {/* <div className='divider'></div> */}
      <ul className='flex flex-col gap-3'>
        {
          navigationMenu.map(item => (
            <li key={ shortid.generate() }>
              <Link href={ item.path } className='font-bold text-md text-primary-content uppercase'>{ item.title.toLowerCase() }</Link>
            </li>
          ))
        }
      </ul>
      <div>
        <h3 className='font-bold text-primary-content text-2xl'>Our Location</h3>
        <ul className='flex flex-col gap-4'>
          <li key={ shortid.generate() }>
            <a href="/" className='flex flex-col justify-center items-center'>
              <Image
                priority
                src={ pin }
                alt="Visit us at 17/12 Kluai Mai Alley, Chorakhe Bua, Lat Phrao, Bangkok 10230" />
              <p className='text-primary-content'>17/12 Kluai Mai Alley, Chorakhe Bua, Lat Phrao, Bangkok 10230</p>
            </a>
          </li>
          <li key={ shortid.generate() }>
            <a href="/" className='flex flex-col justify-center items-center'>
              <Image
                priority
                src={ phone }
                className='mb-2'
                alt="Call us on 096-052-2070" />
              <p className='text-primary-content'>096-052-2070</p>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className='font-bold text-primary-content text-2xl'>Connect with us</h3>
        <ul className='flex justify-center gap-4'>
          <li key={ shortid.generate() }>
            <a href="https://www.facebook.com/ganjanacup/">
            <Image
              priority
              src={ facebook }
              width={ 24 }
              alt="Follow us on Facebook" />
            </a>
          </li>
          <li key={ shortid.generate() }>
            <a href="https://www.instagram.com/ganjanacup/">
              <Image
                priority
                src={ instagram }
                width={ 24 }
                alt="Follow us on Instagram" />
            </a>
          </li>
          <li key={ shortid.generate() }>
            <a href="https://lin.ee/Nc0eINQ">
              {/* <img src={ Line } alt="" /> */}
            </a>
          </li>
        </ul>
      </div>
      <ul className='flex justify-center gap-4'>
        <li key={ shortid.generate() }><Link href="/" className='text-xs'>terms of service</Link></li>
        <li key={ shortid.generate() }><Link href="/" className='text-xs'>privacy policy</Link></li>
      </ul>
      {/* <div className="divider"></div> */}
      <div>
        <p className="text-xs">{ `Copyright © ${ new Date().getFullYear() } - All right reserved by Ganjana Enterprise` }</p>
      </div>
    </footer>
  )
}