import dishesApi from '@/api/dishesApi';
import { TCartDish } from '@/types/TCartDish';
import { TDish } from '@/types/TDish';
import { TOrder } from '@/types/TOrder';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = {
	dishes: TDish[];
	isLoading: boolean;
	isPosting: boolean;
	error: string | null;
	cart: TCartDish[];
	isShowModal: boolean;
	isPosted: boolean;
	postError: string | null;
};

const namespace = 'dishes';
const initialState: TState = {
	dishes: [],
	isLoading: false,
	error: null,
	cart: [],
	isShowModal: false,
	isPosting: false,
	isPosted: false,
	postError: null,
};

export const getDishes = createAsyncThunk(
	`${namespace}/getDishes`,
	async () => {
		return await dishesApi.getDishes();
	},
);

export const postOrder = createAsyncThunk(
	`${namespace}/postOrder`,
	async (orderDetails: TOrder) => {
		return await dishesApi.postOrder(orderDetails);
	},
);

const dishesSlice = createSlice({
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
		toggleModal: (state) => {
			state.isShowModal = !state.isShowModal;
		},
		clearPostError: (state) => {
			state.postError = null;
		},
		clearIsPosted: (state) => {
			state.isPosted = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDishes.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getDishes.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to fetch dishes';
			})
			.addCase(getDishes.fulfilled, (state, action) => {
				state.dishes = action.payload || [];
				state.isLoading = false;
			})
			.addCase(postOrder.pending, (state) => {
				state.isPosting = true;
				state.postError = null;
				state.isPosted = false;
			})
			.addCase(postOrder.rejected, (state, action) => {
				state.isPosting = false;
				state.postError = action.error.message || 'Failed to place order';
				state.isPosted = false;
			})
			.addCase(postOrder.fulfilled, (state) => {
				state.isPosting = false;
				state.postError = null;
				state.isPosted = true;
			});
	},
});

export const { addToCart, toggleModal, clearPostError, clearIsPosted } =
	dishesSlice.actions;
export default dishesSlice.reducer;
