import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { ingredientInfoSlice } from './ingredient-info/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { orderSlice } from './order/reducer';
import { constructorSlice } from './constructor/reducer';
import { userSlice } from './user/reducer';
import {
	TConstructorActions,
	TIngredientInfoActions,
	TIngredientsActions,
	TOrderActions,
	TUserActions,
} from './types-slice';
import { socketMiddleware } from './middleware/websocket-middleware';
import {
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
	TOrdersStreamActions,
} from './ordersStream/actions';
import { orderStreamSlice } from './ordersStream/reducer';

const rootReducer = combineSlices(
	ingredientInfoSlice,
	ingredientsSlice,
	orderSlice,
	constructorSlice,
	userSlice,
	orderStreamSlice
);

const ordersStreamMiddleware = socketMiddleware({
	connect: connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares().concat(ordersStreamMiddleware),
});

export type AppActions =
	| TConstructorActions
	| TIngredientInfoActions
	| TIngredientsActions
	| TOrderActions
	| TUserActions
	| TOrdersStreamActions;
console.log('redux_store: ', store.getState());

export const getStore = () => store.getState();
// при использовании WS тут начинается ошибка
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
