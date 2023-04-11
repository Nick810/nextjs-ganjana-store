import Link from "next/link";
import Image from "next/image";

export default function Hero({ ...props }) {
  const { heading, ctaTitle, image } = props;

  return (
    <section>
      <div style={{ display: 'grid' }}>
        <div style={{ gridArea: "1/1" }}><Image src={{ ...image.responsiveImage }} alt="" priority/></div>
        <div style={{  gridArea: "1/1", position: "relative",placeItems: "center",display: "grid" }}  className="main__layout">
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-primary-content">{ heading }</h1>
              <Link href="/all-products" className="btn btn-primary text-primary-content max-w-xs w-full border">{ ctaTitle }</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* <Swiper
        slidesPerView={1}
        width={ 320 }
        spaceBetween={ 16 }
        style={{ marginBottom: '16px', marginTop: '32px', paddingLeft: '5%' }}
        className="mySwiper-1"
      >
        {
          items.edges.map(item => (
            <SwiperSlide key={ shortid.generate() }>
              <a href={ item.node.ctaUrl }>
                <GatsbyImage image={ getImage(item.node.image) } alt="" />
                <div style={{ marginBottom: '16px' }}>
                  <Typography component="h3" sx={{ mb: 1, mt: 1, fontSize: '1.15rem !important' }}>{ item.node.heading }</Typography>
                  <button style={{ display: 'flex', alignItems: 'center', color: '#7D7D7D', fontWeight: 500 }}>{ item.node.ctaTitle }<TrendingFlatIcon sx={{ ml: 1, transform: 'translateY(2px)' }} /></button>
                </div>
              </a>
            </SwiperSlide>
          ))
        }
      </Swiper> */}
    </section>
  )
}