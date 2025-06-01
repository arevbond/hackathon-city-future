import styles from './style.module.css';
import review_1 from "./review_1.svg"
import review_2 from "./review_2.svg"
import review_3 from "./review_3.svg"
import review_4 from "./review_4.svg"

export const Reviews = () => {
	return (
		<section className={styles.reviews}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>
						НАШИ ОЧЕНЬ ДАЖЕ <span className={styles.highlight}>РЕАЛЬНЫЕ ОТЗЫВЫ</span>
					</h2>
					<p className={styles.subtitle}>
						(мы не просили их льстить — честно)
					</p>
				</div>

				<div className={styles.reviewsGrid}>
					<div className={styles.reviewCard}>
						<img
							src={review_1}
							alt="Отзыв Алексея Сидорова"
							className={styles.reviewImage}
						/>
					</div>

					<div className={styles.reviewCard}>
						<img
							src={review_2}
							alt="Отзыв с роботом"
							className={styles.reviewImage}
						/>
					</div>

					<div className={styles.reviewCard}>
						<img
							src={review_3}
							alt="Отзыв Марии Пучковой"
							className={styles.reviewImage}
						/>
					</div>

					<div className={styles.reviewCard}>
						<img
							src={review_4}
							alt="Отзыв Павла Казакова"
							className={styles.reviewImage}
						/>
					</div>
				</div>

				<div className={styles.buttonWrapper}>
					<button className={styles.submitButton}>
						Запилить проект
					</button>
				</div>
			</div>
		</section>
	);
};