import download from './assets/download.png';
import lamp from './assets/lamp.png';
import { Form } from './form/form';
import styles from './style.module.css';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
export const GreetingForm = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div className={styles.greetform} ref={ref} data-form-section>
			<p className={styles.title}>
				<span className={styles.pixel}>краткий пинг</span> - и мы в деле!
			</p>
			<p className={styles.description}>
				Форма простая, как DevOps-шутка. Вы пишете, что нужно — мы читаем,
				анализируем и отвечаем по делу.
			</p>
			<img className={styles.joystick} src={download} alt={':)'} />
			<img className={styles.lamp} src={lamp} alt={':)'} />
			<Form />
		</div>
	);
});