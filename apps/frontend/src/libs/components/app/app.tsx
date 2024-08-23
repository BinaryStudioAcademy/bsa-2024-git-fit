import reactLogo from "~/assets/images/react.svg";
import {
	Link,
	Loader,
	RouterOutlet,
	Select,
	Table,
} from "~/libs/components/components.js";
import {
	mockColumns as mockTableColumns,
	mockData as mockTableData,
	type Person,
} from "~/libs/components/table/mock-data.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { type Option } from "../select/select.js";

type SelectData = {
	options: Option<number>[];
};

const App = (): JSX.Element => {
	const { control } = useAppForm<SelectData>({
		defaultValues: {
			options: [],
		},
	});

	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const users = useAppSelector(({ users }) => users.users);

	const isRoot = pathname === AppRoute.ROOT;
	const isLoading = dataStatus === "pending";

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	return (
		<>
			<img alt="logo" src={reactLogo} width="30" />

			<ul>
				<li>
					<Link to={AppRoute.ROOT}>Root</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_UP}>Sign up</Link>
				</li>
			</ul>
			<p>Current path: {pathname}</p>

			<div>
				<RouterOutlet />
			</div>
			{isRoot && (
				<>
					<h2>Users:</h2>
					<h3>Status: {dataStatus}</h3>

					{isLoading ? (
						<Loader />
					) : (
						<ul>
							{users.map((user) => (
								<li key={user.id}>{user.email}</li>
							))}
						</ul>
					)}
					<Table<Person> columns={mockTableColumns} data={mockTableData} />
				</>
			)}
			<Select<SelectData, number>
				control={control}
				isMulti
				name="options"
				options={[]}
				title="gdhgf"
			/>
		</>
	);
};

export { App };
