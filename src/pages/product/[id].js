import { request } from '../../../lib/datocms';
import Image from 'next/image';
import Video from '@/components/video-clip';
import shortid from 'shortid';

const Product = ({ data }) => {
  const productData  = data.allProducts[0];
  const { availability, description, image, images, name, otherProps, video } = productData;
  const { availableSizes, cannabiniod, cultivatedBy, feeling, flavor, strainType } = otherProps
  
  return (
    <div className='pt-8 pb-8'>
      <div className='text-center mb-8'>
        <h1 className='text-primary font-bold text-3xl mb-2'>{ name }</h1>
        <p className='text-primary'>{ description }</p>
      </div>
      <div className='grid md:grid-cols-2'>
        <div>
          { 
            video ? <Video 
              videoSrcURL={ `https://player.vimeo.com/video/${ productData.video.url.match(/\d+/g) }` }
              videoTitle={ productData.video.title }
            /> : null
          }
          {
            image ? <Image className='mb-4' src={{ ...image.responsiveImage }} priority alt="" /> : null
          }
          {
            images ? images.map((item) => <div className='mb-4' key={ shortid.generate() }><Image src={{ ...item.responsiveImage }} priority alt="" /></div>): null
          }
        </div>
      <div style={{ padding: '0 5%' }}>
        <div className='mb-4'>
          <p className='text-primary'>{ strainType } {cannabiniod.thc ? `| THC:${cannabiniod.thc}%` : ''}</p>
        </div>
          <div>
            <h3 className='text-primary font-bold mb-2'>Cultivated by</h3>
            {
              cultivatedBy ? 
              <div className="flex gap-4">
                { cultivatedBy.map(item => (
                  <div key={ shortid.generate() } className='w-[48px] h-[48px] relative'>
                    <Image src={ item } alt="" className='object-cover' fill />
                  </div>
                ))}
              </div> : null
            }
          </div>
          { cannabiniod.terpenes.length ? 
            <>
              <div>
                <div className='divider mt-1 mb-1'></div>
                <h3 className='text-primary font-bold mb-2'>Terpenes</h3>
                <ul className='flex gap-4'>
                  {
                    cannabiniod.terpenes.map(item => (
                      <li key={ shortid.generate() } className='text-primary border border-secondary p-2'>
                        { item }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </> : null 
          }
          { flavor.length ? 
            <>
              <div>
                <div className='divider mt-1 mb-1'></div>
                <h3 className='text-primary font-bold mb-2'>Flavor</h3>
                <ul className='flex gap-4'>
                  {
                    flavor.map(item => (
                      <li key={ shortid.generate() } className='text-primary border border-secondary p-2'>
                        { item }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </> : null 
          }
          { feeling.length ? 
            <>
              <div>
                <div className='divider mt-1 mb-1'></div>
                <h3 className='text-primary font-bold mb-2'>Feeling</h3>
                <ul className='flex gap-4'>
                  {
                    feeling.map(item => (
                      <li key={ shortid.generate() } className='text-primary border border-secondary p-2'>
                        { item }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </> : null 
          }
          <div style={{ marginBottom: '24px' }}>
            <div className='divider mt-1 mb-1'></div>
            <h3 className='text-primary font-bold mb-2'>Available Sizes</h3>
            <ul style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              {
                Object.entries(availableSizes).map(item => (
                  <li key={ shortid.generate() } className='border-b pt-2 pb-2 pl-3 pr-3 text-primary'>{ `${ item[0] }g - ฿${ item[1].toLocaleString() }` }</li>
                ))
              }
            </ul>
          </div>
            <div className='flex flex-col gap-4'>
              <div className="grid md:grid-cols-2 gap-4">
                <a 
                  href="https://lin.ee/Nc0eINQ" 
                  className="border border-primary pt-3 pb-3 pl-6 pr-6 flex items-center justify-center gap-2 font-bold text-sm text-primary-content bg-primary"
                  style={{ width: '100%' }}>
                    <Image src='/line-wb.png' width={ 24 } height={ 24 } priority alt="" />
                    Buy on Line
                </a>
                <a 
                  href="http://m.me/ganjanacup"
                  className="border border-primary pt-3 pb-3 pl-6 pr-6 flex items-center justify-center gap-2 font-bold text-sm text-primary-content bg-primary"
                  style={{ width: '100%' }}>
                    <Image src='/facebook-messenger.svg' width={ 24 } height={ 24 } priority alt="" />
                    Buy on Messenger
                </a>
              </div>
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
      allProducts(first: "70") {
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
      allProducts(filter: {slug: {eq: "${ params.id }"}}, first: "70") {
        availability
        description
        name
        otherProps
        price
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
    props: { data, revalidate: 60 }
  }
}