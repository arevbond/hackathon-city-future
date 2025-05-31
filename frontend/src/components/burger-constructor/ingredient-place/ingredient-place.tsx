import styles from './style.module.css';

type TPropsIngredientPlace = {
	type?: string | undefined;
	text: string;
};

export const IngredientPlace = ({ type, text }: TPropsIngredientPlace) => {
	return (
		<article className={`${styles.element} ${type ? styles[type] : ''} mr-1`}>
			<p className='text text_type_main-default'>{text} </p>
		</article>
	);
};
