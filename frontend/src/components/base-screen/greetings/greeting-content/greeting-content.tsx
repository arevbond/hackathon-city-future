// DevelopmentBanner.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

export const GreetingContent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.bannerContent}>
				{/* Заголовок */}
				<h1 className={styles.mainTitle}>
					РАЗРАБОТКА <span className={styles.blueText}>ПО</span>
					<br />
					НАЧИНАЕТСЯ С ПИНГА
				</h1>

				{/* Описание */}
				<div className={styles.description}>
					Никаких роботов. Никаких «мы всё автоматизировали». Вы подаёте заявку
					— её читает <span className={styles.highlight}>техспециалист</span>.
					Мы оцениваем сроки, подбираем стек и собираем команду под ваш темп.
				</div>

				{/* NavLink кнопка */}
				<NavLink to='/project' className={styles.ctaButton}>
					запинговать проект
				</NavLink>
			</div>
		</div>
	);
};
