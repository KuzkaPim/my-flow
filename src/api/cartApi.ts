import { TOrder } from '@/types/TOrder';
import { axiosInstance } from './axios';

const cartApi = {
	postOrder: async (orderDetails: TOrder) => {
		try {
			const response = await axiosInstance.post('/orders.json', orderDetails);

			if (!response.data) {
				throw new Error('Failed to place order');
			}

			return response.data;
		} catch (error) {
			console.error('Error placing order:', error);
			throw error instanceof Error ? error : new Error('Failed to place order');
		}
	},
};

export default cartApi;
