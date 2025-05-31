import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { refreshTokenWithWs } from '@utils/api';

export type TWsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	sendMessage?: ActionCreatorWithPayload<S>;
	onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
	wsActions: TWsActions<R, S>,
	withTokenRefresh = false
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			sendMessage,
			onOpen,
			onClose,
			onError,
			onMessage,
			onConnecting,
			disconnect,
		} = wsActions;
		const { dispatch } = store;
		let isConnected = false;
		let url = '';
		let reconnectId = 0;

		return (next) => (action) => {
			if (connect.match(action)) {
				socket = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('Unknown error'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						// пришлось добавить window, т.к. была ошибка Type 'Timeout' is not assignable to type 'number'.
						reconnectId = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);

						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshTokenWithWs()
								.then((accessToken) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set('token', accessToken);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});

							dispatch(disconnect());
							return;
						}

						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};

				return;
			}

			if (sendMessage?.match(action) && socket) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}

				return;
			}

			if (disconnect.match(action)) {
				clearTimeout(reconnectId);
				reconnectId = 0;
				isConnected = false;
				socket?.close();
				socket = null;

				return;
			}

			next(action);
		};
	};
};
