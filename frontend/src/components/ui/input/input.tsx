import React from 'react';
import './styles.module.css'; // Создайте этот файл для стилей

type InputProps = {
	label?: string;
	error?: string;
	className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	name,
	type = 'text',
	placeholder,
	onChange,
	value,
	label,
	error,
	className = '',
	...props
}: InputProps) => {
	return (
		<div className={`input-container ${className}`}>
			{label && (
				<label htmlFor={name} className='input-label'>
					{label}
				</label>
			)}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className={`input-field ${error ? 'input-error' : ''}`}
				{...props}
			/>
			{error && <span className='input-error-message'>{error}</span>}
		</div>
	);
};
