import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../modal/modal';

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '@services/store';
import { getMapIngredients } from '@services/ingredients/reducer';
import {
	TOrder,
	translateStatusOrder,
} from '@utils/types/types-orders-stream/types';
import { getOrders } from '@services/ordersStream/reducer';
import { Cash } from '../cash/cash';
import { CompoundIngredientDetails } from './compound-ingredient-details/compound-ingredient-details';
import styles from './styles.module.css';

type TIngredientMap = Record<
	string,
	{ name: string; image: string; count: number; price: number }
>;

export const OrderDetailsModal = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const ordersAll = useSelector(getOrders);
	const ingredientsMap = useSelector(getMapIngredients);

	// можно через lastIndexof...но в данном контексте и так работает
	const orderId = location.pathname.split('/')[3] || location.pathname.split('/')[2];

	if (!ordersAll) return;

	const order: TOrder | undefined = ordersAll.find(
		(order) => order._id === orderId
	);

	if (!order) return;

	const { updatedAt, status, number, ingredients, name } = order;

	const indexSlice = location.pathname.lastIndexOf('/');

	const onClose = () => {
		navigate(location.pathname.slice(0, indexSlice), { replace: true });
	};

	const modalStylesClass = `${styles.modal} pt-10 pr-10 pl-10 pb-15`;
	const buttonStylesClass = styles.close ? `${styles.close}` : ' ';

	const price = ingredients.reduce(
		(acc, ingredient) => acc + ingredientsMap[ingredient].price,
		0
	);
	// const keysStatus = Object.keys(translateStatusOrder);
	const statusOrder = translateStatusOrder[status]
		? translateStatusOrder[status]
		: 'Отменён';

	const statusStyle = translateStatusOrder[status] ? status : 'repeal';

	const ingredientMapWithCount = ingredients.reduce(
		(acc: TIngredientMap, ingredientId) => {
			if (acc[ingredientId]) {
				acc[ingredientId].count += 1;
			} else {
				const ingredient = ingredientsMap[ingredientId];
				acc[ingredientId] = {
					name: ingredient.name,
					image: ingredient.image,
					count: 1,
					price: ingredient.price,
				};
			}
			return acc;
		},
		{}
	);

	return (
		<Modal
			onClose={onClose}
			classModal={modalStylesClass}
			classButton={buttonStylesClass}>
			<>
				<p
					className={`${styles.number} text text_type_digits-default mb-10`}>{`#${number}`}</p>
				<div className={`${styles['order-info']} mb-15`}>
					<p className={`${styles.name} text text_type_main-medium mb-3`}>
						{name}
					</p>
					<p className={`${styles[statusStyle]}`}>{statusOrder}</p>
				</div>
				<div className={`${styles['compound']} mb-10`}>
					<p className={`${styles.text}`}>Состав: </p>
					<div className={`${styles['ingredients-details']}`}>
						{Object.keys(ingredientMapWithCount).map((ing, index) => (
							<CompoundIngredientDetails
								key={index}
								img={ingredientMapWithCount[ing].image}
								name={ingredientMapWithCount[ing].name}
								summary={`${ingredientMapWithCount[ing].count} x ${ingredientMapWithCount[ing].price}`}
							/>
						))}
					</div>
				</div>
				<div className={`${styles.footer}`}>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(updatedAt)}
					/>
					<Cash count={`${price}`} />
				</div>
			</>
		</Modal>
	);
};
