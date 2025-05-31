import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { IngredientConstructor } from '../ingredient-constructor/ingredient-constructor';
import { IngredientPlace } from '../ingredient-place/ingredient-place';
import { getFilling, setIngredient } from '@services/constructor/reducer';
import { useDrop } from 'react-dnd';
import { ItemDropTypes } from '@utils/items-drop-types';
import { TIngredient } from '@utils/types/types';

type TCollectedPropsFilling = {
	isOverFil: boolean;
	canDropFil: boolean;
};

type TFilling = TIngredient & { key: string };

export const IngredientFilling = () => {
	const filling: TFilling[] | null = useSelector(getFilling);
	const dispatch = useDispatch();
	const [{ isOverFil, canDropFil }, dropRefFilling] = useDrop<
		TIngredient,
		unknown,
		TCollectedPropsFilling
	>({
		accept: ItemDropTypes.INGREDIENT_BURGER_FILLING,
		drop: (item) => {
			dispatch(setIngredient({ ingredient: { ...item } }));
		},
		collect: (monitor) => ({
			isOverFil: monitor.isOver(),
			canDropFil: monitor.canDrop(),
		}),
	});
	const styleDropFil = canDropFil ? 'drop-fil' : '';
	const styleOverFil = isOverFil ? 'over-fil' : '';

	return (
		<div
			className={`${styles.filling} ${styles[styleDropFil]} ${styles[styleOverFil]} mb-4`}
			ref={dropRefFilling}>
			{filling.length ? (
				filling.map((fil, index) => {
					const { type, key, ...rest } = fil;
					return (
						<IngredientConstructor
							key={key}
							{...rest}
							uniqueId={key}
							index={index}
						/>
					);
				})
			) : (
				<IngredientPlace text={'Выберите начинку'} />
			)}
		</div>
	);
};
