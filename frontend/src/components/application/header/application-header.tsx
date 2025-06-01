import styles from './styles.module.css';
import { PingDev } from '../../app-header/assets/PingDev';
import robot from './assets/robot.png';

export const ApplicationHeader = () => {
	return (
		<aside className={styles.container}>
			<div className={styles.logo}>
				<PingDev />
			</div>
			<div className={styles.banner}>
				<div className={styles.description}>
					<h1 className={styles.title}>
						<span className={styles.custom}>Брифуемся</span> по-человечески
					</h1>
					<p className={styles.text}>
						Бриф не идёт в «систему». Его читает технический человек. Он задаёт
						уточняющие вопросы, сверяет с ресурсами и отвечает точно.
					</p>
					<div className={styles.badge}>
						<p className={styles.text}>⚙️ Наш бэкэнд — это люди</p>
					</div>
				</div>
				<img className={styles.robot} src={robot} alt='robot' />
			</div>
		</aside>
	);
};
