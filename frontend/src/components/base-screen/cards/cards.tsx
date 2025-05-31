import arrow from "./arrow_in_target.png";
import card1 from "./card_1.svg";
import card2 from "./card_2.svg";
import card3 from "./card_3.svg";
import zadnik from "./zadnik.png";
import styles from "./style.module.css";

export const Cards = () => {
	return (
		<div className={styles.container}>
			<img
				src={zadnik}
				alt="grid background"
				className={styles.zadnik}
			/>

			<h1 className={styles.title}>
				МЫ — <span className={styles.zalupa}>Ping</span>Dev.<br />
				НЕ АГЕНТЫ ИИ, А АГЕНТЫ ДЕЛА.
			</h1>

			<img
				src={arrow}
				alt="arrow"
				className={styles.arrow}
			/>

			<img
				src={card1}
				alt="card 1"
				className={styles.card1}
			/>

			<img
				src={card2}
				alt="card 2"
				className={styles.card2}
			/>

			<img
				src={card3}
				alt="card 3"
				className={styles.card3}
			/>
		</div>
	);
};