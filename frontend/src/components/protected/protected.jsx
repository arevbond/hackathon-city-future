import { getIsAuthChecked, getUser } from '@services/user/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { CometLoader } from '../loader/comet-loader';
import { useEffect } from 'react';
import { checkUserAuth } from '@services/user/action';

const Protected = ({ onlyUnAuth = false, component }) => {
	const user = useSelector(getUser);
	const isAuthChecked = useSelector(getIsAuthChecked);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	if (!isAuthChecked) {
		return <CometLoader />;
	}

	if (!onlyUnAuth && !user) {
		// Для авторизованного, но не авторизован
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// Для неавторизованного, но авторизован
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from.pathname} />;
	}

	// onlyUnAuth && !user для неавторизованного и не авторизован
	// !onlyUnAuth && user для авторизованного и авторизован

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
	<Protected onlyUnAuth component={component} />
);
