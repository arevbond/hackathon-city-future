import { TPropsChildren } from '@utils/types/types';
import { AppHeader } from '../app-header/app-header';
import styles from './styles.module.css';

export const Layout = (props: TPropsChildren) => {
	//TODO: layout сделать grid эксперимент, посмотреть на практике
	return (
		<div className={styles.layout}>
			<AppHeader />
			<main className={`pb-10 ${styles.main}`}>{props.children}</main>
		</div>
	);
};
