import { useEffect, useState } from 'react';
import { request } from '../../lib/datocms';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '../svgs/arrow-long-right.svg';
import Basket from '../svgs/basket.svg';
import shortid from "shortid";

export default function AllProducts() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllProducts = async() => {
      try {
        const ALLPRODUCTS_QUERY = `
          query AllProducts($limit: IntType) {
            allProducts(filter: {inCollection: {notMatches: {pattern: "New Drop"}}}, first: $limit) {
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
              price
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
    <section className='main__layout mb-4 mt-4'>
      <div className='flex justify-between items-center'>
        <h2 className="text-4xl text-primary font-bold">All Flowers</h2>
        <Link href="/all-products" className="flex justify-end text-primary font-bold">
          see all products
          <Image src={ ArrowRight } width={ 32 } priority alt="" className="ml-1"/>
        </Link>
      </div>
      <ul className='carousel gap-4 pt-4'>
        {
          data ? data.allProducts.map((item, index) => {
            const { cannabiniod, buyingOptions, strainType } = item.otherProps;

            return (
              // <li key={ shortid.generate() } style={{ marginTop: index % 2 !== 0 ? '32px' : '0px'}} className="carousel-item">
              <li key={ shortid.generate() } className="carousel-item">
                {/* <Link href={`product/${ item.slug }`} className='relative' style={{ transform: `translateY(${ (index * 10) + 16 }px)` }}> */}
                <Link href={`product/${ item.slug }`} className='relative' >
                  { item.image ? <div className='overflow-hidden' style={{ maxWidth: '160px', maxHeight: '160px' }}><Image src={{ ...item.image.responsiveImage }} alt="" priority /></div> : null }
                  <div>
                    <p style={{ fontSize: '.75rem !important', mb: 0, color: item.availability ? 'green' : 'red' }}>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
                    <p>{ strainType } | THC: { cannabiniod.thc }%</p>
                    <h4 className='text-primary font-bold'>{ item.name }</h4>
                    { item.price ? <p className='text-primary'>{ item.price.toLocaleString() }.-</p> : null }
                  </div>
                  {
                    item.availability ? 
                    <button 
                      className="snipcart-add-item"
                      style={{ border: '1px solid black', borderRadius: '50%', display: 'flex', padding: '4px', position: 'absolute', top: '-16px', right: '-16px', backgroundColor: '#fff', zIndex: '150'  }}
                      data-item-id={ item.name.replaceAll(' ', '-').toLowerCase() }
                      data-item-price={ item.price }
                      data-item-description={ item.description }
                      data-item-image={ item.image.url }
                      data-item-url="/"
                      data-item-name={ item.name }
                      data-item-custom1-name="Size"
                      data-item-custom1-options={ buyingOptions }
                      >
                        <Image src={ Basket } priority alt="" />
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