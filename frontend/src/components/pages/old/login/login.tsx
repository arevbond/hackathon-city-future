// import {
// 	Button,
// 	Input,
// } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './styles.module.css';
// import { useForm } from '@utils/custom-hooks';
// import { useEffect, useState } from 'react';
// import { Layout } from '../../../layout/layout';
// import { Container } from '../../../container/container';
// import { useNavigate } from 'react-router-dom';
// import { pathPages } from '@utils/page-paths';
// import { loginUser } from '@services/user/action';
// // import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch, useSelector } from '@services/store';
// import {
// 	clearError,
// 	getUserError,
// 	getUserLoading,
// } from '@services/user/reducer';
// import { LoaderForm } from '../../../loader-form/loader-form';
//
// export const Login = () => {
// 	const [form, onChange] = useForm({
// 		email: '',
// 		password: '',
// 	});
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const error = useSelector(getUserError);
// 	const loading = useSelector(getUserLoading);
//
// 	useEffect(() => {
// 		dispatch(clearError());
// 	}, []);
//
// 	const onRegisterClick = () => {
// 		navigate(pathPages.register);
// 	};
//
// 	const onForgotPasswordClick = () => {
// 		navigate(pathPages.forgotPassword);
// 	};
//
// 	const onLoginClick = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		dispatch(loginUser(form));
// 	};
//
// 	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
// 	return (
// 		<Layout>
// 			<Container className={styles.container}>
// 				<section className={`${styles.register} `}>
// 					<form onSubmit={onLoginClick} className={`${styles.form} mb-20`}>
// 						<h3 className='text text_type_main-medium'>Вход</h3>
// 						<Input
// 							name='email'
// 							type='email'
// 							placeholder={form.email ? '' : 'E-mail'}
// 							onChange={onChange}
// 							value={form.email}
// 						/>
// 						<Input
// 							name='password'
// 							type={isVisiblePassword ? 'text' : 'password'}
// 							placeholder={form.password ? '' : 'Пароль'}
// 							{...(isVisiblePassword
// 								? { icon: 'HideIcon' }
// 								: { icon: 'ShowIcon' })}
// 							onChange={onChange}
// 							value={form.password}
// 							onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
// 						/>
// 						<Button htmlType='submit' type='primary' size='large'>
// 							Войти
// 						</Button>
// 						{loading && <LoaderForm />}
// 						{error && <p className='text text_type_main-medium'> {error} </p>}
// 					</form>
// 					<p className={`${styles.login} mb-4`}>
// 						<span className='text text_type_main-default text_color_inactive'>
// 							Вы — новый пользователь?
// 						</span>
// 						<Button
// 							onClick={onRegisterClick}
// 							htmlType='button'
// 							type='secondary'
// 							size='medium'
// 							extraClass={styles['button-in']}>
// 							Зарегестрироваться
// 						</Button>
// 					</p>
// 					<p className={styles.login}>
// 						<span className='text text_type_main-default text_color_inactive'>
// 							Забыли пароль?
// 						</span>
// 						<Button
// 							onClick={onForgotPasswordClick}
// 							htmlType='button'
// 							type='secondary'
// 							size='medium'
// 							extraClass={styles['button-in']}>
// 							Восстановить пароль
// 						</Button>
// 					</p>
// 				</section>
// 			</Container>
// 		</Layout>
// 	);
// };
