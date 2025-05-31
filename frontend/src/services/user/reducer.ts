import { createSlice } from '@reduxjs/toolkit';
import {
	checkUserAuth,
	editProfileUser,
	loginUser,
	logoutUser,
	registerUser,
} from './action';
import { TRegisterUser } from '@utils/types/types';

type TInitialUserState = {
	user: Omit<TRegisterUser, 'password'> | null;
	isAuthChecked: boolean;
	loading: boolean;
	error: string | null | undefined;
	hasError: boolean;
};

const initialState: TInitialUserState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: '',
	hasError: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		// (state, action)  было так, на случай чего-либо
		clearError: (state) => {
			state.error = null;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getUserLoading: (state) => state.loading,
		getUserError: (state) => state.error,
		getUserHasError: (state) => state.hasError,
		getIsAuthChecked: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.hasError = true;
			})
			.addCase(checkUserAuth.pending, (state) => {
				state.loading = true;
			})
			.addCase(checkUserAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(checkUserAuth.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.hasError = true;
				state.isAuthChecked = true;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.hasError = false;
				state.user = null;
				state.isAuthChecked = true;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.hasError = true;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.error = action.payload;
				state.hasError = true;
			})
			.addCase(editProfileUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(editProfileUser.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(editProfileUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.error = action.payload;
				state.hasError = true;
			});
	},
});

export const {
	getUser,
	getUserLoading,
	getUserError,
	getUserHasError,
	getIsAuthChecked,
} = userSlice.selectors;

export const { setUser, clearError } = userSlice.actions;
