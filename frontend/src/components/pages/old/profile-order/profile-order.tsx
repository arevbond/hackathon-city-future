import { connect, disconnect } from '@services/ordersStream/actions';
import { getOrders } from '@services/ordersStream/reducer';
import { useDispatch, useSelector } from '@services/store';
import { urlWsConnect } from '@utils/url';
import { useEffect } from 'react';
import { OrderCard } from '../../../burger-orders/order-card/order-card';
import { nanoid } from '@reduxjs/toolkit';

import styles from './styles.module.css';

export const ProfileOrder = () => {
	const dispatch = useDispatch();
	const orders = useSelector(getOrders);

	console.log(orders);
	useEffect(() => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			dispatch(connect(urlWsConnect(true))); // генерирует URL c токеном
		}

		return () => {
			dispatch(disconnect());
		};
	}, []);
	return (
		<div className={styles.orders}>
			{orders.map((order) => (
				<OrderCard key={nanoid()} {...order} />
			))}
		</div>
	);
};
