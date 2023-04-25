import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero({ ...props }) {
  const { heading, ctaTitle, image } = props;

  return (
    <section>
      <div style={{ display: 'grid' }}>
        <div style={{ gridArea: "1/1" }} className="grid lg:grid-cols-3">
          <Image src={{ ...image.responsiveImage }} alt="" priority  style={{ height: '80vh', objectFit: 'cover' }} />
          <Image src={{ ...image.responsiveImage }} alt="" priority style={{ height: '80vh', objectFit: 'cover' }} className="hidden lg:block"/>
          <Image src={{ ...image.responsiveImage }} alt="" priority style={{ height: '80vh', objectFit: 'cover' }} className="hidden lg:block"/>
        </div>
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25', gridArea: '1/1' }}></div>
        <div style={{  gridArea: "1/1", position: "relative",placeItems: "center",display: "grid" }}  className="main__layout">
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-primary-content">{ heading }</h1>
              <Link href="/all-products" className="btn btn-primary text-primary-content max-w-md w-full border-gray-400">{ ctaTitle }</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}