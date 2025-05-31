import { createAsyncThunk } from '@reduxjs/toolkit';
import { postPlaceOrderApi } from '@utils/api';
import { TIngredient } from '@utils/types/types';

type TOwner = {
	name: string;
	updatedAt: string;
	createdAt: string;
	email: string;
};

type TOrder = {
	createdAt: string;
	ingredient: TIngredient[];
	name: string;
	number: number;
	owner: TOwner;
	price: number;
	status: string;
	updatedAt: string;
	_id: number;
};

type TOrderResponse = {
	success: true;
	name: string;
	order: TOrder;
};

type TArg = string[];

export const postPlaceOrder = createAsyncThunk<
	TOrderResponse,
	TArg,
	{ rejectValue: string }
>('order/postPlaceOrder', async (arg, thunkApi) => {
	try {
		const data = await postPlaceOrderApi(arg);
		console.log(data);
		return data as TOrderResponse;
	} catch (e: any) {
		return thunkApi.rejectWithValue(e.message || 'Неизвестная ошибка');
	}
});
