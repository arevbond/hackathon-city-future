import React, { useState } from 'react';
import styles from './styles.module.css';
import { Input } from '../../../ui/input/input';

export const Form1 = () => {
	const [formData, setFormData] = useState({
		company: '',
		contact: '',
		role: '',
		hasTechSpecialist: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	return (
		<div className={styles.formContainer}>
			<h1 className={styles.title}>КТО ВЫ?</h1>

			<Input
				name='company'
				label='Название компании / проекта (если есть)'
				value={formData.company}
				onChange={handleChange}
				className={styles.inputField}
			/>

			<Input
				name='contact'
				label='Контакты по лицу'
				value={formData.contact}
				onChange={handleChange}
				className={styles.inputField}
			/>

			<Input
				name='role'
				label='Роль в проекте'
				value={formData.role}
				onChange={handleChange}
				className={styles.inputField}
			/>

			<div className={styles.checkboxGroup}>
				<label className={styles.checkboxLabel}>
					Есть ли у вас технический специалист, с кем можно общаться напрямую?
				</label>
				<div className={styles.checkboxOptions}>
					<label className={styles.checkboxOption}>
						<input
							type='checkbox'
							name='hasTechSpecialist'
							checked={formData.hasTechSpecialist}
							onChange={handleChange}
							className={styles.checkboxInput}
						/>
						<span className={styles.checkboxCustom}></span>
						Да
					</label>
				</div>
			</div>
		</div>
	);
};
