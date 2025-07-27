// import { createContext, useContext, useState, ReactNode } from "react";

// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   weight?: string;
// };

// type CartContextType = {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => {
//     console.log("🛒 CartContext.addToCart called with:", item); // Debug log
    
//     setCartItems((prev) => {
//       console.log("🛒 Previous cart items:", prev); // Debug log
      
//       const exists = prev.find((i) => i.id === item.id);
      
//       if (exists) {
//         console.log("🛒 Item exists, updating quantity"); // Debug log
//         const updated = prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//         );
//         console.log("🛒 Updated cart items:", updated); // Debug log
//         return updated;
//       }
      
//       console.log("🛒 New item, adding to cart"); // Debug log
//       const newCart = [...prev, item];
//       console.log("🛒 New cart items:", newCart); // Debug log
//       return newCart;
//     });
//   };

//   const removeFromCart = (id: string) => {
//     console.log("🛒 Removing from cart:", id); // Debug log
//     setCartItems((prev) => {
//       const filtered = prev.filter((i) => i.id !== id);
//       console.log("🛒 Cart after removal:", filtered); // Debug log
//       return filtered;
//     });
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     console.log("🛒 Updating quantity:", { id, quantity }); // Debug log
//     setCartItems((prev) => {
//       const updated = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
//       console.log("🛒 Cart after quantity update:", updated); // Debug log
//       return updated;
//     });
//   };

//   // Debug: Log cart items whenever they change
//   console.log("🛒 Current cart items:", cartItems);

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     console.error("❌ useCart must be used within CartProvider");
//     throw new Error("useCart must be used within CartProvider");
//   }
//   console.log("🛒 useCart called, returning context:", context); // Debug log
//   return context;
// };


import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void; // Added this function
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);


  const addToCart = (item: CartItem) => {
    console.log("🛒 CartContext.addToCart called with:", item);
    
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      
      if (exists) {
        console.log("🛒 Item exists, updating quantity");
        const updated = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
        console.log("🛒 Updated cart items:", updated);
        return updated;
      }
      
      console.log("🛒 New item, adding to cart");
      const newCart = [...prev, item];
      console.log("🛒 New cart items:", newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    console.log("🛒 Removing from cart:", id);
    setCartItems((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      console.log("🛒 Cart after removal:", filtered);
      return filtered;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    console.log("🛒 Updating quantity:", { id, quantity });
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
      console.log("🛒 Cart after quantity update:", updated);
      return updated;
    });
  };

  const clearCart = () => {
    console.log("🛒 Clearing cart");
    setCartItems([]);
  };

  // Debug: Log cart items whenever they change
  console.log("🛒 Current cart items:", cartItems);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error("❌ useCart must be used within CartProvider");
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};