import { createContext, useContext, useReducer, useCallback } from "react";

const CartContext = createContext(null);

const CART_ACTIONS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  ADD_PUJA: "ADD_PUJA",
  SET_PANDIT_BOOKING: "SET_PANDIT_BOOKING",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  REMOVE_PUJA: "REMOVE_PUJA",
  CLEAR_PANDIT: "CLEAR_PANDIT",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR: "CLEAR",
  CLEAR_ORDER_ITEMS: "CLEAR_ORDER_ITEMS",
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_PRODUCT: {
      const { id, name, price } = action.payload;
      const existing = state.productItems.find((i) => i.itemId === id);
      if (existing) {
        return {
          ...state,
          productItems: state.productItems.map((i) =>
            i.itemId === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        productItems: [...state.productItems, { itemId: id, name, price, quantity: 1 }],
      };
    }
    case CART_ACTIONS.ADD_PUJA: {
      const { id, name, price } = action.payload;
      const existing = state.pujaItems.find((i) => i.pujaTypeId === id);
      if (existing) {
        return {
          ...state,
          pujaItems: state.pujaItems.map((i) =>
            i.pujaTypeId === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        pujaItems: [...state.pujaItems, { pujaTypeId: id, name, price, quantity: 1 }],
      };
    }
    case CART_ACTIONS.SET_PANDIT_BOOKING:
      return { ...state, panditBooking: action.payload };
    case CART_ACTIONS.REMOVE_PRODUCT:
      return { ...state, productItems: state.productItems.filter((i) => i.itemId !== action.payload) };
    case CART_ACTIONS.REMOVE_PUJA:
      return { ...state, pujaItems: state.pujaItems.filter((i) => i.pujaTypeId !== action.payload) };
    case CART_ACTIONS.CLEAR_PANDIT:
      return { ...state, panditBooking: null };
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, pujaTypeId, quantity } = action.payload;
      if (itemId != null) {
        if (quantity <= 0) return { ...state, productItems: state.productItems.filter((i) => i.itemId !== itemId) };
        return {
          ...state,
          productItems: state.productItems.map((i) =>
            i.itemId === itemId ? { ...i, quantity } : i
          ),
        };
      }
      if (pujaTypeId != null) {
        if (quantity <= 0) return { ...state, pujaItems: state.pujaItems.filter((i) => i.pujaTypeId !== pujaTypeId) };
        return {
          ...state,
          pujaItems: state.pujaItems.map((i) =>
            i.pujaTypeId === pujaTypeId ? { ...i, quantity } : i
          ),
        };
      }
      return state;
    }
    case CART_ACTIONS.CLEAR:
      return { productItems: [], pujaItems: [], panditBooking: null };
    case CART_ACTIONS.CLEAR_ORDER_ITEMS:
      return { ...state, productItems: [], pujaItems: [] };
    default:
      return state;
  }
}

const initialState = { productItems: [], pujaItems: [], panditBooking: null };

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = useCallback((product) => {
    const id = product.id ?? product._id;
    dispatch({ type: CART_ACTIONS.ADD_PRODUCT, payload: { id, name: product.name, price: product.price ?? 0 } });
  }, []);

  const addPuja = useCallback((puja) => {
    dispatch({ type: CART_ACTIONS.ADD_PUJA, payload: { id: puja.id, name: puja.name, price: puja.price ?? puja.basePrice ?? 0 } });
  }, []);

  const setPanditBooking = useCallback((details) => {
    dispatch({ type: CART_ACTIONS.SET_PANDIT_BOOKING, payload: details });
  }, []);

  const removeProduct = useCallback((itemId) => dispatch({ type: CART_ACTIONS.REMOVE_PRODUCT, payload: itemId }), []);
  const removePuja = useCallback((pujaTypeId) => dispatch({ type: CART_ACTIONS.REMOVE_PUJA, payload: pujaTypeId }), []);
  const clearPandit = useCallback(() => dispatch({ type: CART_ACTIONS.CLEAR_PANDIT }), []);
  const updateQuantity = useCallback((payload) => dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload }), []);
  const clearCart = useCallback(() => dispatch({ type: CART_ACTIONS.CLEAR }), []);
  const clearOrderItems = useCallback(() => dispatch({ type: CART_ACTIONS.CLEAR_ORDER_ITEMS }), []);

  const cartCount =
    cart.productItems.reduce((s, i) => s + i.quantity, 0) +
    cart.pujaItems.reduce((s, i) => s + i.quantity, 0) +
    (cart.panditBooking ? 1 : 0);

  const totalAmount =
    cart.productItems.reduce((s, i) => s + (i.price || 0) * i.quantity, 0) +
    cart.pujaItems.reduce((s, i) => s + (i.price || 0) * i.quantity, 0) +
    (cart.panditBooking?.totalAmount ?? 0);

  const value = {
    cart,
    cartCount,
    totalAmount,
    addProduct,
    addPuja,
    setPanditBooking,
    removeProduct,
    removePuja,
    clearPandit,
    updateQuantity,
    clearCart,
    clearOrderItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
