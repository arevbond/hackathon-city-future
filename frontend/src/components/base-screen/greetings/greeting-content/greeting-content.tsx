import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

interface GreetingContentProps {
	onScrollToForm: () => void;
}

export const GreetingContent = ({ onScrollToForm }: GreetingContentProps) => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		// Сначала меняем URL с хешем
		navigate('#form', { replace: false });
		// Затем скроллим (небольшая задержка для обновления URL)
		setTimeout(() => {
			onScrollToForm();
		}, 50);
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

				{/* Кнопка */}
				<button onClick={handleButtonClick} className={styles.ctaButton}>
					запинговать проект
				</button>
			</div>
		</div>
	);
};