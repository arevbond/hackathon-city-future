import React, { useState } from 'react';
import styles from './styles.module.css';
import robot from './assets/robot.png';

export const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		try {
			const response = await fetch('http://localhost:8888/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: login,  // предполагаем, что API ждёт email
					password: password,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('token', data.token);  // Сохраняем токен
				// Перенаправляем на главную
				window.location.href = '/';
				// например: localStorage.setItem('token', data.token);
			} else if (response.status === 401) {
				setError('Неверный логин или пароль.');
			} else {
				setError('Что-то пошло не так. Попробуйте снова.');
			}
		} catch (err) {
			console.error('Ошибка сети:', err);
			setError('Сервер недоступен.');
		}
	};

	return (
		<div className={styles.loginWrapper}>
			<div className={styles.loginCard}>
				<div className={styles.content}>
					<div className={styles.title}>АВТОРИЗАЦИЯ</div>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.inputGroup}>
							<label className={styles.label}>Логин</label>
							<input
								type="text"
								className={styles.input}
								placeholder="Логин"
								value={login}
								onChange={(e) => setLogin(e.target.value)}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label className={styles.label}>Пароль</label>
							<input
								type="password"
								className={styles.input}
								placeholder="Пароль"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className={styles.submitButton}>Войти</button>
						{error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
					</form>
				</div>
				<div className={styles.robotContainer}>
					<img src={robot} alt="robot" className={styles.robot} />
				</div>
			</div>
		</div>
	);
};
