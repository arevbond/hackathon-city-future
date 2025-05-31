import download from './assets/download.png';
import lamp from './assets/lamp.png';
import { Form } from './form/form';

export const GreetingForm = () => {
	return (
		<div>
			<h2>
				<span>краткий пинг</span> - и мы в деле!
			</h2>
			<p>
				Форма простая, как DevOps-шутка. Вы пишете, что нужно — мы читаем,
				анализируем и отвечаем по делу.
			</p>
			<img src={download} alt={':)'} />
			<img src={lamp} alt={':)'} />
			<Form />
		</div>
	);
};
