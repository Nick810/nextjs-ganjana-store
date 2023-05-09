import Head from 'next/head'
import Hero from '@/components/hero'
import CustomerReviews from '@/components/customer-reviews'
import ProductLists from '@/components/products-list'
import AllProducts from '@/components/all-products'
import ShopByGrowers from '@/components/shop-by-growers'
import AllCategories from '@/components/all-categories'
import AllEvents from '@/components/all-events'
import { request  } from '../../lib/datocms'
import Divider from '@/components/divider'
import SocialCTA from '@/components/social-cta'

export default function Home({ data }) {
  const { hero, socialCtas } = data;
  
  return (
    <>
      <Head>
        <title>Ganjana Store</title>
        <meta property="og:title" content="Ganjana Store — Finest Crafty Buds" key="title" />
        <meta name="twitter:title" content="Ganjana Store — Finest Crafty Buds" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <>
        <Hero heading={ hero[0].heading } ctaTitle={ hero[0].ctaTitle } image={ hero[0].image } desktopImage={ hero[0].desktopImage } />
        <SocialCTA datas={ socialCtas } />
        <Divider num={ 12 } />
        <CustomerReviews />
        <Divider num={ 12 } />
        <ProductLists />
        <Divider num={ 12 } />
        <AllCategories />
        <Divider num={ 12 } />
        <AllProducts />
        <Divider num={ 12 } />
        <ShopByGrowers />
        <Divider num={ 12 } />
        <AllEvents />
        <Divider num={ 12 } />
      </>
    </>
  )
}

export async function getStaticProps() {
  const HERO_QUERY = `
    query Hero {
      hero: allHeros(filter: {heading: {eq: "Finest Crafty Buds"}}) {
        heading
        ctaTitle
        desktopImage {
          responsiveImage(imgixParams: {fit: fill, auto: format, q: 75}) {
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
        image {
          responsiveImage(imgixParams: {fit: fill, auto: format}) {
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
      }
      socialCtas: allHeros(filter: {heading: {notMatches: {pattern: "Finest Crafty Buds"}}}) {
        heading
        ctaTitle
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
      }
    }`
  ;
  const data = await request({ query: HERO_QUERY });
  
  return {
    props: { data, revalidate: 60 }
  }
}