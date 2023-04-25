import shortid from "shortid"
import Image from "next/image"
import Link from "next/link";

export default function SocialCTA({ datas }) {
  
  return (
    <section style={{ paddingLeft: '5%' }} className="bg-black">
      <ul className="carousel pt-8 pb-6 gap-4 lg:gap-8 lg:justify-center">
        {
          datas.map(item => (
            <li key={shortid.generate()} className="carousel-item flex flex-col">
              {/* <div style={{ width: '280px', height: '160px', overflow: 'hidden' }}> */}
              <div style={{ width: '480px', height: '200px', overflow: 'hidden' }}>
                <Image src={{ ...item.image.responsiveImage }}  alt="" priority />
              </div>
              <div className="py-1 flex flex-col justify-center items-center">
                <h3 className="text-primary-content font-bold text-xl mt-3">{ item.heading }</h3>
                <Link href='/' className="flex items-center text-secondary border-b-2 border-black">
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