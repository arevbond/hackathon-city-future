// import {
// 	Button,
// 	Input,
// } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './styles.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from '@utils/custom-hooks';
// import { useEffect, useState } from 'react';
// import { Layout } from '../../../layout/layout';
// import { Container } from '../../../container/container';
// import { pathPages } from '@utils/page-paths';
// // import { useDispatch,	useSelector } from 'react-redux';
// import { registerUser } from '@services/user/action';
// import { LoaderForm } from '../../../loader-form/loader-form';
// import {
// 	clearError,
// 	getUserError,
// 	getUserLoading,
// } from '@services/user/reducer';
// import { useDispatch, useSelector } from '@services/store';
//
// export const Register = () => {
// 	const [form, onChange, setFormValue] = useForm({
// 		name: '',
// 		email: '',
// 		password: '',
// 	});
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const loading = useSelector(getUserLoading);
// 	const error = useSelector(getUserError);
//
// 	useEffect(() => {
// 		dispatch(clearError());
// 	}, []);
//
// 	const onLoginClick = () => {
// 		navigate(pathPages.login);
// 	};
//
// 	const onRegisterClick = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
//
// 		dispatch(registerUser(form));
// 	};
//
// 	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
//
// 	const iconType = isVisiblePassword
// 		? 'HideIcon'
// 		: form.password
// 		? 'CloseIcon'
// 		: 'EditIcon';
//
// 	return (
// 		<Layout>
// 			<Container className={styles.container}>
// 				<section className={`${styles.register} `}>
// 					<form onSubmit={onRegisterClick} className={`${styles.form} mb-20`}>
// 						<h3 className='text text_type_main-medium'>Регистрация</h3>
// 						<Input
// 							name='name'
// 							type='text'
// 							placeholder={form.name ? '' : 'Имя'}
// 							onChange={onChange}
// 							value={form.name}
// 						/>
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
// 							icon={iconType}
// 							onChange={onChange}
// 							value={form.password}
// 							onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
// 						/>
// 						<Button htmlType='submit' type='primary' size='large'>
// 							Зарегестрироваться
// 						</Button>
// 						{error && <p className='text text_type_main-medium'> {error} </p>}
// 					</form>
// 					<p className={styles.login}>
// 						<span className='text text_type_main-default text_color_inactive'>
// 							Уже зарегестрировались?
// 						</span>
// 						<Button
// 							onClick={onLoginClick}
// 							htmlType='button'
// 							type='secondary'
// 							size='medium'
// 							extraClass={styles['button-in']}>
// 							Войти
// 						</Button>
// 						{loading && <LoaderForm />}
// 					</p>
// 				</section>
// 			</Container>
// 		</Layout>
// 	);
// };
