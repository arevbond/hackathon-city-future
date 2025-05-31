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
					НАЧИНАЕТСЯ С <span className={styles.blueText}>ПИНГА</span>
				</h1>

				{/* Описание */}
				<div className={styles.description}>
					<p>Никаких роботов. Никаких «мы всё автоматизировали».</p>
					<p>
						Вы подаёте заявку — её читает{' '}
						<span className={styles.highlight}>техспециалист</span>.
					</p>
					<p>Мы оцениваем сроки, подбираем стек и собираем команду</p>
					<p>под ваш темп.</p>
				</div>

				{/* NavLink кнопка */}
				<NavLink to='/project' className={styles.ctaButton}>
					запинговать проект
				</NavLink>
			</div>
		</div>
	);
};
