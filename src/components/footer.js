import shortid from 'shortid';
import { navigationMenu } from '../../siteconfig.json'; 
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary text-base-content main__layout" style={{ paddingTop: '2rem', paddingBottom: '2rem', rowGap: 0, gap: '1rem' }}>
      <div className='grid md:grid-cols-3 justify-items-center items-start md:mb-10 gap-6 md:gap-0'>
        <ul className='flex flex-col md:items-start md:border-l-2 gap-3 md:h-40'>
          {
            navigationMenu.map(item => (
              <li key={ shortid.generate() } className='md:pl-8'>
                <Link href={ item.path } className='font-normal text-md text-primary-content uppercase'>{ item.title.toLowerCase() }</Link>
              </li>
            ))
          }
        </ul>
        <div className='md:border-l-2'>
          <h3 className='font-bold text-2xl text-secondary-content md:hidden'>Our Location</h3>
          <ul className='flex flex-col gap-4 md:pl-8 md:h-40'>
            <li key={ shortid.generate() }>
              <Link href="/" className='flex flex-col justify-center items-center md:items-start'>
                <Image
                  priority
                  width={ 40 }
                  height={ 40 }
                  src='/pin_fill.svg'
                  alt="Visit us at 17/12 Kluai Mai Alley, Chorakhe Bua, Lat Phrao, Bangkok 10230" />
                <p className='font-normal text-primary-content md:text-left'>17/12 Kluai Mai Alley, Chorakhe Bua, Lat Phrao, Bangkok 10230</p>
              </Link>
            </li>
            <li key={ shortid.generate() }>
              <Link href="/" className='flex flex-col justify-center md:items-start items-center'>
                <Image
                  priority
                  src='/phone_fill.svg'
                  width={ 24 }
                  height={ 24 }
                  className='mb-2'
                  alt="Call us on 096-052-2070" />
                <p className='font-normal text-primary-content'>096-052-2070</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className='md:border-l-2 md:h-40'>
          <h3 className='font-bold text-2xl text-secondary-content md:hidden mb-2'>Get in Touch</h3>
          <ul className='flex justify-center md:flex-col gap-4 md:pl-8'>
            <li key={ shortid.generate() }>
              <a href="https://www.facebook.com/ganjanacup/">
              <Image
                priority
                src='/facebook.svg'
                width={ 24 }
                height={ 24 }
                alt="Follow us on Facebook" />
              </a>
            </li>
            <li key={ shortid.generate() }>
              <a href="https://www.instagram.com/ganjanacup/">
                <Image
                  priority
                  src='/instagram.svg'
                  width={ 24 }
                  height={ 24 }
                  alt="Follow us on Instagram" />
              </a>
            </li>
            <li key={ shortid.generate() }>
              <a href="https://lin.ee/Nc0eINQ">
              <Image
                priority
                src='/line-bw.png'
                width={ 25 }
                height={ 25 }
                alt="Follow us on Line" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul className='flex justify-center gap-4'>
        <li key={ shortid.generate() }><Link href="/" className='text-xs'>terms of service</Link></li>
        <li key={ shortid.generate() }><Link href="/" className='text-xs'>privacy policy</Link></li>
      </ul>
      <div>
        <p className="text-xs text-secondary-content">{ `Copyright © ${ new Date().getFullYear() } - All right reserved by Ganjana Enterprise` }</p>
      </div>
    </footer>
  )
}