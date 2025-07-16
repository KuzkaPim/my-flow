import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://kp-proger-default-rtdb.firebaseio.com/',
});
