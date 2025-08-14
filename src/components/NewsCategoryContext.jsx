import { createContext, useContext, useEffect, useState } from "react";

const NewsCategoryContext = createContext();

export function NewsCategoryProvider({ children }) {
  const [newsCategory, setNewsCategory] = useState("General");

  return (
    <NewsCategoryContext.Provider value={{ newsCategory, setNewsCategory }}>
      {children}
    </NewsCategoryContext.Provider>
  );
}

export function useNewsCategory() {
  return useContext(NewsCategoryContext);
}
