import { Ingredient } from '../ingredient/ingredient';
import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';
import { TIngredient } from '@utils/types/types';
import { TObjRefDiv } from '../burger-ingredients';

type TIngredientSection = {
	name: string | undefined;
	data: TIngredient[];
	countIngredient: Record<string, number>;
	sectionRef: TObjRefDiv;
};

export const IngredientsSection = (props: TIngredientSection) => {
	const { name, data, countIngredient, sectionRef } = props;

	const location = useLocation();

	return (
		<article>
			<p className='text text_type_main-medium mb-6' ref={sectionRef}>
				{name}
			</p>
			<div className={`${styles['ingr-section']} pl-4 pb-10 pr-1`}>
				{data.map((ingredient) => (
					<Link
						key={ingredient['_id']}
						to={`${pathPages.ingredients}/${ingredient['_id']}`}
						state={{ backgroundLocation: { ...location } }}>
						<Ingredient
							key={ingredient['_id']}
							{...ingredient}
							count={countIngredient[ingredient['_id']]}
						/>
					</Link>
				))}
			</div>
		</article>
	);
};
