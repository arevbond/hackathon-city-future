import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	registerUserApi,
	logoutUserApi,
	getUserApi,
	loginUserApi,
	editingProfileUserApi,
} from '@utils/api';
import { TLoginUser, TRegisterUser } from '@utils/types/types';
import {
	TAuthUserResponse,
	TGetUserResponse,
	TLogoutUserResponse,
	TRegisterUserResponse,
	TRejectValue,
	TUpdateUser,
	TUpdateUserResponse,
} from '@utils/types/types-action-user/types';

export const registerUser = createAsyncThunk<
	TRegisterUserResponse,
	TRegisterUser,
	TRejectValue
>('user/register', async (arg, thunkApi) => {
	try {
		const response = await registerUserApi(arg);

		if (!response.success) {
			return thunkApi.rejectWithValue(response.message ?? 'Неизвестная ошибка');
		}
		return response;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});

export const logoutUser = createAsyncThunk<
	TLogoutUserResponse,
	void,
	TRejectValue
>('user/logout', async (arg, thunkApi) => {
	try {
		const data = await logoutUserApi();

		return data;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});

export const loginUser = createAsyncThunk<
	TAuthUserResponse,
	TLoginUser,
	TRejectValue
>('user/login', async (arg, thunkApi) => {
	try {
		const data = await loginUserApi(arg);
		if (!data.success) {
			return thunkApi.rejectWithValue(data.message ?? 'Неизвестная ошибка');
		}
		return data;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});

export const checkUserAuth = createAsyncThunk<
	TGetUserResponse,
	void,
	TRejectValue
>('user/checkUserAuth', async (arg, thunkApi) => {
	try {
		const response = await getUserApi();
		if (!response.success) return thunkApi.rejectWithValue(response.message);
		return response;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});

export const editProfileUser = createAsyncThunk<
	TUpdateUserResponse,
	TUpdateUser,
	TRejectValue
>('user/editProfileUser', async (arg, thunkApi) => {
	try {
		const response = await editingProfileUserApi(arg);
		if (!response.success) return thunkApi.rejectWithValue(response.message);

		return response;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});
