import { navigationMenu } from '../../siteconfig.json';
import Link from 'next/link';
import Image from 'next/image';
import shortid from "shortid";

export default function MobileNav({ ...props }) {
  return (
    <nav className='bg-primary' style={{ position: 'fixed', width: '100vw', height: '100%', zIndex: '1000',  alignItems: 'center', display: props.state ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', top: '0px' }}>
      <div>
        <ul className='flex flex-col items-center mb-12 gap-3'>
          { navigationMenu.map(item => (
            <li key={ shortid.generate() } style={{ p: 0, justifyContent: 'center' }} onClick={ () => props.handleMenu(false) }>
              <Link href={ item.path } className='font-normal text-lg text-primary-content uppercase'>{ item.title }</Link>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="text-gray text-xl font-bold mb-4">Connect with us</h3>
          <ul className='flex justify-center items-center gap-4'>
            <li>
              <a href="https://www.facebook.com/ganjanacup/">
              <Image
                priority
                src='/facebook.svg'
                width={ 32 }
                height={ 32 }
                alt="Follow us on Facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ganjanacup/">
              <Image
                priority
                src='/instagram.svg'
                width={ 32 }
                height={ 32 }
                alt="Follow us on Instagram" />
              </a>
            </li>
            <li>
              <a href="https://lin.ee/Nc0eINQ">
              <Image
                priority
                src='/line-bw.png'
                width={ 33 }
                height={ 33 }
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