import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { TPropsChildren } from '@utils/types/types';

type TPropsModalOverlay = {
	onClose?: () => void;
} & TPropsChildren;

export const ModalOverlay = (props: TPropsModalOverlay): React.JSX.Element => {
	const location = useLocation();

	const blackout =
		location.state || location.pathname.length === 1 ? styles.blackout : ''; // со стейт модалка для ингр, === 1 для оформления заказа
	return (
		<div className={`${styles.overlay} ${blackout}`} onClick={props.onClose}>
			{props.children}
		</div>
	);
};
