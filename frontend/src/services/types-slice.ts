import { constructorSlice } from './constructor/reducer';
import { ingredientInfoSlice } from './ingredient-info/reducer';
import { getAllIngredients } from './ingredients/action';
import { ingredientsSlice } from './ingredients/reducer';
import { postPlaceOrder } from './order/action';
import { orderSlice } from './order/reducer';
import {
	checkUserAuth,
	editProfileUser,
	loginUser,
	logoutUser,
	registerUser,
} from './user/action';
import { userSlice } from './user/reducer';

const constructorActions = constructorSlice.actions;
export type TConstructorActions =
	| ReturnType<typeof constructorActions.deleteIngredient>
	| ReturnType<typeof constructorActions.removeBun>
	| ReturnType<typeof constructorActions.removeIngredient>
	| ReturnType<typeof constructorActions.setBun>
	| ReturnType<typeof constructorActions.setIngredient>
	| ReturnType<typeof constructorActions.swapIngredient>;

const ingredientInfoActions = ingredientInfoSlice.actions;
export type TIngredientInfoActions =
	| ReturnType<typeof ingredientInfoActions.closeIngredientDetails>
	| ReturnType<typeof ingredientInfoActions.removeIngredientDetails>
	| ReturnType<typeof ingredientInfoActions.setIngredientDetails>;

const ingredientsActions = ingredientsSlice.actions; // пусто
export type TIngredientsActions =
	| ReturnType<typeof getAllIngredients.pending>
	| ReturnType<typeof getAllIngredients.rejected>
	| ReturnType<typeof getAllIngredients.fulfilled>;

const orderActions = orderSlice.actions;
type TOrderSlice = ReturnType<typeof orderActions.closeModal>;
type TOrderThunk =
	| ReturnType<typeof postPlaceOrder.pending>
	| ReturnType<typeof postPlaceOrder.fulfilled>
	| ReturnType<typeof postPlaceOrder.rejected>;
export type TOrderActions = TOrderSlice | TOrderThunk;

const userActions = userSlice.actions;
type TUserSlice =
	| ReturnType<typeof userActions.clearError>
	| ReturnType<typeof userActions.setUser>;
type TUserSlices =
	| ReturnType<typeof registerUser.pending>
	| ReturnType<typeof registerUser.fulfilled>
	| ReturnType<typeof registerUser.rejected>
	| ReturnType<typeof logoutUser.pending>
	| ReturnType<typeof logoutUser.fulfilled>
	| ReturnType<typeof logoutUser.rejected>
	| ReturnType<typeof loginUser.pending>
	| ReturnType<typeof loginUser.fulfilled>
	| ReturnType<typeof loginUser.rejected>
	| ReturnType<typeof checkUserAuth.pending>
	| ReturnType<typeof checkUserAuth.fulfilled>
	| ReturnType<typeof checkUserAuth.rejected>
	| ReturnType<typeof editProfileUser.pending>
	| ReturnType<typeof editProfileUser.fulfilled>
	| ReturnType<typeof editProfileUser.rejected>;
export type TUserActions = TUserSlice | TUserSlices;
