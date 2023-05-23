import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { request } from "../../lib/datocms";
import shortid from "shortid";

export default function ProductLists() {
  const imageRef = useRef(null);
  const [large, setLarge] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewDrop = async() => {
      try {
        const ALLNEWDROPS_QUERY = `
          query AllNewDrops {
            allProducts(filter: {inCollection: {matches: {pattern: "New Drop"}}}) {
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
    const onResize = (entries) => {
      const { width } =  entries[0].contentRect;
      if (width >= 1024) {
        return setLarge(true)
      }
      return setLarge(false)
    }
    const checkImageHeight = (entries) => {
      console.log(entries)
    }
    fetchNewDrop();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    }
  }, []);

  return (
      <section className="main__layout bg-primary">
        <h2 className="text-3xl pt-10 mb-10 text-primary-content font-bold md:mb-16 lg:text-4xl">Special Drop</h2>
        <ul className="grid md:grid-cols-4 relative">
          { data ? data.allProducts.map((item, index) => {
            
            return (
              <li key={ shortid.generate() }>
                <div className="flex flex-col relative">
                  <div style={{ position: 'absolute', top: '-36px', left: '-24px', zIndex: 100 }}>
                    <p className="font-bold text-7xl drop-shadow-md shadow-primary" style={{ color: '#f6f6f6' }}>{ `0${ index + 1 }` }</p>
                  </div>
                  { item.image ? 
                    <div>
                      <Image src={{ ...item.image.responsiveImage }} alt="" ref={ index === 0 ? imageRef : null } /> 
                    </div>
                    : null 
                  }
                  <div className="lg:border-l mt-4 md:pr-4 flex flex-col border-secondary-content">
                    <div className="md:px-5">
                      <p className={ `text-sm mb-1 ${item.availability ? 'text-success' : 'text-error'} `} style={{ color: `${item.availability ? 'text-success' : '#bc2020'}` }}>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
                      <p className='text-sm mb-1 text-secondary-content font-normal'>{ item.otherProps.strainType } | THC:{ item.otherProps.cannabiniod.thc }%</p>
                      <h3 className="text-xl font-bold mb-2 text-primary-content">{ item.name }</h3>
                      { item.description ? <p className="text-primary-content font-normal">{ item.description }</p> : null }
                    </div>
                    <Link href={`product/${ item.slug }`} className="flex justify-end text-primary-content font-bold text-sm mt-4">
                      have a peek
                      <Image src='/arrow-long-right-white.svg' width={ 32 } height={ 32 } priority alt="" className="ml-1"/>
                    </Link>
                  </div>
                </div>
                <div className={ `divider ${ index === data.allProducts.length - 1 ? 'mb-0' : 'mb-12' }`}></div>
              </li>
            )}) : null 
          }
          { large ? <li className="absolute w-[100%] top-0 h-[54%] left-[100%]" ><Image src='/white-gray-bg.jpg' fill alt="" /></li> : null } 
        </ul>
        { error ? <p>{ error }</p> : null }
      </section>
  )
}