// DevelopmentBanner.jsx
import { RefObject } from 'react';
import styles from './styles.module.css';

type TProps = {
	formScrollRef?: RefObject<HTMLDivElement>;
};
export const GreetingContent = ({ formScrollRef }: TProps) => {
	const onNavigate = () => {
		formScrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
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
