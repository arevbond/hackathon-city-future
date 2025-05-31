import {
	getFilteredDataByCategory,
	getKeyToValue,
} from '@utils/helper-function';
import { IngredientsSection } from '../ingredients-section/ingredients-section';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { getIngredients } from '@services/ingredients/reducer';
import { useMemo } from 'react';
import { getAllIngredients, getBun } from '@services/constructor/reducer';
import { REFS_TABS_DECRYPTION } from '@utils/refs-tabs-decryption';
import { TObjRefDiv } from '../burger-ingredients';
import { TIngredient } from '@utils/types/types';

const categoryDecr = Object.values(FILTER_DECRYPTION);

type TIngredients = {
	handleScroll: () => void;
	refs: {
		containerRef: TObjRefDiv;
		bunsRef: TObjRefDiv;
		saucesRef: TObjRefDiv;
		mainsRef: TObjRefDiv;
	};
};

type TReducerList = {
	[key: string]: number;
};

export const Ingredients = ({ refs, handleScroll }: TIngredients) => {
	const ingredients = useSelector(getIngredients);
	const fillingConstructor: TIngredient[] = useSelector(getAllIngredients);
	const activeBun: TIngredient | undefined | null = useSelector(getBun);
	const filterIngredients = getFilteredDataByCategory<TIngredient, 'type'>(
		ingredients,
		'type'
	);

	const countIngredient = useMemo(() => {
		const ingredientList = [...fillingConstructor];
		activeBun && ingredientList.push(activeBun, activeBun);
		return ingredientList.reduce<TReducerList>((acc, fil) => {
			const filId = fil['_id'];
			if (acc[filId]) {
				acc[filId] = acc[filId] + 1;
			} else {
				acc[filId] = 1;
			}
			return acc;
		}, {});
	}, [fillingConstructor, activeBun]);

	return (
		<div
			data-scroll
			className={`${styles.ingredients} custom-scroll ${styles.scroll}`}
			ref={refs.containerRef}
			onScroll={handleScroll}>
			{categoryDecr.map((decr) => {
				const sectionRef = refs[REFS_TABS_DECRYPTION[decr]];
				return (
					<IngredientsSection
						key={decr}
						name={getKeyToValue(FILTER_DECRYPTION, decr)}
						data={filterIngredients[decr]}
						countIngredient={countIngredient}
						sectionRef={sectionRef}
					/>
				);
			})}
		</div>
	);
};
