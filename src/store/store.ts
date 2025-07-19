import { configureStore } from '@reduxjs/toolkit';
import dishesSlice from './dishes/dishesSlice';
import cartSlice from './cart/cartSlice';

const store = configureStore({
	reducer: {
		dishes: dishesSlice,
		cart: cartSlice,
	},
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TAppStore = typeof store;

export default store;
