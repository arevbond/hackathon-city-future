export const URL_GET_INGREDIENTS =
	'https://norma.nomoreparties.space/api/ingredients';

export const URL_POST_PLACE_ORDER =
	'https://norma.nomoreparties.space/api/orders';

export const URL_POST_PASSWORD_RESET =
	'https://norma.nomoreparties.space/api/password-reset';

export const URL_POST_PASSWORD_RESET_RESET =
	'https://norma.nomoreparties.space/api/password-reset/reset';

export const URL_POST_AUTH_REGISTER =
	'https://norma.nomoreparties.space/api/auth/register';

export const URL_POST_AUTH_LOGIN =
	'https://norma.nomoreparties.space/api/auth/login';

export const URL_POST_AUTH_LOGOUT =
	'https://norma.nomoreparties.space/api/auth/logout';

export const URL_POST_AUTH_TOKEN =
	'https://norma.nomoreparties.space/api/auth/token';

export const URL_GET_AUTH_USER =
	'https://norma.nomoreparties.space/api/auth/user';

export const URL_PATCH_AUTH_USER =
	'https://norma.nomoreparties.space/api/auth/user';

export const urlWsConnect = (isAuth = false): string => {
	return !isAuth
		? 'wss://norma.nomoreparties.space/orders/all'
		: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem(
				'accessToken'
		  )}`;
};
