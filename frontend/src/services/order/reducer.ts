import { createSlice } from '@reduxjs/toolkit';
import { postPlaceOrder } from './action';

type TOrderState = {
	orderNumbers: number[];
	requestCompleted: boolean;
	isOpen: boolean;
	loading: boolean;
	orderError: string | undefined;
	isError: boolean;
};

const initialState: TOrderState = {
	orderNumbers: [],
	requestCompleted: false,
	isOpen: false,
	loading: false,
	orderError: '',
	isError: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		closeModal: (state) => {
			state.isOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postPlaceOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(postPlaceOrder.fulfilled, (state, action) => {
				state.orderNumbers.push(action.payload.order.number);
				state.loading = false;
				state.isOpen = true;
				state.requestCompleted = true;
			})
			.addCase(postPlaceOrder.rejected, (state, action) => {
				state.orderError = action.payload;
				state.isError = true;
				state.loading = false;
				state.isOpen = true;
				state.requestCompleted = true;
			});
	},
	selectors: {
		getOrderNumber: (state) =>
			state.orderNumbers[state.orderNumbers.length - 1],
		getRequestCompleted: (state) => state.requestCompleted,
		getIsOpen: (state) => state.isOpen,
		getLoading: (state) => state.loading,
		getOrderError: (state) => state.orderError,
		getIsError: (state) => state.isError,
	},
});

export const { closeModal } = orderSlice.actions;
export const {
	getOrderNumber,
	getRequestCompleted,
	getIsOpen,
	getLoading,
	getOrderError,
	getIsError,
} = orderSlice.selectors;
