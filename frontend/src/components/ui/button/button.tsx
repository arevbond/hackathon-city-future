import React from 'react';
import styles from './styles.module.css';

type TButtonProps = {
	variant?: 'primary' | 'secondary';
	htmlType?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
	callBack?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
	variant = 'primary',
	htmlType = 'button',
	children,
	className = '',
	callBack,
	...rest
}: TButtonProps) => {
	return (
		<button
			type={htmlType}
			className={`${styles.button} ${styles[variant]} ${className}`}
			{...rest}
			onClick={callBack}>
			{children}
		</button>
	);
};
