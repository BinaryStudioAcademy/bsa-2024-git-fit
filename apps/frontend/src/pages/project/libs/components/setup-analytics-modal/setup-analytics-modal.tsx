import {
	Button,
	IconButton,
	Input,
	Modal,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import { type ProjectGetByIdResponseDto } from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	isOpened: boolean;
	onClose: () => void;
	project: ProjectGetByIdResponseDto;
};

const SetupAnalyticsModal = ({
	isOpened,
	onClose,
	project,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { control, errors, handleSubmit, handleValueSet } = useAppForm({
		defaultValues: {
			apiKey: project.apiKey ?? "",
			projectId: project.id,
		},
	});
	const { dataStatus } = useAppSelector(({ projectApiKeys }) => projectApiKeys);

	const hasProjectApiKey = project.apiKey !== null;
	const isCopyButtonDisabled =
		!hasProjectApiKey || dataStatus === DataStatus.PENDING;

	const handleGenerateSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ projectId }: { projectId: number }) => {
				return dispatch(projectApiKeyActions.create({ projectId }));
			})(event_);
		},
		[handleSubmit, dispatch],
	);

	const handleCopyToClipboardClick = useCallback(() => {
		void dispatch(
			projectApiKeyActions.copyToClipboard(project.apiKey as string),
		);
	}, [dispatch, project.apiKey]);

	useEffect(() => {
		handleValueSet("apiKey", project.apiKey ?? "");
	}, [handleValueSet, project.apiKey]);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title="Setup Analytics">
			<div className={styles["content"]}>
				<form
					className={styles["api-key-container"]}
					onSubmit={handleGenerateSubmit}
				>
					<Input
						control={control}
						errors={errors}
						isReadOnly
						label="API key"
						name="apiKey"
						placeholder="No API key"
						rightIcon={
							<IconButton
								iconName="clipboard"
								isDisabled={isCopyButtonDisabled}
								label="Copy API key"
								onClick={handleCopyToClipboardClick}
							/>
						}
					/>
					<div className={styles["button-wrapper"]}>
						<Button
							label={hasProjectApiKey ? "Regenerate" : "Generate"}
							type="submit"
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export { SetupAnalyticsModal };
