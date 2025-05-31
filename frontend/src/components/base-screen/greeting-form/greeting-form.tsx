import download from './assets/download.png';
import lamp from './assets/lamp.png';
import { Form } from './form/form';
import styles from './style.module.css';

export const GreetingForm = () => {
	return (
		<div className={styles.greetform}>
			<h2>
				<span>краткий пинг</span> - и мы в деле!
			</h2>
			<p>
				Форма простая, как DevOps-шутка. Вы пишете, что нужно — мы читаем,
				анализируем и отвечаем по делу.
			</p>
			<img className={styles.download} src={download} alt={':)'} />
			<img className={styles.lamp} src={lamp} alt={':)'} />
			<Form />
		</div>
	);
};
