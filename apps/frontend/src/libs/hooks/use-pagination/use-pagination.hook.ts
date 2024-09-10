import { QueryParameterName } from "~/libs/enums/enums.js";
import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

import { FIRST_PAGE } from "./libs/constants/constants.js";
import {
	calculateTotalPages,
	getInitialPage,
	getInitialPageSize,
} from "./libs/helpers/helpers.js";
import { type UsePagination } from "./libs/types/types.js";

const usePagination: UsePagination = ({
	queryParameterPrefix,
	totalItemsCount,
}) => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	const pageParameterName = queryParameterPrefix + QueryParameterName.PAGE;
	const pageSizeParameterName =
		queryParameterPrefix + QueryParameterName.PAGE_SIZE;

	const NamedPageParameter = searchParameters.get(pageParameterName);
	const NamedPageSizeParameter = searchParameters.get(pageSizeParameterName);

	const [pageSize, setPageSize] = useState<number>(() =>
		getInitialPageSize(NamedPageSizeParameter),
	);
	const [page, setPage] = useState<number>(() => {
		const initialTotalPages = calculateTotalPages(pageSize, totalItemsCount);

		return getInitialPage(NamedPageParameter, initialTotalPages);
	});

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);
		updatedSearchParameters.set(pageParameterName, String(page));
		updatedSearchParameters.set(pageSizeParameterName, String(pageSize));
		setSearchParameters(updatedSearchParameters);
	}, [
		page,
		pageSize,
		setSearchParameters,
		pageParameterName,
		pageSizeParameterName,
	]);

	const onPageChange = useCallback(
		(newPage: number) => {
			const totalPages = calculateTotalPages(pageSize, totalItemsCount);

			if (page >= FIRST_PAGE && page <= totalPages) {
				setPage(newPage);
			}
		},
		[page, pageSize, totalItemsCount],
	);

	const onPageSizeChange = useCallback(
		(newPageSize: number) => {
			setPageSize(newPageSize);

			const totalPages = calculateTotalPages(newPageSize, totalItemsCount);

			if (page > totalPages) {
				setPage(totalPages);
			}
		},
		[page, totalItemsCount],
	);

	return {
		onPageChange,
		onPageSizeChange,
		page,
		pageSize,
	};
};

export { usePagination };
