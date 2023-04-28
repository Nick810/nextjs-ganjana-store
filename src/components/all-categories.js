import { useEffect, useState } from 'react';
import { request } from '../../lib/datocms';
import Loading from './loading';
import shortid from 'shortid';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/context';
import { useRouter } from 'next/router';

export default function AllCategories() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const { handleSetFilter } = useAppContext();
  const router = useRouter();
  const handleClick = (item) => {
    handleSetFilter(item);
    router.push('/all-products');
    return;
  }

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const ALLCATEGORIES = `
          query AllCategories {
            allUploads(filter: {tags: {eq: "category"}}) {
              responsiveImage(imgixParams: { fit: fill, auto: format }) {
                srcSet
                webpSrcSet
                sizes
                src
                width
                height
                aspectRatio
                alt
                title
                base64
              }
              title
            }          
          }`
        ;
        const data = await request({ query: ALLCATEGORIES }); 
        
        setData(data.allUploads);
      } catch(err) {
        setError(err.message);
      }
    }
    fetchCategories();
  }, [])
  
  return (
    <section className='pl-[5%]'>
      <div>
        <h2 className="text-3xl mb-4 text-primary font-bold md:mb-8 lg:text-4xl">All Categories</h2>
        <ul className="carousel rounded-box gap-0 lg:gap-4 overflow-y-hidden">
          {
            data ? 
              data.map((item, index) => (
                <li key={ index } style={{ filter: 'drop-shadow(4px 4px 0px rgb(246,216,96,.6))'}}>
                  <Link 
                    href="/all-products"
                    // onClick={ () => handleClick(item.title) }
                    key={ shortid.generate() }
                    className="card w-96 bg-base-100 image-full carousel-item relative" 
                    style={{ 
                      height: '132px',
                      maxWidth: '156px',
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', 
                      marginTop: index % 2 !== 0 ? '32px' : '0px',
                      cursor: 'pointer' }}>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2', zIndex: 1 }}></div>
                    <div className='grid place-items-center' style={{ height: 'inherit' }}>
                      <figure style={{ gridArea: '1 / 1'}}><Image src={{ ...item.responsiveImage }} alt="" priority /></figure>
                      <div className="card-body text-center justify-center" style={{ gridArea: '1 / 1'}}>
                        <h2 className="text-primary-content font-bold text-xl" style={{ zIndex: 2 }}>{ item.title }</h2>
                      </div>
                    </div>
                  </Link>
                </li>
            )) : <Loading />
          }
        </ul>
        { error ? <p>{ error }</p> : null }
      </div>
    </section>
  )
}