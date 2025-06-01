import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/reducer';

const rootReducer = combineSlices(userSlice);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
});

console.log('redux_store: ', store.getState());

export const getStore = () => store.getState();

export default store;
