import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export const CometLoader = () => {
	const [angle, setAngle] = useState(0);
	const [isJoke, setJoke] = useState(false);

	const onclick = () => {
		setJoke(true);
	};
	useEffect(() => {
		const interval = setInterval(() => {
			setAngle((prev) => (prev + 5) % 360);
		}, 30);
		return () => clearInterval(interval);
	}, []);

	const radius = 40;
	const x = radius * Math.cos((angle * Math.PI) / 180);
	const y = radius * Math.sin((angle * Math.PI) / 180);

	return (
		<ModalOverlay>
			<section className={styles['loader-block']}>
				<div className={styles['loader-container']}>
					<motion.div
						className={styles.comet}
						animate={{ x, y }}
						transition={{ ease: 'linear', duration: 0.03 }}></motion.div>
				</div>
				{!isJoke ? (
					<>
						<p className='text text_type_main-small mt-1'>
							Пока идёт загрузка можете оставить отзыв:
						</p>
						<p className={styles.input} onClick={onclick}></p>
					</>
				) : (
					<p className='text text_type_main-small mt-2'>
						Упс что-то пошло не так, но мы исправим, ваше мнение для нас очень
						важно
					</p>
				)}
			</section>
		</ModalOverlay>
	);
};
