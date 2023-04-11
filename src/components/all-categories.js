import { useEffect, useState } from 'react';
import { request } from '../../lib/datocms';
import Loading from './loading';
import shortid from 'shortid';
import Image from 'next/image';

export default function AllCategories() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const ALLCATEGORIES = `
          query AllCategories {
            allProducts {
              category
            }
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
    <section style={{ paddingLeft: '5%' }} className='mb-4 mt-4'>
      <div>
        <h2 className="text-4xl mb-4  text-primary font-bold">All Categories</h2>
        <ul className="carousel rounded-box gap-0">
          {
            data ? 
              data.map((item, index) => (
              <li 
                key={ shortid.generate() }
                className="card w-96 bg-base-100 shadow-xl image-full carousel-item" 
                style={{ 
                  height: '132px',
                  maxWidth: '156px',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', 
                  marginTop: index % 2 !== 0 ? '32px' : '0px' }}>
                <figure><Image src={{ ...item.responsiveImage }} alt="" priority /></figure>
                <div className="card-body text-center justify-center">
                  <h2 className="text-primary-content font-bold text-xl">{ item.title }</h2>
                </div>
              </li>
            )) : <Loading />
          }
        </ul>
        { error ? <p>{ error }</p> : null }
      </div>
    </section>
  )
}