import { useEffect, useRef, useState } from "react";
import { request } from "../../lib/datocms";
import Image from "next/image";
import Loading from "./loading";
import shortid from "shortid";
import Link from "next/link";

export default function AllEvents() {
  const getWindowWidth = () => {
    if (typeof window !== "undefined") return window.innerWidth;
  }
  const windowWidth = useRef(getWindowWidth());
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllEvents = async() => {
      try {
        const ALLEVENTS_QUERY = `
          query AllEvents {
            allEvents {
              eventTitle
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
              }
              tags
            }
          }`
        ;
        const data = await request({ query: ALLEVENTS_QUERY });
        const mappedData = data.allEvents.map(item => ({...item, tags: item.tags.replaceAll('- ', '').replaceAll('\n', ',').split(',')}));
        
        setData(mappedData)
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAllEvents();
  }, [])

  return (
    <section>
      <div className="main__layout">
        <h2 className="text-3xl mb-4 text-primary font-bold md:mb-8">Catch up with Ganjana</h2>
      </div>
      <div className="grid gap-4">
        {
          data ?
          <Link href="/">
            <div className="main__layout">
              <div className="grid gap-2 lg:gap-5 lg:grid-cols-first-blog lg:max-h-96 overflow-hidden">
                <Image src={{ ...data[0].image.responsiveImage }} alt={ data[0].eventTitle } priority />
                <div>
                  <div className="flex gap-2 mb-2">{ data[0].tags.map(tag => <span className="border border-secondary text-primary py-2 px-4 text-xs" key={ shortid.generate() }>{ tag }</span> )}</div>
                  <h3 className="text-xl font-bold text-primary">{ data[0].eventTitle }</h3>
                  <Link href="/"className="flex justify-end text-black font-bold mt-2">
                    check it out
                    <Image src='/arrow-long-right.svg' width={ 32 } height={ 32 } priority alt="" className="ml-1"/>
                  </Link>
                </div>
              </div>
            </div>
          </Link> : <Loading />
        }
        {
          data ? 
          <div className="pl-[5%]">
            <ul className="carousel gap-4">
            {
              data.map((item, index) => {
                if (index !== 0) {
                  return (
                    <li key={shortid.generate()} className="carousel-item">
                      <Link href="/" className="flex flex-col gap-2 lg:gap-4">
                        <div>
                          <Image src={{ ...item.image.responsiveImage }} width={ windowWidth.current >= 1024 ? 480 : 320 } alt={ item.eventTitle } priority />
                        </div>
                        <div>
                        <div className="flex gap-2 mb-2">{ data[0].tags.map(tag => <span className="border border-secondary text-primary p-2 text-xs" key={ shortid.generate() }>{ tag }</span> )}</div>
                          <h3 className="text-xl font-bold text-primary">{ item.eventTitle }</h3>
                          <Link href="/"className="flex justify-end text-black font-bold mt-2">
                            check it out
                            <Image src='/arrow-long-right.svg' width={ 32 } height={ 32 } priority alt="" className="ml-1"/>
                          </Link>
                        </div>
                      </Link>
                    </li>
                  )
                }

                return [];
              })
            }
            </ul>
          </div> : <Loading />
        }
      </div>
      { error ? <p>{ error }</p> : null }
    </section>
  )
}