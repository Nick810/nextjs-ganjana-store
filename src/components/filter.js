import { useAppContext } from "@/context";
import shortid from "shortid";

export default function Filter({ growers }) {
  const { activeFilter, handleSetFilter, showFilter, setShowFilter } = useAppContext();

  return (
    <nav style={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', zIndex: '2000', backgroundColor: '#fff', display: showFilter ? 'block' : 'none' }}>
      <div className="main__layout mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-primary font-bold">Filter</h2>
          <button className="text-primary" onClick={ () => setShowFilter(false) }>
            {/* <CloseIcon fontSize="large" sx={{ color: '#000' }} /> */}Close
          </button>
        </div>
        <div className="divider mt-1 mb-1"></div>
        <h3 className="font-bold text-primary text-xl mb-2">Growers</h3>
        <ul className="flex flex-wrap gap-4">
          {
            growers ? 
            growers.map((grower, index) => (
              <li key={ index }>
                <button 
                  className={ `text-primary border p-2 ${ activeFilter.find(name => name === grower.name) ? 'active' : null} ` } 
                  onClick={ () => handleSetFilter(grower.name) } >
                    { grower.name }
                </button>
              </li>
            )): null
          }
        </ul>
      </div>
    </nav>
  )
}