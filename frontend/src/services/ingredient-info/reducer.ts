import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types/types';

type TStateIngredientInfo = {
	ingredient: TIngredient | null;
	isOpenModal: boolean;
};

const initialState: TStateIngredientInfo = {
	ingredient: null,
	isOpenModal: false,
};

export const ingredientInfoSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		setIngredientDetails: (state, action) => {
			state.ingredient = action.payload;
			state.isOpenModal = !state.isOpenModal;
		},
		removeIngredientDetails: (state) => {
			state.ingredient = null;
			state.isOpenModal = !state.isOpenModal;
		},
		closeIngredientDetails: (state) => {
			state.isOpenModal = false;
		},
	},
	selectors: {
		getDataIngredientDetails: (state) => state.ingredient,
		getActiveIngredientDetails: (state) => state.isOpenModal,
	},
});

export const {
	setIngredientDetails,
	removeIngredientDetails,
	closeIngredientDetails,
} = ingredientInfoSlice.actions;
export const { getDataIngredientDetails, getActiveIngredientDetails } =
	ingredientInfoSlice.selectors;
