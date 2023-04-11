import { navigationMenu } from '../../siteconfig.json';
import Link from 'next/link';
import shortid from "shortid";

export default function MobileNav({ ...props }) {
  return (
    <nav  style={{ position: 'fixed', top: '64px', width: '100vw', height: '100%', backgroundColor: 'black', zIndex: '100',  alignItems: 'center', display: props.state ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center' }}>
      <div>
        <ul>
          { navigationMenu.map(item => (
            <li key={ shortid.generate() } style={{ p: 0, justifyContent: 'center' }} onClick={ () => props.handleMenu(false) }>
              <Link href={ item.path } className="link" style={{ color: 'white', fontSize: '24px !important' }}>{ item.title }</Link>
            </li>
          ))}
        </ul>
        <div>
          <h3>Connect with us</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/ganjanacup/">
                {/* <Facebook /> */}
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ganjanacup/">
                {/* <Instagram /> */}
              </a>
            </li>
            {/* <li><img src={ Line } style={{ width: '32px', height: '32px'}} /></li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}