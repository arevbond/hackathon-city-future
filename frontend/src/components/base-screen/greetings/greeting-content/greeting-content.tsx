// DevelopmentBanner.jsx
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const GreetingContent = () => {
	const navigate = useNavigate();

	const onNavigate = () => {
		// Меняем hash без перезагрузки
		navigate('#form', { replace: false });
	};

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

				{/* NavLink кнопка to='/project' */}
				<button onClick={onNavigate} className={styles.ctaButton}>
					запинговать проект
				</button>
			</div>
		</div>
	);
};
