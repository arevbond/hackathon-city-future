import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllIngredientsApi } from '@utils/api';
import { TIngredient } from '@utils/types/types';

type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
};

// type TReject = {
// 	success?: boolean;
// 	rejectValue?: string;
// 	message?: string;
// };

export const getAllIngredients = createAsyncThunk<
	TIngredientsResponse,
	void,
	{ rejectValue: string }
>('ingredients/getAllIngredients', async (_, thunkApi) => {
	try {
		const data = await getAllIngredientsApi();
		return data as TIngredientsResponse;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});
