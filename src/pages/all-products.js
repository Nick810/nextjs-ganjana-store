import Link from 'next/link'
import Image from 'next/image';
import { request } from '../../lib/datocms';
import shortid from "shortid";
import Filter from '@/components/filter';
import { useAppContext } from '@/context';

const imgStyle = {
  bottom: 0,
  height: '100%',
  left: 0,
  margin: 0,
  maxWidth: 'none',
  padding: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%',
  objectFit: 'cover',
}

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
      console.log(item)
      const { otherProps } = item;
      const product = () => ( 
        <li key={ shortid.generate() } className='cursor-pointer flex'>
          <Link href={ `/product/${ item.slug }` } className='relative flex-1'>
            <div className="overflow-hidden relative">
              <div className="pt-[100%]"></div>
              {
                item.image ? <Image src={{ ...item.image.responsiveImage }} priority alt="" style={ imgStyle } /> : null
              }
            </div>
            <div className='pt-3 pb-3'>
              <p className={ `text-sm ${item.availability ? 'text-success' : 'text-error'}` }>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
              { item.otherProps ? <p className='text-sm text-secondary-content font-normal'>{ item.otherProps.strainType } | THC: { item.otherProps.cannabiniod.thc }%</p> : null }
              <h3 className='text-md font-bold text-primary'>{ item.name }</h3>
            </div>
            {
              <button 
                className="border-2 border-primary-content rounded-[50%] flex p-2 top-[-16px] right-[-16px] absolute bg-primary z-[150]"
                >
                  <Image src='/basket.svg' width={ 24 } height={ 24 } priority alt="" />
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
      <div className='main__layout min-h-screen'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-3xl mb-4 text-primary font-bold lg:text-4xl'>All Products</h1>
          <button className='btn bg-primary text-primary-content' onClick={ setShowFilter }>Filter</button>
        </div>
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-5'>
          { renderProducts() }
        </ul>
      </div>
      <Filter growers={ allGrowers } categories={ new Set(data.categories.map(item => item.category)) } />
    </div>
  )
}

export async function getStaticProps() {
  const ALLPRODUCTS_QUERY = `
    query AllProductsPage {
      categories: allProducts {
        category
      }
      allProducts(filter: {inCollection: {notMatches: {pattern: "New Drop"}}, category: {matches: {pattern: "Flowers|Seeds"}}}, first: "60", orderBy: _createdAt_DESC) {
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