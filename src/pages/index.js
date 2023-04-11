import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Hero from '@/components/hero'
import CustomerReviews from '@/components/customer-reviews'
import ProductLists from '@/components/products-list'
import AllProducts from '@/components/all-products'
import ShopByGrowers from '@/components/shop-by-growers'
import AllCategories from '@/components/all-categories'
import AllEvents from '@/components/all-events'
import { request  } from '../../lib/datocms'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {
  const { allHeros } = data;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Hero heading={ allHeros[0].heading } ctaTitle={ allHeros[0].ctaTitle } image={ allHeros[0].image }/>
        <CustomerReviews />
        <ProductLists />
        <AllCategories />
        <AllProducts />
        <ShopByGrowers />
        <AllEvents />
      </>
    </>
  )
}

export async function getStaticProps() {
  const HERO_QUERY = `
    query Hero {
      allHeros {
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
    props: { data }
  }
}
