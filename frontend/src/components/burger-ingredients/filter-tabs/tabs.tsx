import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TObjRefDiv } from '../burger-ingredients';

type TPropsFilterIngredients = {
	current: string | null | undefined;
	namesFilter: string[];
	setFilterIngredients: (name: string) => void;
	tabsRef: TObjRefDiv;
};

export const FilterIngredients = (props: TPropsFilterIngredients) => {
	const { namesFilter, current, setFilterIngredients, tabsRef } = props;

	return (
		<div style={{ display: 'flex' }} className='mb-10' ref={tabsRef}>
			{namesFilter.map((name) => {
				return (
					<Tab
						key={name}
						value={name}
						active={current === name}
						onClick={() => setFilterIngredients(name)}>
						{name}
					</Tab>
				);
			})}
		</div>
	);
};
