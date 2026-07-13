import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id && i.size === action.item.size);
      if (exists) return { ...state, items: state.items.map(i => i.id === action.item.id && i.size === action.item.size ? { ...i, qty: i.qty + 1 } : i) };
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE': return { ...state, items: state.items.filter(i => !(i.id === action.id && i.size === action.size)) };
    case 'QTY': return { ...state, items: state.items.map(i => i.id === action.id && i.size === action.size ? { ...i, qty: action.qty } : i) };
    case 'CLEAR': return { ...state, items: [] };
    default: return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const add = item => dispatch({ type: 'ADD', item });
  const remove = (id, size) => dispatch({ type: 'REMOVE', id, size });
  const setQty = (id, size, qty) => dispatch({ type: 'QTY', id, size, qty });
  const clear = () => dispatch({ type: 'CLEAR' });
  const total = state.items.reduce((a, i) => a + i.price * i.qty, 0);
  const count = state.items.reduce((a, i) => a + i.qty, 0);
  return <CartContext.Provider value={{ items: state.items, add, remove, setQty, clear, total, count }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
