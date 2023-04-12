import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { request } from "../../lib/datocms";
import ArrowRight from '../svgs/arrow-long-right.svg';
import shortid from "shortid";

export default function ProductLists() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewDrop = async() => {
      try {
        const ALLNEWDROPS_QUERY = `
          query AllNewDrops {
            allProducts(filter: {inCollection: {matches: {pattern: "New Drop"}}}) {
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
              slug 
            }
          }`
        ;
        const data = await request({
          query: ALLNEWDROPS_QUERY
        });
        setData(data)
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNewDrop();
  }, []);

  return (
    // items ? 
      <section className="main__layout">
        <h2 className="text-3xl mb-10 text-primary font-bold">Special Drop</h2>
        <ul>
          { data ? data.allProducts.map((item, index) => {
            
            return (
              <li key={ shortid.generate() }>
                <div className="flex flex-col relative">
                  <div style={{ position: 'absolute', top: '-36px', left: '-24px', zIndex: 1000 }}>
                    <p className="font-bold text-7xl">{ `0${ index + 1 }` }</p>
                  </div>
                  { item.image ? <Image src={{ ...item.image.responsiveImage }} alt="" priority /> : null }
                  <div style={{ width: '80%' }}>
                    <p className={ item.availability ? 'text-success' : 'text-error' }>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
                    <p>{ item.otherProps.strainType } | THC:{ item.otherProps.cannabiniod.thc }%</p>
                    <h3 className="text-primary font-bold">{ item.name }</h3>
                    { item.description ? <p className="text-primary">{ item.description }</p> : null }
                  </div>
                  <Link href={`product/${ item.slug }`} className="flex justify-end text-primary font-bold mt-4">
                    have a peek
                    <Image src={ ArrowRight } width={ 32 } priority alt="" className="ml-1"/>
                  </Link>
                </div>
                <div className={ `divider ${ index === data.allProducts.length - 1 ? 'mb-0' : 'mb-12' }`}></div>
              </li>
            )}) : null 
          }
        </ul>
        { error ? <p>{ error }</p> : null }
      </section>
  )
}