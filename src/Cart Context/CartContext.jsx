import { createContext, useContext, useEffect, useState } from "react";
export const CartContext = createContext({
  cartItems: [],
  wishlistItems: [],
  getProductQuantity: () => {},
  AddProductToCart: () => {},
  RemoveProductFromCart: () => {},
  RemoveAllProductsFromCart: () => {},
  RemoveSelectedProduct: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedItems = localStorage.getItem("cartContainer");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartContainer", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getProductQuantity(product) {
    const foundProduct = cartProducts.find((p) => p.id === product.id);
    return foundProduct ? foundProduct.quantity : 0;
  }

  function AddProductToCart(product) {
    const existingProduct = cartProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      setCartProducts(
        cartProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  }

  function RemoveSelectedProduct(id) {
    setCartProducts(cartProducts.filter((p) => p.id !== id));
  }

  function RemoveProductFromCart(id) {
    setCartProducts(
      cartProducts
        .map((p) =>
          p.id === id && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0) // Filter out items with quantity zero
    );
  }

  function RemoveAllProductsFromCart() {
    setCartProducts([]);
  }

  const contextValue = {
    cartItems: cartProducts,
    getProductQuantity,
    AddProductToCart,
    RemoveProductFromCart,
    RemoveAllProductsFromCart,
    RemoveSelectedProduct,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(CartContext);
}
