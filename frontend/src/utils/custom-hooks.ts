import { Dispatch, SetStateAction, useState } from 'react';

type TReturnOnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useForm = <TState extends Record<string, any>>(
	initialState: TState
): [TState, TReturnOnChange, Dispatch<SetStateAction<TState>>] => {
	const [form, setFormValue] = useState(initialState);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	return [form, onChange, setFormValue];
};
