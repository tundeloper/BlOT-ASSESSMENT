import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
	getBrowserLocalStorage,
	IAuthTokens,
	applyAuthTokenInterceptor,
	TokenRefreshRequest,
} from "axios-jwt";
import { ApiResponse } from "../types/auth";
import { getAuthTokensFromLocalStorage } from "@/store/authstore";

// const baseURL = import.meta.env.VITE_API_URL as string;
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const tokens = getAuthTokensFromLocalStorage();

const apiClient = axios.create({
	baseURL,
	headers: {
		Accept: "application/json",
		Authorization: tokens
			? `Bearer ${tokens}`
			: undefined,
	},
	proxy: {
		port: 443,
		protocol: "https",
		host: "sportLaze.azure.app",
	},
});

const requestRefresh: TokenRefreshRequest = async (): Promise<
	IAuthTokens | string
> => {
	const response = await axios.post(`${baseURL}/auth/login`);
	return {
		accessToken: response.data.token,
		refreshToken: response.data,
	};
};

applyAuthTokenInterceptor(apiClient, {
	requestRefresh,
	getStorage: getBrowserLocalStorage,
});
export default function getApiClient() {
	return apiClient;
}

function handleError<T>(error: AxiosError<ApiResponse<T>>): ApiResponse<T> {
	if (error.response?.data?.message) {
		return {
			...error.response.data,
			success: false,
			message: error.response.data.message,
		};
	} else if (error.response) {
		return {
			data: {} as T,
			success: false,
			message: error.response.statusText || "Server error",
		};
	} else if (error.request) {
		return {
			data: {} as T,
			success: false,
			message: `No response from server: ${error.message}`,
		};
	} else {
		return {
			data: {} as T,
			success: false,
			message: error.message ?? "Unknown error",
		};
	}
}

async function requestRunner<T, P>(
	func: (params: P) => Promise<AxiosResponse<ApiResponse<T>>>,
	params: P
): Promise<ApiResponse<T>> {
	return func(params)
		.then(
			(res) => res.data,
			(e) => handleError<T>(e)
		)
		.catch((e) => handleError(e));
}

export async function get<T>(props: {
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.get(params.url, params.config),
		props
	);
}

export async function post<T, D>(props: {
	data: D;
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.post(params.url, params.data, params.config),
		props
	);
}

export async function upload<T, D extends FormData>(props: {
	data: D;
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.post(params.url, params.data, params.config),
		{
			...props,
			config: {
				...props.config,
				headers: {
					...props.config?.headers,
					"Content-Type": "multipart/form-data",
				},
			},
		}
	);
}

export async function remove<T>(props: {
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.delete(params.url, params.config),
		props
	);
}

export async function update<T, D>(props: {
	data: D;
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.patch(params.url, params.data, params.config),
		props
	);
}
export async function updatePut<T, D>(props: {
	data: D;
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.put(params.url, params.data, params.config),
		props
	);
}

export async function reupload<T, D extends FormData>(props: {
	data: D;
	url: string;
	config?: AxiosRequestConfig<unknown>;
}): Promise<ApiResponse<T>> {
	return requestRunner(
		(params) => apiClient.post(params.url, params.data, params.config),
		{
			...props,
			config: {
				...props.config,
				headers: {
					...props.config?.headers,
					"Content-Type": "multipart/form-data",
				},
			},
		}
	);
}
