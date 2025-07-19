import { TCartPost } from './TCartPost';

export type TOrder = {
	user: {
		name: string;
		address: string;
		phone: string;
	};
	order: TCartPost;
};
