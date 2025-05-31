import styles from './styles.module.css';
import { IngredientConstructor } from './ingredient-constructor/ingredient-constructor';
import { PlaceOrder } from './place-order/place-order';
import { BuyInfo } from './buy-info/buy-info';
import { useSelector, useDispatch } from 'react-redux';
import { getBun, setBun } from '@services/constructor/reducer';
import { IngredientPlace } from './ingredient-place/ingredient-place';
import { getIsOpen, getRequestCompleted } from '@services/order/reducer';
import { useDrop } from 'react-dnd';
import { ItemDropTypes } from '@utils/items-drop-types';
import { IngredientFilling } from './ingredient-filling/ingredient-filling';
import { TIngredient } from '@utils/types/types';

export const BurgerConstructor = () => {
	const isOpenModal = useSelector(getIsOpen);
	const dispatch = useDispatch();
	const requestCompleted = useSelector(getRequestCompleted);
	// или для булок лучше создать 2 рефа?
	const [{ isOverBun, canDropBun }, dropRefBun] = useDrop(() => ({
		accept: ItemDropTypes.INGREDIENT_BURGER_BUN,
		drop: (item: TIngredient) => {
			dispatch(setBun({ bun: { ...item } }));
		},
		collect: (monitor) => ({
			isOverBun: monitor.isOver(),
			canDropBun: monitor.canDrop(),
		}),
	}));

	const bun: TIngredient | null | undefined = useSelector(getBun);
	const styleDropBun = canDropBun ? 'drop-bun' : '';
	const styleOverBun = isOverBun ? 'over-bun' : '';

	return (
		<section className={`${styles.constructor} pt-25`} ref={dropRefBun}>
			<div
				className={`but mb-4 mr-4 ${styles[styleDropBun]} ${styles[styleOverBun]} ${styles.bun}`}>
				{bun ? (
					<IngredientConstructor {...bun} isLocked={true} type='top' />
				) : (
					<IngredientPlace text='Выберет булку' type='top' />
				)}
			</div>
			<IngredientFilling />
			<div className='but mr-4 mb-10' ref={dropRefBun}>
				{bun ? (
					<IngredientConstructor {...bun} isLocked={true} type='bottom' />
				) : (
					<IngredientPlace text='Выберете булку' type='bot' />
				)}
			</div>
			<PlaceOrder />
			{isOpenModal && requestCompleted && <BuyInfo />}
		</section>
	);
};
