import Link from 'next/link'
import Image from 'next/image';
import { request } from '../../lib/datocms';
import shortid from "shortid";
import Filter from '@/components/filter';
import Basket from '../svgs/basket.svg';
import { useAppContext } from '@/context';

export default function AllProducts({ data }) {
  const { allProducts, allGrowers } = data;
  const { filter, setShowFilter } = useAppContext();
  const renderProducts = () => {
    const prouductLists = [];
    const getCultivators = (arr) => {
      if (arr) {
        const reg = new RegExp(filter.growers.join('|').replaceAll(' ', '').toLowerCase())
        return arr.find(item => item.replaceAll('-', '').replaceAll(' ', '').match(reg))
      }
    }

    for (const item of allProducts) {
      const { otherProps } = item;
      const product = () => ( 
        <li key={ shortid.generate() } className='border'>
          <Link href={ `/product/${ item.slug }` } className='relative'>
            {
              item.image ? 
              <div className='overflow-hidden' style={{ height: '210px' }}><Image src={{ ...item.image.responsiveImage }} priority alt="" className='min-h-48'/></div> : null
            }
            <div className='py-1 px-2 pb-3'>
              <p className={ `text-sm ${item.availability ? 'text-success' : 'text-error'}` }>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
              <p className='text-sm'>{ item.otherProps.strainType } | THC: { item.otherProps.cannabiniod.thc }%</p>
              <h3 className='text-primary'>{ item.name }</h3>
              { item.price ? <p className='text-primary font-bold'>{ item.price.toLocaleString() }.-</p> : null }
              {
                otherProps.cultivatedBy ? 
                <div>
                  { otherProps.cultivatedBy.map(item => (
                    <img 
                      src={ item } 
                      className='object-cover' 
                      alt="" 
                      loading="lazy" 
                      key={ shortid.generate() } 
                      style={{ maxWidth: '32px' }}/>
                  ))}
                </div> : null
              }
            </div>
            {
              <button 
                className="snipcart-add-item"
                style={{ border: '1px solid black', borderRadius: '50%', display: 'flex', padding: '4px', position: 'absolute', top: '-16px', right: '-16px', backgroundColor: '#fff', zIndex: '150'  }}
                data-item-id={ item.name.replaceAll(' ', '-').toLowerCase() }
                data-item-price={ item.price }
                data-item-description={ item.description }
                // data-item-image={ item.image.url ? item.image.url : '' }
                data-item-url="/"
                data-item-name={ item.name }
                data-item-custom1-name="Size"
                data-item-custom1-options={ otherProps.buyingOptions }
                >
                  <Image src={ Basket } priority alt="" />
              </button> ?? item.availability
            }
          </Link>
        </li>
      )

      if (filter.growers.length && getCultivators(otherProps.cultivatedBy)) {
        prouductLists.push(product());
      }

      if (!filter.growers.length) {
        prouductLists.push(product());
      }
    }

    return prouductLists;

  }

  return (
    <div className='pt-8 pb-8'>
      <div className='main__layout'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-4xl mb-4 text-primary font-bold'>All Products</h1>
          <button className='btn bg-primary' onClick={ setShowFilter }>Filter</button>
        </div>
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          { renderProducts() }
        </ul>
      </div>
      <Filter growers={ allGrowers } />
    </div>
  )
}

export async function getStaticProps() {
  const ALLPRODUCTS_QUERY = `
    query AllProductsPage {
      allProducts(filter: {inCollection: {notMatches: {pattern: "New Drop"}}}, first: "20") {
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
      allGrowers {
        name
      }
    }`
  ;
  const data = await request({ query: ALLPRODUCTS_QUERY });

  return {
    props: { data }
  }
}