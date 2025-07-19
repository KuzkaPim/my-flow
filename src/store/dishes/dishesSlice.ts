import dishesApi from '@/api/dishesApi';
import { TDish } from '@/types/TDish';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TState = {
	dishes: TDish[];
	isLoading: boolean;
	error: string | null;
	isShowModal: boolean;
};

const namespace = 'dishes';
const initialState: TState = {
	dishes: [],
	isLoading: false,
	error: null,
	isShowModal: false,
};

export const getDishes = createAsyncThunk(
	`${namespace}/getDishes`,
	async () => {
		return await dishesApi.getDishes();
	},
);

const dishesSlice = createSlice({
	name: namespace,
	initialState,
	reducers: {},
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
			});
	},
});

export default dishesSlice.reducer;
