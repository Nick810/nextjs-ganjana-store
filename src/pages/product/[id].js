import { request } from '../../../lib/datocms';
import Image from 'next/image';
import Basket from '../../svgs/basket.svg';
import Line from '../../images/line-wb.png';
import Messenger from '../../svgs/facebook-messenger.svg';
import Video from '@/components/video-clip';
import shortid from 'shortid';

const Product = ({ data }) => {
  const productData  = data.allProducts[0];
  const { availability, description, images, name, otherProps, price, video } = productData;
  const { availableSizes, buyingOptions, cannabiniod, cultivatedBy, feeling, flavor, strainType } = otherProps
  
  return (
    <div className='pt-8 pb-8'>
      <div className='text-center mb-8'>
        <h1 className='text-primary font-bold text-3xl mb-2'>{ name }</h1>
        <p className='text-primary'>{ description }</p>
      </div>
      { 
        video ? <Video 
          videoSrcURL={ `https://player.vimeo.com/video/${ productData.video.url.match(/\d+/g) }` }
          videoTitle={ productData.video.title }
        /> : null
      }
      {
        images ? images.map((item, index) => <div className='mb-4' key={ shortid.generate() }><Image src={{ ...item.responsiveImage }} priority alt="" /></div>): null
      }
      <div style={{ padding: '0 5%' }}>
        <div className='mb-4'>
          <p className='text-primary'>{ strainType } | THC:{ cannabiniod.thc }%</p>
        </div>
          <div>
            <h3 className='text-primary font-bold mb-2'>Cultivated by</h3>
            {
              cultivatedBy ? 
              <div className="flex gap-4">
                { cultivatedBy.map(item => (
                  <Image src={ item } alt="" key={ shortid.generate() } height={ 48 } width={ 48 } />
                ))}
              </div> : null
            }
          </div>
          { flavor.length || flavor ? 
            <>
              <div>
                <div className='divider'></div>
                <h3 className='text-primary font-bold mb-2'>Flavor</h3>
                <ul className='flex gap-4'>
                  {
                    flavor.map(item => (
                      <li key={ shortid.generate() } className='text-primary border p-2'>
                        { item }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </> : null 
          }
          { feeling.length || feeling ? 
            <>
              <div>
                <div className='divider'></div>
                <h3 className='text-primary font-bold mb-2'>Feeling</h3>
                <ul className='flex gap-4'>
                  {
                    feeling.map(item => (
                      <li key={ shortid.generate() } className='text-primary border p-2'>
                        { item }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </> : null 
          }
          <div style={{ marginBottom: '24px' }}>
            <div className='divider'></div>
            <h3 className='text-primary font-bold mb-2'>Available Sizes</h3>
            <ul style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              {
                Object.entries(availableSizes).map(item => (
                  <li key={ shortid.generate() } className='border pt-2 pb-2 pl-3 pr-3 text-primary'>{ `${ item[0] }g - ฿${ item[1].toLocaleString() }` }</li>
                ))
              }
            </ul>
          </div>
          <p className='text-primary mb-2'>*Select your desired size after adding item to cart</p>
          <div className='flex flex-col gap-4'>
            <button 
              className={ `snipcart-add-item ${ availability ? '' : 'sold-out' } text-primary-content bg-primary flex justify-center gap-2 pt-3 pb-3 pl-6 pr-6` }
              data-item-id={ name.replaceAll(' ', '-').toLowerCase() }
              data-item-price={ price }
              data-item-description={ description }
              // data-item-image={ image.url }
              data-item-url={ `/${ name.replaceAll(' ', '_').toLowerCase() }` }
              data-item-name={ name }
              data-item-custom1-name="Size"
              data-item-custom1-options={ buyingOptions }
              >
                { availability ? `Add to cart` : `Sold out` }
                <div className='bg-primary-content rounded-full'><Image src={ Basket } priority alt="" /></div>
                {/* <div style={{ border: '1px solid black', borderRadius: '50%', display: 'flex', padding: '2px' }}><Basket/></div> */}
            </button>
            <div className="flex gap-4">
              <a 
                href="https://lin.ee/Nc0eINQ" 
                className="border border-primary pt-3 pb-3 pl-6 pr-6 flex items-center justify-center gap-2 font-bold text-sm text-primary"
                style={{ width: '100%' }}>
                  <Image src={ Line } width={ 24 } priority alt="" />
                  Buy on Line
              </a>
              <a 
                href="http://m.me/ganjanacup"
                className="border border-primary pt-3 pb-3 pl-6 pr-6 flex items-center justify-center gap-2 font-bold text-sm text-primary"
                style={{ width: '100%' }}>
                  <Image src={ Messenger } priority alt="" />
                  Buy on Messenger
              </a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product

export async function getStaticPaths() {
  const allProductsSlugQuery = `
    query AllProductsPage {
      allProducts {
        slug
      }
    }
  `;
  const results = await request({ query: allProductsSlugQuery });
  const paths = results.allProducts.map(({ slug }) => ({ params: { id: slug }}))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const queryBySlug = `
    query ProductBySlug {
      allProducts(filter: {slug: {eq: "${ params.id }"}}) {
        availability
        description
        name
        otherProps
        price
        images {
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
        video {
          thumbnailUrl
          url
          title
        }
      }
    }`
  ;
  const data = await request({ query: queryBySlug });
  // Fetch necessary data for the blog post using params.id
  return {
    props: { data }
  }
}