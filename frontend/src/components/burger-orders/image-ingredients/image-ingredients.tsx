import { nanoid } from '@reduxjs/toolkit';
import { getMapIngredients } from '@services/ingredients/reducer';
import { useSelector } from '@services/store';
import styles from './styles.module.css';

type TImageIngredients = {
	ingredients: string[];
};

export const ImageIngredients = ({ ingredients }: TImageIngredients) => {
	const ingredientsMap = useSelector(getMapIngredients);

	if (ingredients.length > 6)
		return (
			<div className={`${styles.imgs}`}>
				{ingredients.slice(0, 5).map((ingr, index) => (
					<div
						key={nanoid()}
						className={styles['img-layout']}
						style={{ zIndex: ingredients.length - index }}>
						{/* допустим тоже чушь */}
						<img
							className={styles.img}
							src={`${ingredientsMap[ingr]?.image}`}
							alt='ингредиент'
						/>
					</div>
				))}
				<div
					key={nanoid()}
					className={`${styles['img-layout']} ${styles['layout-last']}`}
					style={{ zIndex: ingredients.length - 6 }}>
					<img
						className={`${styles.img} ${styles['img-last']}`}
						src={`${ingredientsMap[ingredients[6]].image}`}
						alt='ингредиент'
					/>
					<p className={`${styles.count} text text_type_digits-small`}>{`+${
						ingredients.length - 5
					}`}</p>
				</div>
			</div>
		);
	return (
		<div className={`${styles.imgs}`}>
			{ingredients.map((ingr, index) => (
				<div
					key={nanoid()}
					className={styles['img-layout']}
					style={{ zIndex: ingredients.length - index }}>
					{/* допустим тоже чушь */}
					<img
						className={styles.img}
						src={`${ingredientsMap[ingr]?.image}`}
						alt='ингредиент'
					/>
				</div>
			))}
		</div>
	);
};
