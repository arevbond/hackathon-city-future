import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './styles.module.css';

type TPropsError = {
	text?: string | null;
};

export const Error = (props: TPropsError): React.JSX.Element => {
	const text = props.text ? props.text : 'неизвестная ошибка';
	return (
		<ModalOverlay>
			<section className={styles['error-block']}>
				<div
					className={`${styles['error-container']} mb-2 text text_type_main-medium`}>
					<p>Error</p>
				</div>
				<p className='text text_type_main-small'>{text}</p>
			</section>
		</ModalOverlay>
	);
};
