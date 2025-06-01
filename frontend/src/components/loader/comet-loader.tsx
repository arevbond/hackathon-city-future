import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export const CometLoader = () => {
	const [angle, setAngle] = useState(0);
	const [isJoke, setJoke] = useState(false);

	const onclick = () => {
		setJoke(true);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setAngle((prev) => (prev + 3) % 360); // Немного замедлили для плавности
		}, 20);
		return () => clearInterval(interval);
	}, []);

	const radius = 42; // Увеличили радиус для большего круга
	const x = radius * Math.cos((angle * Math.PI) / 180);
	const y = radius * Math.sin((angle * Math.PI) / 180);

	return (
		<ModalOverlay>
			<section className={styles['loader-block']}>
				<div className={styles['loader-container']}>
					<motion.div
						className={styles.comet}
						animate={{
							x,
							y,
							rotate: angle + 90, // Поворачиваем комету по направлению движения
						}}
						transition={{
							ease: 'linear',
							duration: 0.02,
							rotate: { duration: 0.02 },
						}}
					/>
				</div>

				{!isJoke ? (
					<>
						<p className={styles['loader-text']}>
							Пока идёт загрузка, можете оставить отзыв:
						</p>
						<div className={styles.input} onClick={onclick} />
					</>
				) : (
					<p className={styles['joke-text']}>
						Упс, что-то пошло не так, но мы исправим! Ваше мнение для нас очень
						важно 💙
					</p>
				)}
			</section>
		</ModalOverlay>
	);
};
