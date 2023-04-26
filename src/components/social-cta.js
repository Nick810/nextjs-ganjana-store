import { useEffect, useState } from "react";
import shortid from "shortid"
import Image from "next/image"
import Link from "next/link";

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
  });
  
  return (
    <section style={{ paddingLeft: '5%' }} className="bg-primary">
      <ul className="carousel pt-8 pb-6 gap-4 lg:gap-8 lg:justify-center">
        {
          datas.map(item => (
            <li key={shortid.generate()} className="carousel-item flex flex-col">
              <div className="overflow-hidden" style={{ width: `${ large ? '480px' : '280px' }`, height: `${ large ? '200px' : '160px' }` }}>
                <Image src={{ ...item.image.responsiveImage }}  alt="" priority />
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