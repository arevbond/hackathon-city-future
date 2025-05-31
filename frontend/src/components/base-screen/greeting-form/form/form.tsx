import { useForm } from '@utils/custom-hooks';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import { useState } from 'react';

import styles from './styles.module.css';

export const Form = () => {
	const [form, onChange, setFormValue] = useForm({
		name: '',
		email: '',
		password: '',
	});

	const onLoginClick = () => {
		console.log('JOB');
	};

	const onRegisterClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(form);
	};

	const [isVisiblePassword, setIsVisiblePassword] = useState(false);

	const iconType = isVisiblePassword
		? 'HideIcon'
		: form.password
		? 'CloseIcon'
		: 'EditIcon';

	return (
		<section className={`${styles.register} `}>
			<form onSubmit={onRegisterClick} className={`${styles.form} mb-20`}>
				<h3 className='text text_type_main-medium'>Регистрация</h3>
				<Input
					name='name'
					type='text'
					placeholder={form.name ? '' : 'Имя'}
					onChange={onChange}
					value={form.name}
				/>
				<Input
					name='email'
					type='email'
					placeholder={form.email ? '' : 'E-mail'}
					onChange={onChange}
					value={form.email}
				/>
				<Input
					name='password'
					type={isVisiblePassword ? 'text' : 'password'}
					placeholder={form.password ? '' : 'Пароль'}
					onChange={onChange}
					value={form.password}
				/>
				<Button htmlType='submit' variant='primary'>
					Зарегестрироваться
				</Button>
			</form>
			{/*<p className={styles.login}>*/}
			{/*	<span className='text text_type_main-default text_color_inactive'>*/}
			{/*		Уже зарегестрировались?*/}
			{/*	</span>*/}
			{/*	<Button*/}
			{/*		onClick={onLoginClick}*/}
			{/*		htmlType='button'*/}
			{/*		type='secondary'*/}
			{/*		size='medium'*/}
			{/*		extraClass={styles['button-in']}>*/}
			{/*		Войти*/}
			{/*	</Button>*/}
			{/*	{loading && <LoaderForm />}*/}
			{/*</p>*/}
		</section>
	);
};
