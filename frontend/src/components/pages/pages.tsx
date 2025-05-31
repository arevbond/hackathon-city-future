import { Route, Routes, useLocation } from 'react-router-dom';
import { CheckList } from './old/check-list/check-list';
import { PageConstructorBurger } from './old/page-constructor-burger/page-constructor-burger';
import { PersonalAccount } from './old/personal-account/personal-account';
import { pathPages } from '@utils/page-paths';
import { EditingProfile } from './old/editing-profile/editing-profile';
import { ProfileOrder } from './old/profile-order/profile-order';
import { Register } from './old/register/register';
import { Login } from './old/login/login';
import { ForgotPassword } from './old/forgot-password/forgot-password';
import { ResetPassword } from './old/reset-password/reset-password';
import { Page404 } from './error404-page/erro404-page';
import { ProductDetails } from './old/product-details/product-details';
import { IngredientDetailsModal } from '../burger-ingredients/modal-ingredient-details/ingredient-details-modal';
import { OnlyAuth, OnlyUnAuth } from '../protected/protected';
import { Exit } from './old/exit/exit';
import { OrderDetails } from '../burger-orders/order-details/order-detailsl';
import { OrderDetailsModal } from '../burger-orders/order-details-modal/order-details-modal';

export const Pages = () => {
	const location = useLocation();
	const state = location.state || {};

	return (
		<>
			<Routes location={state?.backgroundLocation || location}>
				{/* домашняя страницы */}
				<Route path={pathPages.home} element={<PageConstructorBurger />} />
				<Route path={pathPages.checkList} element={<CheckList />} />
				<Route
					path={pathPages.personalAccount}
					element={<OnlyAuth component={<PersonalAccount />} />}>
					<Route
						path={pathPages.editingProfile}
						element={<OnlyAuth component={<EditingProfile />} />}
					/>
					<Route
						path={pathPages.profileOrders}
						element={<OnlyAuth component={<ProfileOrder />} />}
					/>
					<Route
						path={pathPages.profileExit}
						element={<OnlyAuth component={<Exit />} />}
					/>
				</Route>
				<Route
					path={pathPages.register}
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path={pathPages.login}
					element={<OnlyUnAuth component={<Login />} />}
				/>
				<Route
					path={pathPages.forgotPassword}
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path={pathPages.resetPassword}
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route
					path={`${pathPages.ingredients}/:id`}
					element={<ProductDetails />}
				/>
				<Route path={`${pathPages.profileOrders}:id`} />
				{/* <Route
					path={`${pathPages.personalAccount}/${pathPages.profileOrders}/:id`}
					element={<OrderDetails />}
				/> */}
				<Route path='*' element={<Page404 />} />
			</Routes>
			{state?.backgroundLocation && (
				<Routes>
					<Route
						path={`${pathPages.ingredients}/:id`}
						element={<IngredientDetailsModal />}
					/>
					<Route
						path={`${pathPages.personalAccount}/${pathPages.profileOrders}/:id`}
						element={<OrderDetailsModal />}
					/>
					<Route
						path={`${pathPages.checkList}/:id`}
						element={<OrderDetailsModal />}
					/>
				</Routes>
			)}
		</>
	);
};
