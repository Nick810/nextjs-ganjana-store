import Link from "next/link";
import Image from "next/image";
import { Blurhash } from "react-blurhash";
import { fullWidthHeight } from "../../lib/utilities";


export default function Hero({ ...props }) {
  const { heading, ctaTitle, desktopImage, image } = props;

  return (
    <section>
      <div className="grid relative">
        <div style={{ gridArea: "1/1" }} className="grid lg:grid-cols-3">
          <div className="lg:hidden grid relative">
            <Blurhash
              style={{ height: '80vh', width: '100vw', gridArea: "1/1" }}
              hash="L02rjaay00oL%KfjM|f657j@?Gay"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
            <Image src={{ ...image.responsiveImage }} alt="" style={{ gridArea: "1/1", zIndex: '2'}} priority className="object-cover h-[80vh] fadeIn" />
          </div>
          <div className="w-[100vw] h-[100vh] translate-y-4 hidden lg:block">
            <Blurhash
              style={ fullWidthHeight }
              hash="L184G09d_1NI$+%2a#t600xW9HxY"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
            <Image src={{ ...desktopImage.responsiveImage }} alt="" priority fill className="object-cover fadeIn"/>
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', gridArea: "1/1", zIndex: '3' }}></div>
        <div style={{  gridArea: "1/1", zIndex: '3' }}  className="main__layout grid place-items-center relative">
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-lg">
              <h1 className="mb-5 text-5xl font-bold text-primary-content lg:text-6xl">{ heading }</h1>
              <Link href="/all-products" className="btn btn-primary text-primary-content max-w-md w-full border-gray-500">{ ctaTitle }</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}