import React, { useEffect } from 'react';
import { CometLoader } from '../loader/comet-loader';
import { Error } from '../error/error';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '@services/ingredients/action';
import {
	getIngredients,
	getIngredientsError,
	getIngredientsHasError,
	getIngredientsLoading,
} from '@services/ingredients/reducer';

import { Pages } from '../pages/pages';

export const App = () => {
	const data = useSelector(getIngredients);
	const loading = useSelector(getIngredientsLoading);
	const hasError = useSelector(getIngredientsHasError);
	const errorMessage: string | undefined = useSelector(getIngredientsError);
	const dispatch = useDispatch();

	useEffect(() => {
		// @ts-expect-error "sprint4"
		dispatch(getAllIngredients());
	}, []);

	if (!data.length) return loading && <CometLoader />;
	if (data.length && !hasError) return <Pages />;
	return <Error text={errorMessage || ''} />;
};
