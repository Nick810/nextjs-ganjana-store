import Link from "next/link";
import Image from "next/image";

export default function Hero({ ...props }) {
  const { heading, ctaTitle, desktopImage, image } = props;

  return (
    <section>
      <div className="grid">
        <div style={{ gridArea: "1/1" }} className="grid lg:grid-cols-3">
          <Image placeholder='blur' blurDataURL="https://www.datocms-assets.com/95279/1678549877-ganjana_logo_only.png" src={{ ...image.responsiveImage }} alt="" priority  style={{ height: '80vh', objectFit: 'cover' }} className="lg:hidden"/>
          <div className="w-[100vw] h-[100vh] translate-y-4 hidden lg:block">
            <Image placeholder='blur' blurDataURL="data:image/jpeg;base64L17-7qE4?tNI$+%1jut600xW9IxZ" src={{ ...desktopImage.responsiveImage }} alt="" priority fill className="object-cover"/>
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25', gridArea: '1/1' }}></div>
        <div style={{  gridArea: "1/1" }}  className="main__layout grid place-items-center relative">
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-lg">
              <h1 className="mb-5 text-5xl font-bold text-primary-content lg:text-6xl">{ heading }</h1>
              <Link href="/all-products" className="btn btn-primary text-primary-content max-w-md w-full border-gray-400">{ ctaTitle }</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}