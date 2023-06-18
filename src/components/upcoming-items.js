import Image from "next/image"
import Link from "next/link";
import { request } from '../../lib/datocms';
import { Blurhash } from "react-blurhash";
import { useEffect, useState } from "react";
import Divider from "./divider";
import shortid from "shortid";

export default function UpcomingItems() {
  const [data, setData] = useState();
  const [slugs, setSlugs] = useState();
  const [background, setBackground] = useState({url: '', filename: ''});
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
            slugs: allProducts(filter: {inCollection: {matches: {pattern: "Seeds"}}}) {
              slug
            }
            background: allUploads(filter: {filename: {matches: {pattern: "seed-background"}}}) {
              filename
              url
            }
          }`
        ;
        const data = await request({ query: ALLFILES });
        
        setBackground(data.background[0]);
        setSlugs(data.slugs)
        setData(data.allUploads);
      } catch(err) {
        setError(err.message);
      }
    }
    fetchUpcomingItems();
  }, []);

  return (
    <section className="grid relative">
      { background.url ? <Image src={ background.url } alt="" fill priority className="object-cover" style={{ gridArea: "1/1" }}/> : null }
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', gridArea: "1/1", zIndex: '3' }}></div>
      <div style={{ gridArea: "1/1"}} className="main__layout z-10">
        <Divider num={ 12 } />
        <h2 className="text-3xl text-primary-content font-bold mb-4 lg:text-4xl">New Arrivals</h2>
        <ul className="gap-4 carousel">
          {
            data ? 
            data.map((item, index) => (
              <Link href={ `/product/${ slugs[index].slug }` } key={shortid.generate()} className="grid relative carousel-item card">
                <Blurhash
                  style={{ height: '240px', width: '240px', gridArea: "1/1" }}
                  hash="L02rjaay00oL%KfjM|f657j@?Gay"
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                />
                <Image src={ item.url } alt="" style={{ gridArea: "1/1", zIndex: '2', transform: index === 0 ? 'translateY(-69px)' : 'none'}} width={ 240 } height={ 240 } className="object-contain h-[100%] fadeIn" />
              </Link>
            )) : null
          }
        </ul>
        <Divider num={ 12 } />
      </div>
    </section>
  )
}