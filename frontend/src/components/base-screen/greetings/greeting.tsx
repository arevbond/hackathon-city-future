import { Arrow } from '../assets/arrow';
import robot from '../assets/robot.jpg';
import styles from './styles.module.css';

export const Greeting = () => {
	return (
		<section className={styles.greeting}>
			<div>
				<img src={robot} alt='robo' />
			</div>
			<div className={styles.arrow}>
				<Arrow />
			</div>
		</section>
	);
};
