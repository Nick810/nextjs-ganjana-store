import shortid from "shortid"
import Image from "next/image"
import ArrowRight from '../svgs/arrow-long-right.svg';
import Link from "next/link";

export default function SocialCTA({ datas }) {
  // console.log(datas.datas.splice(0, 1))
  
  return (
    <section style={{ paddingLeft: '5%' }}>
      <ul className="carousel mt-6 gap-4">
        {
          datas.map(item => (
            <li key={shortid.generate()} className="carousel-item flex flex-col">
              <Image src={{ ...item.image.responsiveImage }} height={ 200 } alt="" priority />
              <div className="py-1 flex flex-col justify-center items-center">
                <h3 className="text-primary font-bold text-xl">{ item.heading }</h3>
                <Link href='/' className="flex items-center">
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