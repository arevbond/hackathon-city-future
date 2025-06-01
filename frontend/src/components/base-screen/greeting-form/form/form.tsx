import { useForm } from '@utils/custom-hooks';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';

import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';

export const Form = () => {
	const [form, onChange, setFormValue] = useForm({
		name: '',
		email: '',
		tel: '',
		check: false,
	});

	const navigate = useNavigate();

	const onLoginClick = () => {
		console.log('JOB');
	};

	const onRegisterClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(pathPages.clientForm, { replace: true });
		console.log(form);
	};

	return (
		<div>
			<section className={`${styles.register} `}>
				<form onSubmit={onRegisterClick} className={`${styles.form} mb-20`}>
					<Input
						name='name'
						type='text'
						placeholder={form.name ? '' : 'Имя'}
						onChange={onChange}
						value={form.name}
					/>
					<Input
						name='tel'
						type='text'
						placeholder={form.tel ? '' : 'Телефон'}
						onChange={onChange}
						value={form.tel}
					/>
					<Input
						name='email'
						type='text'
						placeholder={form.email ? '' : 'Email'}
						onChange={onChange}
						value={form.email}
					/>
					<label className={styles.checkbox}>
						<input name='check' type='checkbox' onChange={onChange} required />
						<span>
							Нажимая кнопку «Отправить», я даю своё согласие на обработку моих
							персональных данных, в соответствии с Федеральным законом от
							27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для
							целей, определённых в Согласии на обработку персональных данных
						</span>
					</label>
					<Button htmlType='submit' variant='primary'>
						Перейти к пингу
					</Button>
				</form>
			</section>
		</div>
	);
};
