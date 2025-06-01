import { ApplicationHeader } from './header/application-header';
import { Form1 } from './application-form/form-1/form-1';
import { Form2 } from './application-form/form-2/form2';
import { useNavigate } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';
import styles from './styles.module.css';

export const Application = () => {
	const navigate = useNavigate();

	const onNavigate = () => {
		navigate(pathPages.home, { replace: true });
	};

	return (
		<div>
			<ApplicationHeader />
			<Form1 />
			<Form2 />
			<button onClick={onNavigate} className={styles.button}>
				Отправить
			</button>
		</div>
	);
};
