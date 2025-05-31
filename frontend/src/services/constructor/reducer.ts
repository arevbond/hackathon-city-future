import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types/types';

type TIngredientWithKey = TIngredient & { key: string };

type TConstructorState = {
	bun: TIngredient | undefined | null;
	ingredients: TIngredientWithKey[];
};

const initialState: TConstructorState = {
	bun: null,
	ingredients: [],
};

export const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setIngredient: {
			reducer: (
				state,
				action: PayloadAction<{ ingredient: TIngredientWithKey }>
			) => {
				state.ingredients.push(action.payload.ingredient);
			},
			prepare: ({ ingredient }: { ingredient: TIngredient }) => {
				const key = nanoid();
				return { payload: { ingredient: { ...ingredient, key } } };
			},
		},
		removeIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient != action.payload.key
			);
		},
		setBun: (state, action) => {
			state.bun = action.payload.bun;
		},
		removeBun: (state) => {
			state.bun = null;
		},
		swapIngredient: (state, action) => {
			const updatedIngredients = [...state.ingredients];
			const { toIndex, fromIndex } = action.payload;
			updatedIngredients.splice(
				toIndex,
				0,
				updatedIngredients.splice(fromIndex, 1)[0]
			);
			state.ingredients = updatedIngredients;
		},
		deleteIngredient: (state, action) => {
			const removeUniqueId = action.payload.uniqueId;
			const newIngredients = [...state.ingredients].filter(
				(ingredient) => ingredient.key != removeUniqueId
			);
			state.ingredients = newIngredients;
		},
	},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getBun: (state) => state.bun,
		getFilling: (state) => state.ingredients,
	},
});

export const {
	setIngredient,
	removeIngredient,
	setBun,
	removeBun,
	swapIngredient,
	deleteIngredient,
} = constructorSlice.actions;
export const { getAllIngredients, getBun, getFilling } =
	constructorSlice.selectors;
