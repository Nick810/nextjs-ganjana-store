import Link from "next/link";
import Image from "next/image";

export default function Hero({ ...props }) {
  const { heading, ctaTitle, image } = props;

  return (
    <section>
      <div style={{ display: 'grid' }}>
        <div style={{ gridArea: "1/1" }}><Image src={{ ...image.responsiveImage }} alt="" priority/></div>
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.15', gridArea: '1/1' }}></div>
        <div style={{  gridArea: "1/1", position: "relative",placeItems: "center",display: "grid" }}  className="main__layout">
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-primary-content">{ heading }</h1>
              <Link href="/all-products" className="btn btn-primary text-primary-content max-w-md w-full border-primary-content">{ ctaTitle }</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}