import React, { useState } from 'react';
import styles from './styles.module.css';
import { Input } from '../../../ui/input/input';

export const Form2 = () => {
	const [formData, setFormData] = useState({
		taskDescription: '',
		outcomeType: '',
		otherOutcome: '',
		keyFeatures: '',
		optionalFeatures: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			outcomeType: e.target.value,
		}));
	};

	return (
		<div className={styles.formContainer}>
			<h1 className={styles.title}>ЧТО НУЖНО СДЕЛАТЬ?</h1>

			<div className={styles.formSection}>
				<label className={styles.sectionLabel}>
					Опишите задачу одним предложением:
				</label>
				<Input
					name='taskDescription'
					placeholder='Например: «Разработать веб-платформу для обучения с личным кабинетом и чат-ботом»'
					value={formData.taskDescription}
					onChange={handleChange}
					className={styles.textInput}
				/>
			</div>

			<div className={styles.formSection}>
				<label className={styles.sectionLabel}>
					Что должно получиться в итоге?
				</label>
				<div className={styles.radioGroup}>
					{[
						'MVP',
						'Полноценный продукт',
						'Техническое решение внутри компании',
						'Другое',
					].map((option) => (
						<label key={option} className={styles.radioOption}>
							<input
								type='radio'
								name='outcomeType'
								value={option}
								checked={formData.outcomeType === option}
								onChange={handleRadioChange}
								className={styles.radioInput}
							/>
							<span className={styles.radioCustom}></span>
							{option === 'Другое' ? (
								<>
									Другое:
									<input
										type='text'
										name='otherOutcome'
										value={formData.otherOutcome}
										onChange={handleChange}
										className={styles.otherInput}
										disabled={formData.outcomeType !== 'Другое'}
									/>
								</>
							) : (
								option
							)}
						</label>
					))}
				</div>
			</div>

			<div className={styles.formSection}>
				<label className={styles.sectionLabel}>
					Ключевые функции (можно списком):
				</label>
				<textarea
					name='keyFeatures'
					placeholder='Например: авторизация, загрузка файлов, подписка, чат, CRM'
					value={formData.keyFeatures}
					onChange={handleChange}
					className={styles.textarea}
					rows={4}
				/>
			</div>

			<div className={styles.formSection}>
				<label className={styles.sectionLabel}>
					Есть ли что-то НЕ обязательное, но желательное?
				</label>
				<textarea
					name='optionalFeatures'
					placeholder='Например: аналитика, мобильная версия, темная тема'
					value={formData.optionalFeatures}
					onChange={handleChange}
					className={styles.textarea}
					rows={3}
				/>
			</div>
		</div>
	);
};
