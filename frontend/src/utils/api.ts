import {
	TAccessToken,
	TEditingProfileUser,
	TLoginUser,
	TRegisterUser,
	TRequestOptions,
	TResetPassword,
} from './types/types';
import {
	URL_GET_AUTH_USER,
	URL_GET_INGREDIENTS,
	URL_PATCH_AUTH_USER,
	URL_POST_AUTH_LOGIN,
	URL_POST_AUTH_LOGOUT,
	URL_POST_AUTH_REGISTER,
	URL_POST_AUTH_TOKEN,
	URL_POST_PASSWORD_RESET,
	URL_POST_PASSWORD_RESET_RESET,
	URL_POST_PLACE_ORDER,
} from './url';

const getResponse = async <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return await res.json();
	}

	throw new Error(
		`Error ${res.status}: 
    ${res.statusText}`
	);
};

export const getAllIngredientsApi = async () => {
	try {
		const response = await fetch(URL_GET_INGREDIENTS);
		return await getResponse(response);
	} catch (e) {
		throw e;
	}
};

export const postPlaceOrderApi = async (body: string[]) => {
	try {
		const accessToken: TAccessToken = localStorage.getItem('accessToken');

		const response = await fetchWithAuthRefreshTokenApi(URL_POST_PLACE_ORDER, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json ;charset=utf-8',
			},
			body: JSON.stringify({ ingredients: body }),
		});

		const data = await getResponse(response);

		return data;
	} catch (e) {
		throw e;
	}
};

async function fetchWithAuthRefreshTokenApi(
	url: string,
	options: TRequestOptions,
	retry = true
) {
	const accessToken = localStorage.getItem('accessToken');
	options.headers = {
		...(options.headers || {}),
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': 'application/json;charset=utf-8',
	};

	const response: Response = await fetch(url, options);

	// Если токен истёк
	if ((response.status === 403 || response.status === 401) && retry) {
		const refreshToken = localStorage.getItem('refreshToken');

		const tokenResponse = await fetch(
			URL_POST_AUTH_TOKEN, // переобновление токена
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ token: refreshToken }),
			}
		);

		if (tokenResponse.ok) {
			const newTokens = await tokenResponse.json();
			const accessToken = newTokens.accessToken.split(' ')[1];

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', newTokens.refreshToken);

			options.headers = {
				...(options.headers || {}),
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json;charset=utf-8',
			};
			// Повторяем оригинальный запрос с новым токеном

			return fetchWithAuthRefreshTokenApi(url, options, false);
			// return newTokens ? newTokens.statusText : 'Необходимо авторизоваться';
		} else {
			const errorData = await tokenResponse.json();
			console.error('Ошибка обновления токена:', errorData);

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			throw new Error(errorData.message || 'Ошибка обновления токена');
		}
	}

	return response;
}

export const registerUserApi = async (userData: TRegisterUser) => {
	try {
		const response = await fetch(URL_POST_AUTH_REGISTER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (response.ok) {
			const accessToken = data.accessToken.split(' ')[1];
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);

			const { success, user } = data;
			return { success, user };
		} else {
			console.error('Registration error:', data.message);
			return data;
		}
	} catch (error) {
		console.error('Request failed:', error);
	}
};

export const logoutUserApi = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	const accessToken = localStorage.getItem('accessToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_POST_AUTH_LOGOUT, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ token: refreshToken }),
		});

		if (!res.ok) {
			throw new Error(`Ошибка выхода: ${res.status}`);
		}

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		const data = await res.json();

		return data;
	} catch (err) {
		throw err;
	}
};

export const loginUserApi = async (body: TLoginUser) => {
	try {
		const response = await fetch(URL_POST_AUTH_LOGIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (response.ok) {
			const accessToken = data.accessToken.split(' ')[1];

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);

			return { user: data.user, success: data.success };
		} else {
			console.error('Registration error:', data.message);
			return data;
		}
	} catch (error) {
		console.error('Request failed:', error);
	}
};

export const getUserApi = async () => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_GET_AUTH_USER, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
		});
		if (typeof res === 'string') {
			return {
				success: false,
				message: res,
			};
		}
		const response = await res.json();

		return response;
	} catch (error) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw error;
	}
};

export const patchRefreshDataUserApi = async (body: TRegisterUser) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_PATCH_AUTH_USER, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ user: body }),
		});
		const response = await res.json();
		return response;
	} catch (error) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw error;
	}
};

export const forgotPasswordApi = async (body: { email: string }) => {
	try {
		const res = await fetch(URL_POST_PASSWORD_RESET, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body),
		});
		if (res.ok) {
			localStorage.setItem('resetPassword', 'true');
			const response = await res.json();
			return response;
		} else {
			const response = await res.json();
			return response;
		}
	} catch (error) {
		throw error;
	}
};

export const resetPasswordApi = async (body: TResetPassword) => {
	try {
		const res = await fetch(URL_POST_PASSWORD_RESET_RESET, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body),
		});
		if (res.ok) {
			localStorage.removeItem('resetPassword');
			const response = await res.json();
			return response;
		} else {
			const response = await res.json();
			return response;
		}
	} catch (error) {
		throw error;
	}
};

export const editingProfileUserApi = async (body: TEditingProfileUser) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_PATCH_AUTH_USER, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			throw new Error(`Ошибка выхода: ${res.status}`);
		}

		const data = await res.json();

		return data;
	} catch (err) {
		throw err;
	}
};

export const refreshTokenWithWs = async () => {
	const refreshToken = localStorage.getItem('refreshToken');

	if (!refreshToken) {
		throw new Error('Refresh token is missing');
	}

	const tokenResponse = await fetch(
		URL_POST_AUTH_TOKEN, // переобновление токена
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ token: refreshToken }),
		}
	);

	if (tokenResponse.ok) {
		const newTokens = await tokenResponse.json();
		const accessToken = newTokens.accessToken.split(' ')[1];

		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', newTokens.refreshToken);
		return accessToken;
	} else {
		const errorData = await tokenResponse.json();
		console.error('Ошибка обновления токена:', errorData);

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		throw new Error(errorData.message || 'Ошибка обновления токена');
	}
};
