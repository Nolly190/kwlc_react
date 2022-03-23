

import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom";

let defaultState = {
  items: [],
  setItems: () => {},
};

export const ShopContext = createContext(defaultState);

export function ShopProvider(props) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    defaultState.items = items;
    defaultState.setItems = setItems;
  }, [items]);
  

  console.log("re-rendeing", items);
  return (
    <ShopContext.Provider value={{
      items,
      setItems
    }}>
      {props.children}
    </ShopContext.Provider>
  );
}

