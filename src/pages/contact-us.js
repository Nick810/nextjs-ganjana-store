import { request } from "../../lib/datocms"
import Image from "next/image";


export default function ContactUs({ data }) {
  const amenities = [
    {
      icon: '',
      text: 'In-store pickup'
    },
    {
      icon: '',
      text: 'Parking on-site'
    },
    {
      icon: '',
      text: 'Credit cards are welcomed'
    },
    {
      icon: '',
      text: 'Washroom'
    },
    {
      icon: '',
      text: 'Sameday Delivery (Bangkok area only)'
    },
  ]
  const { allUploads } = data;

  return (
    <div className="pb-8">
      <div className="grid md:grid-cols-2">
        <Image src={{ ...allUploads[0].responsiveImage }} priority alt="" />
        <div className="container">
          <iframe className="responsive-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15391700.288210863!2d85.25270380317563!3d19.638439035284307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dbd8ce8f08b%3A0x9f606981fa56b7e3!2sGanjana!5e0!3m2!1sen!2sth!4v1681276682011!5m2!1sen!2sth" width="600" height="450" style={{border: '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className="main__layout grid lg:my-12">
        <div>
          <h3 className="font-bold text-primary text-xl pt-4 mb-2">Amenities</h3>
          <ul>
            {
              amenities.map((item, index)=> {
                return (
                  <li key={ index } className="text-primary">
                    { item.text }
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="c-divider mt-6 lg:w-[50%]"></div>
        <div className='max-w-para'>
          <h3 className="font-bold text-primary text-xl mb-2 mt-6">Hours</h3>
          <div>
            <p className="text-primary mb-2">Tue - Sun | 1pm -  9pm</p>
          </div>
          <p className="text-primary">Most of the time our staffs stay regular hours, give us a call or holla us in a chat to find out. We’re always ready to serve you.</p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const CONTACTPAGE_QUERY = `
    query AllProductsPage {
      allUploads(filter: {filename: {matches: {pattern: "ganjana-store-contact.jpg"}}}) {
        responsiveImage(imgixParams: { fit: fill, auto: format }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
      }
    }
  `
  const data = await request({ query: CONTACTPAGE_QUERY });

  return {
    props: { data }
  }
}