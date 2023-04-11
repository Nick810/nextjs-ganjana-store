import shortid from "shortid";

export default function AllEvents() {
  return (
    <section style={{ padding: '32px 0px'}}>
      <div className="main__layout">
        <h2 className="text-4xl mb-4 text-primary font-bold">Catch up with Ganjana</h2>
      </div>
      <ul>
        <li className="main__layout">
          {/* <GatsbyImage image={ getImage(items.edges[0].node.image) } alt={ items.edges[0].node.eventTitle } /> */}
          {/* <span style={{ color: '#7D7D7D'}}>{ items.edges[0].node.tags.replaceAll('- ', '') }</span> */}
          {/* <h3>{ items.edges[0].node.eventTitle }</h3> */}
        </li>
        <li>
          {/* <Swiper
            slidesPerView={ 1 }
            width={ 320 }
            spaceBetween={ 16 }
            style={{ marginBottom: '16px' }}
            className="mySwiper">
              {
                items.edges.slice(1, items.edges.length).map(item => {
                  const tags = item.node.tags.replaceAll('- ', '').split('\n');
                  
                  return (
                    <SwiperSlide key={ shortid.generate()}>
                      <GatsbyImage image={ getImage(item.node.image) } alt={ item.node.eventTitle } />
                      <ul style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        {
                          tags.map(tag => (
                            <li key={ shortid.generate() }><span style={{ color: '#7D7D7D' }}>{ tag }</span></li>
                          ))
                        }
                      </ul>
                      <Typography component="h3">{ item.node.eventTitle }</Typography>
                    </SwiperSlide>
                  )
                })
              }
          </Swiper> */}
        </li>
      </ul>
    </section>
  )
}