import { TRegisterUser } from '../types';

export type TRejectValue = { rejectValue: string };

export type TLogoutUser = Pick<TResetPassword, 'token'>;
export type TLogoutUserResponse = {
	success: boolean;
	message: string;
};

export type TResetPassword = {
	password: string;
	token: string;
};
export type TResetPasswordResponse = TLogoutUserResponse;

export type TRegisterUserResponse = Pick<TLogoutUserResponse, 'success'> & {
	user: Pick<TRegisterUser, 'email' | 'name'>;
};

export type TAuthUserResponse = TRegisterUserResponse;

export type TGetUserResponse = TAuthUserResponse;

export type TUpdateUser = TRegisterUser;
export type TUpdateUserResponse = TAuthUserResponse;
