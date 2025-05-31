export type TOrder = {
	ingredients: string[];
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
};

export type TOrdersStream = {
	success: string;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

export const translateStatusOrder: Record<string, string> = {
	created: 'Создан',
	pending: 'Готовится',
	done: 'Выполнен',
};
