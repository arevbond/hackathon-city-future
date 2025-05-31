import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './styles.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { ItemDropTypes } from '@utils/items-drop-types';
import { useDispatch } from 'react-redux';
import {
	deleteIngredient,
	swapIngredient,
} from '@services/constructor/reducer';
import { TIngredient } from '@utils/types/types';

export type TTypeSkin = 'top' | 'bottom' | undefined;

type TPropsIngredientConstructor = Pick<
	TIngredient,
	'name' | 'image' | 'price'
> & {
	type?: TTypeSkin;
	isLocked?: boolean;
	uniqueId?: string;
	index?: number;
};

// type TDropCollectedProps = {
// 	hoverClientY: {
// 		x: number;
// 		y: number;
// 	} | null;
// };

export const IngredientConstructor = (props: TPropsIngredientConstructor) => {
	const { name, image, isLocked, type, price, uniqueId, index } = props;
	const ref = useRef<HTMLElement>(null);
	const dispatch = useDispatch();
	const [, drop] = useDrop<TPropsIngredientConstructor, unknown, unknown>({
		accept: ItemDropTypes.INGREDIENT_CONSTRUCTOR_SWAP,
		// collect(monitor) {},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const fromIndex = item.index;
			if (index === undefined || fromIndex === undefined) return;
			const toIndex = index;
			if (fromIndex === toIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (clientOffset === null) return;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch(swapIngredient({ fromIndex, toIndex }));

			item.index = toIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: ItemDropTypes.INGREDIENT_CONSTRUCTOR_SWAP,
		item: () => {
			return { index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const deleteFilling = () => {
		dispatch(deleteIngredient({ uniqueId }));
	};

	const styleDrag = isDragging ? 'drag-item' : '';
	drag(drop(ref));
	return (
		<article
			className={`${styles.element} ${styles[styleDrag]} mr-1`}
			ref={ref}>
			{!isLocked ? <DragIcon type='primary' /> : null}
			<ConstructorElement
				text={name}
				thumbnail={image}
				price={price}
				isLocked={isLocked}
				type={type}
				{...(!isLocked && {
					handleClose: () => deleteFilling(),
				})}
			/>
		</article>
	);
};
