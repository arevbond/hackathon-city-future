import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useForm } from '@utils/custom-hooks';
import { useState } from 'react';
import { Layout } from '../../../layout/layout';
import { Container } from '../../../container/container';
import { Navigate, useNavigate } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';
import { LoaderForm } from '../../../loader-form/loader-form';
import { resetPasswordApi } from '@utils/api';

export const ResetPassword = () => {
	const [form, onChange] = useForm({
		token: '',
		password: '',
	});
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isReset, setReset] = useState(false);
	const navigate = useNavigate();

	const isResetPassword = localStorage.getItem('resetPassword');

	const forgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const response = await resetPasswordApi(form);
		setLoading(false);

		if (!response.success) setError(response.message);
		if (response.success) {
			setReset(true);
			navigate(pathPages.login);
		}
	};

	const onLoginClick = () => {
		navigate(pathPages.login);
	};

	if (!isResetPassword && !isReset)
		return <Navigate to={pathPages.forgotPassword} />;
	return (
		<Layout>
			<Container className={styles.container}>
				<section className={`${styles.register} `}>
					<form onSubmit={forgotPassword} className={`${styles.form} mb-20`}>
						<h3 className='text text_type_main-medium'>
							Восстановление пароля
						</h3>

						<Input
							name='password'
							type={isVisiblePassword ? 'text' : 'password'}
							placeholder={form.password ? '' : 'Введите новый пароль'}
							{...(isVisiblePassword
								? { icon: 'HideIcon' }
								: { icon: 'ShowIcon' })}
							onChange={onChange}
							value={form.password}
							onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
						/>
						<Input
							name='token'
							type='text'
							placeholder={form.token ? '' : 'Введите код из письма'}
							onChange={onChange}
							value={form.token}
						/>
						<Button htmlType='submit' type='primary' size='large'>
							Войти
						</Button>
						{isLoading && <LoaderForm />}
						{error && <p className='text text_type_main-medium'> {error} </p>}
					</form>
					<p className={`${styles.login} mb-4`}>
						<span className='text text_type_main-default text_color_inactive'>
							Вспомнил пароль?
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
