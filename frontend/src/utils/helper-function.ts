import { FILTER_DECRYPTION } from './filter-decryption';

export const getFilteredDataByCategory = <
	TArrElement,
	TFilter extends keyof TArrElement
>(
	arr: TArrElement[],
	filter: TFilter
): { [key in string]: TArrElement[] } => {
	return arr.reduce(
		(acc: { [key in string]: TArrElement[] }, element: TArrElement) => {
			const category = String(element[filter]);
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(element);
			return acc;
		},
		{} as { [key: string]: TArrElement[] }
	);
};

type TObj = {
	[key in string]: string;
};

export const getKeyToValue = (obj: TObj = FILTER_DECRYPTION, value: string) => {
	return Object.keys(obj).find((key) => obj[key] === value);
};

export const getLastPath = (path: string): string => {
	const index = path.lastIndexOf('/');
	return path.slice(index + 1);
};

export const getIngredientsMap = <T extends { _id: string }>(
	ingredients: T[]
): Record<string, T> => {
	return ingredients.reduce<Record<string, T>>(
		(acc: Record<string, T>, ingredient: T) => {
			acc[ingredient._id] = ingredient;
			return acc;
		},
		{} as Record<string, T>
	);
};
