import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { request } from "../../lib/datocms";
import ArrowRight from '../svgs/arrow-long-right.svg';
import shortid from "shortid";

export default function ProductLists() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewDrop = async() => {
      try {
        const ALLNEWDROPS_QUERY = `
          query AllNewDrops {
            allProducts(filter: {inCollection: {matches: {pattern: "New Drop"}}}) {
              name
              image {
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
                url
              }
              otherProps
              price
              description
              slug 
            }
          }`
        ;
        const data = await request({
          query: ALLNEWDROPS_QUERY
        });
        setData(data)
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNewDrop();
  }, []);
  // const renderLists = () => (
  //   items.edges.map((item, index) => {
  //     const { cannabiniod, strainType } = JSON.parse(item.node.otherProps);
      
  //     return (
  //       <Grid item component="li" xs={ 6 } md={ 3 } key={ shortid.generate() } sx={{ mt: 3 }}>
  //         <Box sx={{ p: 0, pt: 2, pb: 3, width: '100%', display:'flex', flexDirection: 'column' }}>
  //           <div style={{ display:'flex', flexDirection: 'column', flex: '1', position: 'relative' }}>
  //             <div style={{ position: 'absolute', top: '-12px', left: '-22px', zIndex: 1000 }}>
  //               <p style={{ color: '#b9b9b9', marginBottom: '8px', fontSize: '5rem' }}>{ `0${ index + 1 }` }</p>
  //             </div>
  //             { item.node.image ? <GatsbyImage image={ getImage(item.node.image) } alt="" /> : null }
  //             <div style={{ width: '80%' }}>
  //               <Typography paragraph sx={{ fontSize: '.9rem !important', color: item.node.availability ? 'green' : 'red', mt: 1, mb: 0 }}>{ item.node.availability ? 'In Stock' : 'Out of stock' }</Typography>
  //               <Typography paragraph sx={{ fontSize: '.9rem !important', color: '#7D7D7D', mb: 0 }}>{ strainType } | THC:{ cannabiniod.thc }%</Typography>
  //               <Typography component="h3" sx={{ mb: 1, mt: 0 }}>{ item.node.name }</Typography>
  //               { item.node.description ? <Typography paragraph sx={{ color: '#333333', mb: 2 }}>{ item.node.description }</Typography> : null }
  //             </div>

  //             <IconButton sx={{ alignSelf: 'flex-end', borderRadius: '8px', p: 1, marginBlockStart: 'auto' }} onClick={ () => navigate(`/${ item.node.name.replaceAll(' ', '_').toLowerCase() }`)}>
  //               <span>have a peek</span>
  //               <TrendingFlatIcon sx={{ ml: 1, color: 'black', transform: 'translateY(2px)' }} />
  //             </IconButton>
  //           </div>
  //         </Box>
  //          <Divider sx={{ borderColor: '#e3e3e3' }} />
  //       </Grid>
  //     )
  //   })
  // )

  return (
    // items ? 
      <section className="main__layout">
        <h2 className="text-4xl mb-4 text-primary font-bold">Special Drop</h2>
        <ul>
          { data ? data.allProducts.map((item, index) => {
            
            return (
              <li key={ shortid.generate() }>
                <div className="flex flex-col relative">
                  <div style={{ position: 'absolute', top: '-12px', left: '-22px', zIndex: 1000 }}>
                    <p className="font-bold text-8xl">{ `0${ index + 1 }` }</p>
                  </div>
                  { item.image ? <Image src={{ ...item.image.responsiveImage }} alt="" priority /> : null }
                  <div style={{ width: '80%' }}>
                    <p className={ item.availability ? 'text-success' : 'text-error' }>{ item.availability ? 'In Stock' : 'Out of stock' }</p>
                    <p>{ item.otherProps.strainType } | THC:{ item.otherProps.cannabiniod.thc }%</p>
                    <h3 className="text-primary font-bold">{ item.name }</h3>
                    { item.description ? <p className="text-primary">{ item.description }</p> : null }
                  </div>
                  <Link href={`product/${ item.slug }`} className="flex justify-end text-primary font-bold">
                    have a peek
                    <Image src={ ArrowRight } width={ 32 } priority alt="" className="ml-1"/>
                  </Link>
                </div>
                <div className="divider"></div>
              </li>
            )}) : null 
          }
        </ul>
        { error ? <p>{ error }</p> : null }
      </section>
  )
}