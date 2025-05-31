import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

type TCash = {
	count: string;
};

export const Cash = ({ count }: TCash) => {
	return (
		<div className={styles.price}>
			<p className='text text_type_digits-default'>{count}</p>{' '}
			<CurrencyIcon type='primary' />
		</div>
	);
};
