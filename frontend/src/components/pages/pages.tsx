import { Route, Routes, useLocation } from 'react-router-dom';

import { pathPages } from '@utils/page-paths';

import { Page404 } from './error404-page/erro404-page';

import { Home } from './home/home';
import {Login} from "./login/login";
import {Report} from "./report/report";

export const Pages = () => {
	const location = useLocation();
	const state = location.state || {};

	return (
		<>
			<Routes location={state?.backgroundLocation || location}>
				{/* домашняя страницы */}
				<Route path={pathPages.home} element={<Home />} />
				<Route path={pathPages.login} element={<Login />} />
				<Route path={pathPages.repeat} element={<Report />} />
				<Route path='*' element={<Page404 />} />
			</Routes>
		</>
	);
};
