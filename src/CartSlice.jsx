import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // addItem(): agrega un artículo o aumenta su cantidad
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Detalles del producto

      // Ver si ya existe en el carrito
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        // Si ya existe, aumentar cantidad
        existingItem.quantity++;
      } else {
        // Si no existe, agregarlo con quantity = 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // removeItem(): elimina un artículo según su nombre
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // updateQuantity(): actualiza la cantidad de un artículo
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // nombre y nueva cantidad
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
