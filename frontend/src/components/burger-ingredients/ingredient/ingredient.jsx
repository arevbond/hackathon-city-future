import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { setIngredientDetails } from '@services/ingredient-info/reducer';
import { useDrag } from 'react-dnd';
import { ItemDropTypes } from '@utils/items-drop-types';

export const Ingredient = (props) => {
	const { type, image, price, name, _id, count } = props;

	const dispatch = useDispatch();
	const [{ isDrag }, dragRef] = useDrag(() => ({
		type:
			type === 'bun'
				? ItemDropTypes.INGREDIENT_BURGER_BUN
				: ItemDropTypes.INGREDIENT_BURGER_FILLING,
		item: props,
		end: (item, monitor) => {
			//для себя, чтобы потом какой эффект попробовать сделать
			const result = monitor.getDropResult();
		},
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	}));
	const styleBorder = isDrag && 'drag';

	return (
		<article
			className={`${styles.ingredient} pd-4 pr-4 pb-4 ${styles[styleBorder]}`}
			ref={dragRef}
			onClick={() =>
				dispatch(
					setIngredientDetails({
						...props,
					})
				)
			}>
			<div className={styles.count}>{!!count && <Counter count={count} />}</div>
			<img src={image} alt={`${name}`} />
			<div className={styles.price}>
				<p className='text text_type_digits-default'>{price}</p>{' '}
				<CurrencyIcon type='primary' />
			</div>
			<p className={`${styles.text} text text_type_main-default`}>{name}</p>
		</article>
	);
};

