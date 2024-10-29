import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Add the new item with its unique benefits and additionalDetails
      const newItem = {
        ...action.payload, // includes id, name, description, etc.
        benefits: action.payload.benefits || [], // each item has its own benefits
        additionalDetails: action.payload.additionalDetails || [], // each item has its own additional details
      };
      state.items.push(newItem); // Append to items array instead of overwriting
    },
    updateBenefitsForItem: (state, action) => {
      const { itemId, benefits } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.benefits = benefits;
      }
    },
    updateDetailsForItem: (state, action) => {
      const { itemId, additionalDetails } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.additionalDetails = additionalDetails;
      }
    },
  },
});

export const { addItem, updateBenefitsForItem, updateDetailsForItem } = itemsSlice.actions;
export default itemsSlice.reducer;
