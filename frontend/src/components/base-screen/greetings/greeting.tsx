import { Arrow } from '../assets/arrow';
import robot from '../assets/robot.png';
import styles from './styles.module.css';
import { GreetingContent } from './greeting-content/greeting-content';
import { GreetingForm } from '../greeting-form/greeting-form';

export const Greeting = () => {
	return (
		<section className={styles.greeting}>
			<div className={styles.robot}>
				<img src={robot} alt='robo' />
			</div>
			<div className={styles.arrow}>
				<Arrow />
				<GreetingContent />
			</div>
			<GreetingForm />
		</section>
	);
};
