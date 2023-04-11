import { useAppContext } from "@/context";
import shortid from "shortid";

export default function Filter({ growers }) {
  const { activeFilter, handleSetFilter, showFilter, setShowFilter } = useAppContext();

  return (
    <nav style={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', zIndex: '2000', backgroundColor: '#fff', display: showFilter ? 'block' : 'none' }}>
      <div className="main__layout">
        <div className="flex justify-between">
          <h2 className="text-4xl">Filter</h2>
          <button className="btn" onClick={ () => setShowFilter(false) }>
            {/* <CloseIcon fontSize="large" sx={{ color: '#000' }} /> */}Close
          </button>
        </div>
        <div className="divider"></div>
        <h3>Growers</h3>
        <ul className="flex flex-wrap gap-4">
          {
            growers ? 
            growers.map((grower, index) => (
              <li key={ index }>
                <button 
                  className={ activeFilter.find(name => name === grower.name) ? 'active' : null } 
                  onClick={ () => handleSetFilter(grower.name) } 
                  style={{ border: '1px solid black', padding: '8px' }}>
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