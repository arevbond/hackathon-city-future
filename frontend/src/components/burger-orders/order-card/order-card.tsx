import {
	TOrder,
	translateStatusOrder,
} from '@utils/types/types-orders-stream/types';
import styles from './styles.module.css';
import { useSelector } from '@services/store';
import { getMapIngredients } from '@services/ingredients/reducer';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ImageIngredients } from '../image-ingredients/image-ingredients';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cash } from '../cash/cash';

export const OrderCard = ({
	_id,
	updatedAt,
	status,
	number,
	ingredients,
	name,
}: TOrder) => {
	const navigate = useNavigate();
	const location = useLocation();
	const ingredientsMap = useSelector(getMapIngredients);

	if (!ingredients || !ingredientsMap) return;

	const price = ingredients.reduce((acc, ingredient) => {
		// допустим кто-то написал чушь при отправке
		acc += ingredientsMap[ingredient]?.price;
		return acc;
	}, 0);

	// const keysStatus = Object.keys(translateStatusOrder);
	const statusOrder = translateStatusOrder[status]
		? translateStatusOrder[status]
		: 'Отменён';

	const statusStyle = translateStatusOrder[status] ? status : 'repeal';

	const onClick = () => {
		navigate(`${location.pathname}/${_id}`, {
			state: { backgroundLocation: location },
		});
	};


	return (
		<div className={styles.card} onClick={onClick}>
			<div className={styles['card-header']}>
				<p
					className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</p>
				{/* <p className={`${styles.date}`}>{updatedAt}</p> */}
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(updatedAt)}
				/>
			</div>
			<div>
				<p className={`${styles.name} text text_type_main-medium`}>{name}</p>
				<p className={`${styles[statusStyle]}`}>{statusOrder}</p>
			</div>
			<div className={`${styles.footer}`}>
				<ImageIngredients ingredients={ingredients} />
				<Cash count={`${price}`} />
			</div>
		</div>
	);
};
