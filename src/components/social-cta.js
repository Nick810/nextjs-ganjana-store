import { useEffect, useState } from "react";
import shortid from "shortid"
import Image from "next/image"
import Link from "next/link";
import { Blurhash } from "react-blurhash";

export default function SocialCTA({ datas }) {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    const onResize = (entries) => {
      const { width } =  entries[0].contentRect;
      if (width >= 1024) {
        return setLarge(true)
      }
      return setLarge(false)
    }
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    }
  }, []);
  
  return (
    <section style={{ paddingLeft: '5%' }} className="bg-primary">
      <ul className="carousel pt-8 pb-6 gap-4 lg:gap-8 lg:justify-center">
        {
          datas.map(item => (
            <li key={shortid.generate()} className="carousel-item flex flex-col">
              <div className="overflow-hidden grid" style={{ width: `${ large ? '480px' : '280px' }`, height: `${ large ? '200px' : '160px' }` }}>
                <Blurhash
                  style={{ width: '100%', height: '100%', gridArea: "1/1" }}
                  hash="L02rjaay00oL%KfjM|f657j@?Gay"
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                />
                <Image src={{ ...item.image.responsiveImage }} alt="" className="fadeIn" style={{ gridArea: "1/1" }} />
              </div>
              <div className="py-1 flex flex-col justify-center items-center">
                <h3 className="text-primary-content font-bold text-xl mt-3 lg:text-2xl">{ item.heading }</h3>
                <Link href='/' className="flex items-center text-secondary border-b-2 border-primary text-sm">
                  { item.ctaTitle }
                  <Image src='/arrow-long-right-white.svg' width={ 32 } height={ 32 } priority alt="" className="ml-1 translate-y-1"/>
                </Link>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}