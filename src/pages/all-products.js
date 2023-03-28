import React from "react";
import Link from 'next/link'
import { request } from '../../lib/datocms';
import shortid from "shortid";

export default function AllProducts({ data }) {
  const { allProducts } = data;

  return (
    <div>
      <h1>Hello World</h1>
    {
      allProducts.map(item => (
        <div key={ shortid.generate() }>
          <Link href={ `/product/${ item.slug }` }>
            <h3>{ item.name }</h3>
            {
              <button 
                className="snipcart-add-item btn"
                data-item-id={ item.name.replaceAll(' ', '-').toLowerCase() }
                data-item-price={ item.price }
                data-item-description={ item.description }
                // data-item-image={ item.image.url }
                data-item-url="/"
                data-item-name={ item.name }
                data-item-custom1-name="Size"
                // data-item-custom1-options={ buyingOptions }
                >
                  BUY NOW
                  {/* <Basket /> */}
              </button> ?? item.availability
            }
          </Link>
        </div>
      ))
    }
    </div>
  )
}

export async function getStaticProps() {
  const ALLPRODUCTS_QUERY = `
    query AllProductsPage($limit: IntType) {
      allProducts(first: $limit) {
        availability
        name
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

  return {
    props: { data }
  }
}