import { createAction } from '@reduxjs/toolkit';
import { TOrdersStream } from '@utils/types/types-orders-stream/types';

export const connect = createAction<string, 'ordersStream/connect'>(
	'ordersStream/connect'
);
export const disconnect = createAction('ordersStream/disconnect');

export const onConnecting = createAction('ordersStream/onConnecting');
export const onOpen = createAction('ordersStream/onOpen');
export const onClose = createAction('ordersStream/onClose');
export const onError = createAction<string, 'ordersStream/onError'>(
	'ordersStream/onError'
);
export const onMessage = createAction<TOrdersStream, 'ordersStream/onMessage'>(
	'ordersStream/onMessage'
);

export type TOrdersStreamActions =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
