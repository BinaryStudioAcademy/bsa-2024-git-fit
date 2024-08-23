import {
	Button,
	IconButton,
	Input,
	Link,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm = ({ onSubmit }: Properties): JSX.Element => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: UserSignInRequestDto) => {
				onSubmit(formData);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

	return (
		<section className={styles["auth-container"]}>
			<div className={styles["left-side"]}>
				{/* TODO: replace logo */}
				<img alt="logo" className={styles["logo-wrapper"]} src="" />
			</div>
			<div className={styles["right-side"]}>
				<h3 className={styles["form-title"]}>Welcome back</h3>
				<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
					<p className={styles["form-text"]}>
						Don&apos;t have an account?{" "}
						<Link to={AppRoute.SIGN_UP}>Create new</Link>
					</p>
					<Input
						autoComplete="username"
						control={control}
						errors={errors}
						label="Email"
						name="email"
						type="email"
					/>
					<div className={styles["password-container"]}>
						<Input
							autoComplete="one-time-code"
							control={control}
							errors={errors}
							label="Password"
							name="password"
							rightIcon={
								<IconButton
									iconHeight={18}
									iconName={isPasswordVisible ? "strikedEye" : "eye"}
									iconWidth={18}
									label={isPasswordVisible ? "Hide password" : "Show password"}
									onClick={handleTogglePasswordVisibility}
								/>
							}
							type={isPasswordVisible ? "text" : "password"}
						/>
					</div>
					<Button label="Log in" type="submit" />
				</form>
			</div>
		</section>
	);
};

export { SignInForm };
