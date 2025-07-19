import { TDish } from '@/types/TDish';
import { axiosInstance } from './axios';

const dishesApi = {
	getDishes: async () => {
		try {
			const response = await axiosInstance.get('/dishes.json');

			if (!response.data) {
				throw new Error('No dishes found');
			}

			const dishes: TDish[] = Object.keys(response.data).map((key) => ({
				...response.data[key],
				name: key,
			}));

			return dishes;
		} catch (error) {
			console.error('Error fetching dishes:', error);
			throw error instanceof Error
				? error
				: new Error('Failed to fetch dishes');
		}
	},
};

export default dishesApi;
