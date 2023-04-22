import { useEffect, useState } from "react";
import { request } from "../../lib/datocms";
import Image from "next/image";
import Loading from "./loading";
import shortid from "shortid";


export default function AllEvents() {
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
      {
        data ?
        <div className="main__layout">
          <div className="mb-4">
            <Image src={{ ...data[0].image.responsiveImage }} alt={ data[0].eventTitle } priority />
            <div className="pt-3">
              <div className="flex gap-2 mb-2">{ data[0].tags.map(tag => <span className="border text-primary py-2 px-4 text-xs" key={ shortid.generate() }>{ tag }</span> )}</div>
              <h3 className="text-xl font-bold text-primary">{ data[0].eventTitle }</h3>
            </div>
          </div>
        </div> : <Loading />
      }
      {
        data ? 
        <div style={{ paddingLeft: '5%' }}>
          <ul className="carousel gap-4">
          {
            data.map((item, index) => {
              if (index !== 0) {
                return (
                  <li key={shortid.generate()} className="carousel-item flex flex-col">
                    <Image src={{ ...item.image.responsiveImage }} width={ 320 } alt={ item.eventTitle } priority />
                    <div className="pt-3">
                    <div className="flex gap-2 mb-2">{ data[0].tags.map(tag => <span className="border text-primary py-2 px-4 text-xs" key={ shortid.generate() }>{ tag }</span> )}</div>
                      <h3 className="text-xl font-bold text-primary">{ item.eventTitle }</h3>
                    </div>
                  </li>
                )
              }

              return [];
            })
          }
          </ul>
        </div> : <Loading />
      }
      { error ? <p>{ error }</p> : null }
    </section>
  )
}