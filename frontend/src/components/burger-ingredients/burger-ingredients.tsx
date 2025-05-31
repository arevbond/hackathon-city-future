import { useRef, useState } from 'react';
import { FilterIngredients } from './filter-tabs/tabs';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import { Ingredients } from './ingredients/ingredients';
import styles from './styles.module.css';

const categorysFilter = Object.keys(FILTER_DECRYPTION);

export type TRef = HTMLElement;

export type TRefDiv = HTMLDivElement;

export type TObjRef = React.RefObject<TRef>;

export type TObjRefDiv = React.RefObject<TRefDiv>;

type TSectionRefs = {
	[key: string]: TObjRefDiv;
};

export const BurgerIngredients = () => {
	const [category, setCategory] = useState(categorysFilter[0]);

	// const [currentTab, setCurrentTab] = useState('Булки');
	const containerRef = useRef<TRefDiv>(null);
	const tabsRef = useRef<TRefDiv>(null);

	const bunsRef = useRef<TRefDiv>(null);
	const saucesRef = useRef<TRefDiv>(null);
	const mainsRef = useRef<TRefDiv>(null);

	const sectionRefs: TSectionRefs = {
		Булки: bunsRef,
		Соусы: saucesRef,
		Начинки: mainsRef,
	};

	// При клике на таб — прокрутка с учётом высоты табов
	const handleTabClick = (name: string) => {
		const block = sectionRefs[name].current;
		const container = containerRef.current;
		const tabs = tabsRef.current;

		if (block && container && tabs) {
			const containerTop = container.getBoundingClientRect().top;
			const blockTop = block.getBoundingClientRect().top;
			const offset = blockTop - containerTop + container.scrollTop;

			const tabHeight = tabs.offsetHeight;

			container.scrollTo({
				top: offset - tabHeight, // учли высоту табов
				behavior: 'smooth',
			});
		}
	};

	// При скролле — определяем ближайший блок и обновляем текущий таб
	const handleScroll = () => {
		if (!containerRef.current || !tabsRef.current) return;

		const containerTop = containerRef.current.getBoundingClientRect().top;
		const tabsHeight = tabsRef.current.offsetHeight;

		const visibleSections = categorysFilter.map((name) => {
			const ref = sectionRefs[name].current;
			if (!ref) return { name, offset: Infinity };
			const rect = ref.getBoundingClientRect();
			return { name, offset: Math.abs(rect.top - containerTop - tabsHeight) };
		});

		visibleSections.sort((a, b) => a.offset - b.offset);
		const nearest = visibleSections[0];
		if (nearest.name !== category) {
			setCategory(nearest.name);
		}
	};

	return (
		<section className={styles.ingredients}>
			<p className='text text_type_main-large mb-5'>Соберите бургер</p>
			<FilterIngredients
				current={category}
				namesFilter={categorysFilter}
				setFilterIngredients={handleTabClick}
				tabsRef={tabsRef}
			/>
			<Ingredients
				handleScroll={handleScroll}
				refs={{
					containerRef: containerRef,
					bunsRef: bunsRef,
					saucesRef: saucesRef,
					mainsRef: mainsRef,
				}}
			/>
		</section>
	);
};
