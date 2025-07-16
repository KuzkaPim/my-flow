import { TCartPost } from './TCartPost';

export type TOrder = {
	user: {
		name: string;
		address: string;
		phone: string;
	};
	cart: TCartPost;
	totalPrice: number;
};
