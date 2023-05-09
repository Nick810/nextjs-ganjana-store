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
    <section style={{ padding: '32px 0px', paddingLeft: '5%' }} className="bg-primary">
      <h2 className="text-3xl mb-4 text-primary-content font-bold md:mb-8 lg:text-4xl">Shop by growers</h2>

      <ul className="carousel rounded-box gap-4 md:gap-10">
        {
          data ? 
          data.allGrowers.map(item => (
            <li key={ shortid.generate() } className="carousel-item">
              <Link href={ `/all-products` } onClick={ () => handleSetFilter(item.name) }>
                <div className="overflow-hidden w-[120px] h-[120px] relative">
                  <Image src={{ ...item.avartar.responsiveImage }} fill priority alt={ `Shop By ${item.name}` } className="object-cover" />
                </div>
              </Link>
            </li>
          )) : <li><Loading /></li>
        }
      </ul>

      { error ? <p>{ error }</p> : null }
    </section>
  )
}