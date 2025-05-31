import { logoutUser } from '@services/user/action';
import { pathPages } from '@utils/page-paths';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Exit = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const logout = async () => {
			// @ts-expect-error "sprint4"
			dispatch(logoutUser());
			navigate(pathPages.login, { replace: true });
		};
		logout();
	}, []);

	return <p className='text text_type_main-medium'> Производится выход </p>;
};
