import React, { useState } from 'react';
import styles from './styles.module.css';
import robot from './assets/robot.png';
import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';

export const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const response = await fetch('http://localhost:8888/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: login,
					password: password,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('token', data.token);
				window.location.href = '/';
			} else if (response.status === 401) {
				setError('Неверный логин или пароль.');
			} else {
				setError('Что-то пошло не так. Попробуйте снова.');
			}
		} catch (err) {
			console.error('Ошибка сети:', err);
			setError('Сервер недоступен.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout>
			<Container>
				<div className={styles.loginWrapper}>
					<div className={styles.loginCard}>
						<div className={styles.robotContainer}>
							<img src={robot} alt="Robot" className={styles.robot} />
						</div>

						<div className={styles.content}>
							<h1 className={styles.title}>АВТОРИЗАЦИЯ</h1>

							<form className={styles.form} onSubmit={handleSubmit}>
								<div className={styles.inputGroup}>
									<label className={styles.label}>Логин</label>
									<input
										type="email"
										className={styles.input}
										value={login}
										onChange={(e) => setLogin(e.target.value)}
										placeholder="example@mail.com"
										required
										autoComplete="email"
									/>
								</div>

								<div className={styles.inputGroup}>
									<label className={styles.label}>Пароль</label>
									<input
										type="password"
										className={styles.input}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Введите пароль"
										required
										autoComplete="current-password"
									/>
								</div>

								<button
									type="submit"
									className={styles.submitButton}
									disabled={isLoading}
								>
									{isLoading ? 'Входим...' : 'Войти'}
								</button>

								{error && (
									<div className={styles.error}>{error}</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</Container>
		</Layout>
	);
};