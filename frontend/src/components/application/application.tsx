import { ApplicationHeader } from './header/application-header';
import { Form1 } from './application-form/form-1/form-1';
import { Form2 } from './application-form/form-2/form2';

export const Application = () => {
	return (
		<div>
			<ApplicationHeader />
			<Form1 />
			<Form2 />
		</div>
	);
};
