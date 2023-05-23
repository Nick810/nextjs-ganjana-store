import { useEffect, useState } from 'react';
import { request } from '../../lib/datocms';
import Image from 'next/image';
import Link from 'next/link';
import shortid from "shortid";
import { Blurhash } from 'react-blurhash';

export default function AllProducts() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllProducts = async() => {
      try {
        const ALLPRODUCTS_QUERY = `
          query AllProducts($limit: IntType) {
            allProducts(filter: {inCollection: {notMatches: {pattern: "New Drop"}}}, first: $limit, orderBy: _createdAt_DESC) {
              availability
              name
              image {
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
                url
              }
              otherProps
              description
              video {
                thumbnailUrl
                url
                title
              }
              slug
            }
          }`
        ;
        const data = await request({
          query: ALLPRODUCTS_QUERY,
          variables: { limit: 10 }
        });

        setData(data)
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAllProducts();
  }, [])

  return (
    <section className='pl-[5%] mb-4 mt-4'>
      <div className='flex justify-between items-center md:mb-4 pr-[2.5%] lg:pr-[5%]'>
        <h2 className="text-3xl text-primary font-bold lg:text-4xl">All Flowers</h2>
        <Link href="/all-products" className="flex justify-end text-primary items-center text-sm font-bold gap-1">
          see all products
          <Image src='/arrow-long-right.svg' width={ 32 } height={ 32 } priority alt="" className="translate-y-1"/>
        </Link>
      </div>
      <ul className='carousel gap-5 pt-4'>
        {
          data ? data.allProducts.map((item) => {
            const { cannabiniod, strainType } = item.otherProps;

            return (
              <li key={ shortid.generate() } className="carousel-item">
                <Link href={`product/${ item.slug }`} className='relative'>
                  { item.image ? 
                    <div className='overflow-hidden max-w-[240px] grid'>
                      <Blurhash
                        style={{ width: '100%', height: '100%', gridArea: "1/1" }}
                        hash="L02rjaay00oL%KfjM|f657j@?Gay"
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                      />
                      <Image src={{ ...item.image.responsiveImage }} alt="" className="fadeIn" style={{ gridArea: "1/1" }} />
                    </div> : null 
                  }
                  <div className='pt-1'>
                    <p className={ `text-xs ${item.availability ? 'text-success' : 'text-error'}` }>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
                    <p className='text-xs text-secondary-content'>{ strainType } | THC: { cannabiniod.thc }%</p>
                    <h3 className='text-primary'>{ item.name }</h3>
                  </div>
                  {
                    item.availability ? 
                    <button
                      className="border-2 border-primary-content rounded-[50%] flex p-2 top-[-16px] right-[-16px] absolute bg-primary z-[1500]"
                      >
                        <Image src='/basket.svg' width={ 24 } height={ 24 } priority alt="" />
                    </button> : null
                  }
                </Link>
              </li>
            )
          }) : null
        }
      </ul>
      { error ? <p>{ error }</p> : null }
    </section>
  )
}