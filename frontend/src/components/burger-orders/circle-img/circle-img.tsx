import styles from './styles.module.css';

type TCircle = {
	style?: object;
	className?: string;
	src: string;
};

export const CircleImg = ({ style, className, src }: TCircle) => {
	return (
		<div
			// key={nanoid()}
			className={styles['img-layout']}
			style={style}>
			<img
				className={`${styles.img} ${className}`}
				src={`${src}`}
				alt='ингредиент'
			/>
		</div>
	);
};
