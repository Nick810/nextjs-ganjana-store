import { request } from '../../../lib/datocms';
import Image from 'next/image';
import Video from '@/components/video-clip';
import shortid from 'shortid';

const Product = ({ data }) => {
  const productData  = data.allProducts[0];
  const { availability, description, name, otherProps, price, video } = productData;
  const { availableSizes, buyingOptions, cannabiniod, cultivatedBy, feeling, flavor, strainType } = otherProps
  
  return (
    <div>
      <h1>{ name }</h1>
      <p>{ description }</p>
      {/* { 
        <Video 
          videoSrcURL={ `https://player.vimeo.com/video/${ productData.video.url.match(/\d+/g) }` }
          videoTitle={ productData.video.title }
        /> ?? video
      } */}
      <div style={{ padding: '0 5%' }}>
        <div>
          <p>{ strainType } | THC:{ cannabiniod.thc }%</p>
        </div>
          <div style={{ paddingBottom: '24px' }}>
            <h3>Cultivated by</h3>
            {
              cultivatedBy ? 
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginTop: '4px' }}>
                { cultivatedBy.map(item => (
                  <Image src={ item } alt="" key={ shortid.generate() } height={ 48 } width={ 48 } />
                ))}
              </div> : null
            }
          </div>
          { flavor.length || flavor ? 
            <>
              <div style={{ paddingBottom: '24px' }}>
                {/* <Divider sx={{ borderColor: '#e3e3e3', mb: 3 }} /> */}
                <h3>Flavor</h3>
                <ul style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                  {
                    flavor.map(item => (
                      <li key={ shortid.generate() } style={{ borderRadius: '16px', color: '#7D7D7D' }}>
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
              <div style={{ paddingBottom: '24px' }}>
                {/* <Divider sx={{ borderColor: '#e3e3e3', mb: 3 }} /> */}
                <h3>Feeling</h3>
                <ul style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                  {
                    feeling.map(item => (
                      <li key={ shortid.generate() } style={{ color: '#7D7D7D' }}>
                        { item }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </> : null 
          }
          <div style={{ marginBottom: '24px' }}>
            {/* <Divider sx={{ borderColor: '#e3e3e3', mb: 3 }} /> */}
            <h3>Available Sizes</h3>
            <ul style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              {
                Object.entries(availableSizes).map(item => (
                  <li key={ shortid.generate() } style={{ padding: '8px 12px', borderBottom: '1px solid black', fontWeight: 700 }}>{ `${ item[0] }g - ฿${ item[1].toLocaleString() }` }</li>
                ))
              }
            </ul>
          </div>
          <p>*Select your desired size after adding item to cart</p>
          <button 
            className={ `snipcart-add-item ${ availability ? '' : 'sold-out' }` }
            style={{ border: '1px solid black', background: 'white', color: 'black', width: '100%', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
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
              {/* <div style={{ border: '1px solid black', borderRadius: '50%', display: 'flex', padding: '2px' }}><Basket/></div> */}
          </button>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '16px', gap: '16px' }}>
            {/* <a href="https://lin.ee/Nc0eINQ" style={{ border: '1px solid black', width: '100%', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }} className="link--dark"><img src={ Line } style={{ width: '24px', height: '24px'}} />Buy on Line</a>
            <a href="http://m.me/ganjanacup" style={{ border: '1px solid black', width: '100%', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',  fontWeight: 700 }} className="link--dark"><Messenger />Buy on Messenger</a> */}
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
  // Return a list of possible value for id
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
          responsiveImage {
            alt
            base64
            bgColor
            title
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
    props: { data }
  }
}