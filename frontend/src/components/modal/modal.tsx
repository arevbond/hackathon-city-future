import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import styles from './styles.module.css';
import { TPropsChildren } from '@utils/types/types';

type TModalProps = {
	onClose: () => void;
	classModal: string;
	classButton: string;
} & TPropsChildren;

const containerModal = document.getElementById('modal-root') as HTMLElement; // т.к. он точно существует

export const Modal = (props: TModalProps) => {
	const { onClose, children, classModal, classButton } = props;

	useEffect(() => {
		const closeOnEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', closeOnEscape);
		return () => {
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<ModalOverlay onClose={onClose}>
			<section
				className={`${styles.modal} ${classModal} `}
				onClick={(e) => e.stopPropagation()}>
				<button className={`${styles.close} ${classButton}`} onClick={onClose}>
					<CloseIcon type='primary' />
				</button>
				{children}
			</section>
		</ModalOverlay>,
		containerModal
	);
};
