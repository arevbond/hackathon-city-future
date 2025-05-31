import { Cash } from '../../cash/cash';
import { CircleImg } from '../../circle-img/circle-img';
import styles from './styles.module.css';

type TDetails = {
	img: string;
	name: string;
	summary: string;
};

export const CompoundIngredientDetails = ({ img, name, summary }: TDetails) => {
	return (
		<div className={styles.details}>
			<CircleImg src={img} />
			<p className={` ${styles.text} text text_type_main-default`}>{name}</p>
			<Cash count={summary} />
		</div>
	);
};
