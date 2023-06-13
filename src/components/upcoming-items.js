import Image from "next/image"
import { request } from '../../lib/datocms';
import { Blurhash } from "react-blurhash";
import { useEffect, useState } from "react";
import shortid from "shortid";

export default function UpcomingItems() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingItems = async() => {
      try {
        const ALLFILES = `
          query AllFiles {
            allUploads(filter: {filename: {matches: {pattern: "-upcoming-items"}}}) {
              filename
              url
            }
          }`
        ;
        const data = await request({ query: ALLFILES });
        
        setData(data.allUploads);
      } catch(err) {
        setError(err.message);
      }
    }
    fetchUpcomingItems();
  }, []);

  return (
    <section className="main__layout">
      <h2 className="text-3xl text-primary font-bold mb-4 lg:text-4xl">Upcoming Items</h2>
      <ul className="gap-4 carousel">
        {
          data ? 
          data.map((item, index) => (
            <li key={shortid.generate()} className="grid relative carousel-item card">
              <Blurhash
                style={{ height: '240px', width: '240px', gridArea: "1/1" }}
                hash="L02rjaay00oL%KfjM|f657j@?Gay"
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
              <Image src={ item.url } alt="" style={{ gridArea: "1/1", zIndex: '2', transform: index === 0 ? 'translateY(-69px)' : 'none'}} width={ 240 } height={ 240 } className="object-contain h-[100%] fadeIn" />
            </li>
          )) : null
        }
      </ul>
    </section>
  )
}