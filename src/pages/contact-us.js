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

export default function ContactUs() {
  return (
    <div>
      <div>
        <h3>Amenities</h3>
        <ul>
          {
            amenities.map((item, index)=> {
              return (
                <li key={ index }>
                  { item.text }
                </li>
              )
            })
          }
        </ul>
        <div className="divider"></div>
      </div>
      <div className=''>
        <h3>Hours</h3>
        <div>
          <p>Tue - Sun | 1pm -  9pm</p>
        </div>
        <p>Most of the time our staffs stay regular hours, give us a call or holla us in a chat to find out. We’re always ready to serve you.</p>
      </div>
    </div>
  )
}