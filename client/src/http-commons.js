import axios from 'axios';

let URL;


if (process.env.NODE_ENV === 'development') {
	URL = 'https://localhost:5000/api';
} 





const axiosInstance = axios.create({
	baseURL: URL
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);
export default axiosInstance;