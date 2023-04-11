import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ growers: [] })
  const handleSetFilter = (name) => {
    const activeFilterArr = [ ...activeFilter ];
    const currentFilterArr = [ ...filter.growers ];
    const activeFilterIndex = activeFilterArr.indexOf(name)
    const currentFilterIndex = currentFilterArr.indexOf(name)
    
    if (activeFilterIndex !== -1) {
      activeFilterArr.splice(activeFilterIndex, 1);
      setActiveFilter(activeFilterArr);
    } else {
      setActiveFilter(active => [...active, name]);
    }

    if (currentFilterIndex !== -1) {
      currentFilterArr.splice(currentFilterIndex, 1);
      setFilter({ growers: currentFilterArr });
    } else {
      currentFilterArr.push(name);
      setFilter({ growers: currentFilterArr });
    }
  }

  return (
    <AppContext.Provider 
      value={{ 
        activeFilter,
        filter,
        setFilter,
        handleSetFilter,
        showFilter,
        setActiveFilter,
        setShowFilter 
      }}>
      { children }
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}