import { request } from "../../lib/datocms"
import { useEffect, useState } from "react";
import { googleReviews } from '../../siteconfig.json';
import Image from "next/image";
import shortid from "shortid";

export default function CustomerReviews() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomersReviews = async() => {
      try {
        const ALLFILES = `
          query AllFiles {
            allUploads(filter: {tags: {eq: "google-review-image"}}) {
              url
              filename
            }
          }`
        ;
        const data = await request({ query: ALLFILES });
        const mergedData = googleReviews.map((review, index) => ({ ...review, url: data.allUploads[index].url }));
        
        setData(mergedData);
      } catch(err) {
        setError(err.message);
      }
    }
    fetchCustomersReviews();
  }, [])

  return (
    <section className="main__layout">
      <h2 className="text-3xl text-primary font-bold md:mb-4">Words from our customers</h2>
      <ul className="carousel gap-8 py-4 px-8">
        {
          data ? 
          data.map(item => (
            <li key={ shortid.generate() } className="carousel-item card border border-gray-300 shadow-md">
              <a href={ item.link } className="p-4 border-white">
                <div className="flex justify-end">
                  <Image src='/google_g_icon.png' width={ 32 } height={ 32 } priority alt="" />
                </div>
                <div className="flex justify-center">
                  <img src={item.url} width="60" height="60" alt="" />
                </div>
                <h3 className="text-center text-primary">{ item.name }</h3>
                <ul className="flex justify-center gap-4 mt-4 mb-4">
                  {
                    [1, 2, 3, 4, 5].map(star => (
                      <li key={ shortid.generate() }>
                        <Image priority src='/star.svg' width={ 24 } height={ 24 } alt="Star Icon" />
                      </li>
                      ))
                  }
                </ul>
                <p className="max-w-xs text-primary text-sm">{ item.review.substring(0, 420) + '...' }</p>

                <div className="flex flex-col items-center mt-6 mb-4">
                  <button className="border-b border-gray-400 flex justify-center text-primary items-center font-bold px-4 py-2">
                    See full review
                    <Image src='/arrow-long-right.svg' width={ 32 } height={ 32 } priority alt="" className="ml-1 translate-y-1"/>
                  </button>
                </div>
              </a>
            </li>
          )) : null
        }
      </ul>
      { error ? <p>{ error }</p> : null }
    </section>
  )
}