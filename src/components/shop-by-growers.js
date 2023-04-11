import Link from "next/link";
import { request } from "../../lib/datocms";
import shortid from "shortid";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
import { useAppContext } from "@/context";

export default function ShopByGrowers() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const { handleSetFilter } = useAppContext();

  useEffect(() => {
    const fetchGrower = async() => {
      try {
        const ALLGROWERS_QUERY = `
          query AllGrowers {
            allGrowers {
              avartar {
                responsiveImage(imgixParams: { fit: crop, w: 120, h: 120, auto: format }) {
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
              name
            }
          }`
        ;
        const data = await request({
          query: ALLGROWERS_QUERY
        });

        setData(data)
      } catch (err) {
        setError(err.message);
      }
    }
    fetchGrower();
  }, [])

  return (
    <section style={{ padding: '32px 0px', paddingLeft: '5%' }}>
      <h2 className="text-4xl mb-4 text-primary font-bold">Shop by growers</h2>

      <ul className="carousel rounded-box gap-4">
        {
          data ? 
          data.allGrowers.map(item => (
            <li key={ shortid.generate() } className="carousel-item">
              <Link href={ `/all-products` } onClick={ () => handleSetFilter(item.name) }>
                <Image src={{ ...item.avartar.responsiveImage }} priority alt={ `Shop By ${item.name}` } />
              </Link>
            </li>
          )) : <li><Loading /></li>
        }
      </ul>

      { error ? <p>{ error }</p> : null }
    </section>
  )
}