// import {
// 	Button,
// 	Input,
// } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './styles.module.css';
// import { useState } from 'react';
// import { useForm } from '@utils/custom-hooks';
// // import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch, useSelector } from '@services/store';
// import { getUser } from '@services/user/reducer';
// import { editProfileUser } from '@services/user/action';
//
// const initialFormState = {
// 	name: '',
// 	email: '',
// 	password: '',
// };
//
// export type TUserData = {
// 	name: string;
// 	email: string;
// 	password: string;
// };
//
// export const EditingProfile = () => {
// 	const [form, onChange, setFormValue] = useForm<TUserData>(initialFormState);
// 	const dispatch = useDispatch();
// 	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
//
// 	const user: TUserData | null = useSelector(getUser) as TUserData | null;
// 	const onIconClick = (key: string) => {
// 		setFormValue({
// 			...form,
// 			[key]: '',
// 		});
// 	};
//
// 	const resetAllForm = () => {
// 		setFormValue(initialFormState);
// 	};
//
// 	const onEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		dispatch(editProfileUser({ ...user, ...form }));
// 	};
//
// 	return (
// 		<div>
// 			<form onSubmit={onEditProfile} className={`${styles.form} mb-6`}>
// 				<Input
// 					name='name'
// 					type='text'
// 					placeholder={form.name ? '' : 'Имя'}
// 					icon={form.name ? 'CloseIcon' : 'EditIcon'}
// 					onChange={onChange}
// 					{...(form.name && { onIconClick: () => onIconClick('name') })}
// 					value={form.name || (user ? user.name : '')}
// 				/>
// 				<Input
// 					name='email'
// 					type='email'
// 					placeholder={form.email ? '' : 'Логин'}
// 					icon={form.email ? 'CloseIcon' : 'EditIcon'}
// 					onChange={onChange}
// 					{...(form.email && { onIconClick: () => onIconClick('email') })}
// 					value={form.email || (user ? user.email : '')}
// 				/>
// 				<Input
// 					name='password'
// 					type={isVisiblePassword ? 'text' : 'password'}
// 					placeholder={form.password ? '' : 'Пароль'}
// 					icon={form.password ? 'CloseIcon' : 'EditIcon'}
// 					{...(isVisiblePassword && !form.password && { icon: 'ShowIcon' })}
// 					onChange={onChange}
// 					value={form.password}
// 					success={true}
// 					onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
// 					{...(form.password && { onIconClick: () => onIconClick('password') })}
// 				/>
// 				{(form.name || form.email || form.password) && (
// 					<div className={styles.actions}>
// 						<button
// 							className={`${styles.cancel} text text_type_main-medium`}
// 							onClick={resetAllForm}>
// 							Отмена
// 						</button>
// 						<Button htmlType='submit' type='primary' size='large'>
// 							Сохранить
// 						</Button>
// 					</div>
// 				)}
// 			</form>
// 		</div>
// 	);
// };
