import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useForm } from '@utils/custom-hooks';
import { Layout } from '../../../layout/layout';
import { Container } from '../../../container/container';
import { Navigate, useNavigate } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';
import { forgotPasswordApi } from '@utils/api';
import { useEffect, useState } from 'react';
import { LoaderForm } from '../../../loader-form/loader-form';

export const ForgotPassword = () => {
	const [form, onChange] = useForm({
		email: '',
	});
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const isResetPassword = localStorage.getItem('resetPassword');

	useEffect(() => {
		setError(null);
	}, []);

	const forgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const response = await forgotPasswordApi(form);
		setLoading(false);
		if (!response.success) setError(response.message);
		if (response.success) navigate(pathPages.resetPassword);
	};

	const onLoginClick = () => {
		navigate(pathPages.login);
	};

	if (isResetPassword) return <Navigate to={pathPages.resetPassword} />;

	return (
		<Layout>
			<Container className={styles.container}>
				<section className={`${styles.register} `}>
					<form onSubmit={forgotPassword} className={`${styles.form} mb-20`}>
						<h3 className='text text_type_main-medium'>
							Восстановление пароля
						</h3>
						<Input
							name='email'
							type='email'
							placeholder={form.email ? '' : 'Укажите e-mail'}
							onChange={onChange}
							value={form.email}
						/>
						<Button htmlType='submit' type='primary' size='large'>
							Восстановить
						</Button>
						{isLoading && <LoaderForm />}
						{error && <p className='text text_type_main-medium'> {error} </p>}
					</form>
					<p className={`${styles.login} mb-4`}>
						<span className='text text_type_main-default text_color_inactive'>
							Вы вспомнили пароль?
						</span>
						<Button
							onClick={onLoginClick}
							htmlType='button'
							type='secondary'
							size='medium'
							extraClass={styles['button-in']}>
							Войти
						</Button>
					</p>
				</section>
			</Container>
		</Layout>
	);
};
