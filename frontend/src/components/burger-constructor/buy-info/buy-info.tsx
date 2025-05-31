import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { Modal } from '../../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	closeModal,
	getIsError,
	getOrderError,
	getOrderNumber,
} from '@services/order/reducer';

export const BuyInfo = () => {
	const dispatch = useDispatch();
	const modalStylesClass = `${styles.modal} pt-30 pr-25 pl-25 pb-30`;
	const buttonStylesClass = styles.close ? `${styles.close}` : ' ';
	const isError = useSelector(getIsError);
	const orderError = useSelector(getOrderError);
	const numberOrder = useSelector(getOrderNumber);

	const onClose = () => {
		dispatch(closeModal());
	};

	return (
		<Modal
			onClose={onClose}
			classModal={modalStylesClass}
			classButton={buttonStylesClass}>
			{isError ? (
				<p>{orderError}</p>
			) : (
				<>
					<p className='text text_type_digits-large mb-8'>{numberOrder}</p>
					<p className='text text_type_main-medium mb-15'>
						идентификатор заказа
					</p>
					<div className={`${styles.logo} mb-15`}>
						<div className={`${styles.check} `}>
							<CheckMarkIcon type='primary' />
						</div>
					</div>
					<p className='text text_type_main-small mb-2'>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</Modal>
	);
};
