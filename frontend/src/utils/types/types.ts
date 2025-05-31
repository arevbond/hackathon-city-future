export type TPropsChildren = {
	children?: React.ReactNode;
};

export type TPropsClassName = {
	className?: string;
};
// что-то было в в нижнем типе
//reduce(arg0: (acc: Record<string, TIngredient>, ingredient: TIngredient) => TIngredient, arg1: Record<string, TIngredient>): Record<string, TIngredient>;
export type TIngredient = {
	_id: string;
	name: string;
	type: 'string';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type TAccessToken = string | null;

//как будет более правильно*
export type TRequestOptions = RequestInit;

// export type TRequestOptions =  {
// 	method?: string;
// 	headers?: Record<string, string>;
// 	body?: string;
// };

export type TRegisterUser = {
	email: string;
	password: string;
	name: string;
};

export type TLoginUser = {
	email: string;
	password: string;
};

export type TResetPassword = {
	token: string;
	password: string;
};

export type TEditingProfileUser = TRegisterUser;
