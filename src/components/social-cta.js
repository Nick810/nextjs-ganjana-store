import shortid from "shortid"
import Image from "next/image"
import ArrowRight from '../svgs/arrow-long-right.svg';
import Link from "next/link";

export default function SocialCTA({ datas }) {
  
  return (
    <section style={{ paddingLeft: '5%' }}>
      <ul className="carousel pt-6 pb-6 gap-4">
        {
          datas.map(item => (
            <li key={shortid.generate()} className="carousel-item flex flex-col">
              <div style={{ width: '280px', height: '160px', overflow: 'hidden' }}>
                <Image src={{ ...item.image.responsiveImage }}  alt="" priority />
              </div>
              <div className="py-1 flex flex-col justify-center items-center">
                <h3 className="text-primary font-bold text-xl">{ item.heading }</h3>
                <Link href='/' className="flex items-center text-secondary">
                  { item.ctaTitle }
                  <Image src={ ArrowRight } width={ 32 } priority alt="" className="ml-1 translate-y-1"/>
                </Link>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}