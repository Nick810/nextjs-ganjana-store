import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [test, setTest] = useState(0);
  return (
    <AppContext.Provider 
      value={{ test }}
      >
      { children }
    </AppContext.Provider>
  )
}