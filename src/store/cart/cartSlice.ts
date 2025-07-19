import cartApi from '@/api/cartApi';
import { TCartDish } from '@/types/TCartDish';
import { TDish } from '@/types/TDish';
import { TOrder } from '@/types/TOrder';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = {
	cart: TCartDish[];
	isLoading: boolean;
	error: string | null;
	isShowModalCart: boolean;
};

const namespace = 'cart';
const initialState: TState = {
	cart: [],
	isLoading: false,
	error: null,
	isShowModalCart: false,
};

export const postOrder = createAsyncThunk(
	`${namespace}/postOrder`,
	async (orderDetails: TOrder) => {
		return await cartApi.postOrder(orderDetails);
	},
);

const cartSlice = createSlice({
	name: namespace,
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<{ dish: TDish; count?: -1 }>) => {
			const { dish, count } = action.payload;
			const existingItem = state.cart.find(
				(item) => item.dish.name === dish.name,
			);

			if (existingItem && count !== -1) {
				existingItem.count += 1;
				return;
			}

			if (existingItem && count === -1) {
				if (existingItem.count > 1) {
					existingItem.count -= 1;
					return;
				}
				state.cart = state.cart.filter((item) => item.dish.name !== dish.name);
				return;
			}

			state.cart.push({ count: 1, dish });
		},
		toggleModalCart: (state) => {
			state.isShowModalCart = !state.isShowModalCart;
		},
		clearCart: (state) => {
			state.cart = [];
			state.isShowModalCart = false;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postOrder.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(postOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to post order';
			})
			.addCase(postOrder.fulfilled, (state) => {
				state.isShowModalCart = false;
				state.cart = [];
				state.isLoading = false;
			});
	},
});

export const { addToCart, toggleModalCart, clearCart, clearError } =
	cartSlice.actions;
export default cartSlice.reducer;
