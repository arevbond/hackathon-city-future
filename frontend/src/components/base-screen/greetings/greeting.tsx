import { Arrow } from '../assets/arrow';
import robot from '../assets/robot.png';
import styles from './styles.module.css';
import { GreetingContent } from './greeting-content/greeting-content';
import { GreetingForm } from '../greeting-form/greeting-form';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const Greeting = () => {
	const formRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	// Функция для скролла к форме
	const scrollToForm = () => {
		formRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		if (location.hash === '#form') {
			scrollToForm();
		}
	}, [location.hash]);

	return (
		<>
			<section className={styles.greeting}>
				<div className={styles.robot}>
					<img src={robot} alt='robo' />
				</div>
				<div className={styles.arrow}>
					<Arrow />
					<GreetingContent onScrollToForm={scrollToForm} />
				</div>
				<GreetingForm ref={formRef} />
			</section>
		</>
	);
};