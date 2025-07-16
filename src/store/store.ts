import { configureStore } from '@reduxjs/toolkit';
import dishesSlice from './dishes/dishesSlice';

const store = configureStore({
	reducer: {
		dishes: dishesSlice,
	},
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TAppStore = typeof store;

export default store;
