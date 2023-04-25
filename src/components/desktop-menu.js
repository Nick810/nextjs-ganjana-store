import { navigationMenu } from '../../siteconfig.json';
import Link from 'next/link';
import shortid from 'shortid';

export default function DesktopMenu() {
  return (
    <nav className='hidden lg:flex items-center'>
      <ul className='flex gap-8'>
        { navigationMenu.map(item => (
          <li key={ shortid.generate() } style={{ p: 0, justifyContent: 'center' }}>
            <Link href={ item.path } className='font-medium text-md text-primary-content uppercase'>{ item.title }</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}