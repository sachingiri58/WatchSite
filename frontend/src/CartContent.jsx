import React, { createContext, useContext, useEffect, useState } from "react";
import { preview } from "vite";
 const CartContent =createContext();
 export function CartContent({children}){


  const [cart, setCart] =useState(()=>{
    const stored =localStorage.getItem("cart");
  return stored ? JSON.parse(stored):[]});

  //to persist data to localstorage
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart));
  },[cart]);

  //to add items to cart

  const addItem=(item)=>{
    setCart((prev) => {
      const existing=prev.find((p) => p.id === item.id);
      if(existing){
        return prev.map((p)=> p.id === item.id ? {...p,qty:p. qty +1}:p);
      }
      return [...prev,{...item, qty:1}]
    });
  };

//to increase value of item in cart

const increment=(id)=>{
  setCart((prev)=>{
    prev.map((p) =>(p.id === id ? {...p, qty:p.qty+1}:p))
  });
};

//to decrease the value if o then remove from cart

const decrement=(id)=>{
  setCart((prev)=>
  prev.map((p)=> (p.id === id ? {...p, qty:p.qty-1}:p)).filter((p) => p.qty > 0)// remove the item if qty 
  );
};

//to remove item immediately
const removeItem=(id)=>{
  setCart((prev)=> prev.filter((P)=>P.id !==id));
}

//to clear cart
const clearCart=()=>setCart([]);

  // helper: robust price parser
  const parsePrice = (price) => {
    if (typeof price === "number" && isFinite(price)) return price;
    if (!price) return 0;
    // convert to string and strip currency symbols, spaces, and letters,
    // keep digits, minus and dot. remove commas.
    let s = String(price).trim();
    // remove all characters except digits, dot, minus
    s = s.replace(/[^0-9.\-]/g, "");
    // if multiple dots, keep first dot only
    const parts = s.split(".");
    if (parts.length > 2) {
      const first = parts.shift();
      s = first + "." + parts.join("");
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };
  


  return(
    <CartContent.Provider>
      {children}
    </CartContent.Provider>
  )
 }
 export const useCart=()=>useContext(CartContent);