import type { DefineComponent } from 'vue';
import {
	FilterComparison,
	SortType,
	ServerOptions,
	Header,
	Item,
	ClickRowArgument,
	FilterOption,
	BodyItemClassNameFunction,
	BodyRowClassNameFunction,
	HeaderItemClassNameFunction,
	UpdateSortArgument,
	TextDirection,
} from 'vue3-easy-data-table';

declare module 'vue3-easy-data-table' {
	const component: DefineComponent;
	export default component;
	export {
		FilterComparison,
		SortType,
		ServerOptions,
		Header,
		Item,
		ClickRowArgument,
		FilterOption,
		BodyItemClassNameFunction,
		BodyRowClassNameFunction,
		HeaderItemClassNameFunction,
		UpdateSortArgument,
		TextDirection,
	};
}
