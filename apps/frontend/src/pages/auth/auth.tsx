import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { type UserSignUpRequestDto } from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";

const Auth = (): JSX.Element => {
	const dataStatus = useAppSelector((state) => state.auth.dataStatus);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	const handleSignInSubmit = useCallback((): void => {
		// handle sign in
	}, []);

	const handleSignUpSubmit = useCallback(
		async (payload: UserSignUpRequestDto): Promise<void> => {
			await dispatch(authActions.signUp(payload));
		},
		[dispatch],
	);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}

			case AppRoute.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}
		}

		return null;
	};

	return (
		<>
			State: {dataStatus}
			{handleScreenRender(pathname)}
		</>
	);
};

export { Auth };
