import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect, { type MultiValue, type SingleValue } from "react-select";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController, useMemo } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue> = {
	background?: "primary" | "secondary";
	control: Control<TFieldValues, null>;
	isLabelHidden?: boolean;
	isMulti?: boolean;
	isSearchable?: boolean;
	label: string;
	name: FieldPath<TFieldValues>;
	options: SelectOption<TOptionValue>[];
	placeholder?: string;
	size?: "default" | "small";
};

const Select = <TFieldValues extends FieldValues, TOptionValue>({
	background = "secondary",
	control,
	isLabelHidden = false,
	isMulti = false,
	isSearchable = false,
	label,
	name,
	options,
	placeholder,
	size = "default",
}: Properties<TFieldValues, TOptionValue>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	const isBackgroundPrimary = background === "primary";
	const isSmall = size === "small";
	const labelClassName = getValidClassNames(
		styles["label-text"],
		isLabelHidden && "visually-hidden",
	);

	const handleChange = useCallback(
		(
			selectedOptions:
				| MultiValue<SelectOption<TOptionValue> | undefined>
				| SingleValue<SelectOption<TOptionValue> | undefined>,
		): void => {
			const selectedValues = isMulti
				? (selectedOptions as MultiValue<SelectOption<TOptionValue>>).map(
						({ value }) => value,
					)
				: (selectedOptions as SingleValue<SelectOption<TOptionValue>>)?.value;

			field.onChange(selectedValues);
		},
		[field, isMulti],
	);

	const handleFindOptionByValue = useCallback(
		(value: TOptionValue): SelectOption<TOptionValue> | undefined => {
			return options.find((option) => option.value === value);
		},
		[options],
	);

	const handleSelectedValue = useMemo(() => {
		if (isMulti) {
			return (field.value as TOptionValue[])
				.map((element) => handleFindOptionByValue(element))
				.filter(Boolean);
		}

		return handleFindOptionByValue(field.value as TOptionValue);
	}, [field.value, handleFindOptionByValue, isMulti]);

	return (
		<label className={styles["label"]}>
			<span className={labelClassName}>{label}</span>
			<ReactSelect
				classNames={{
					control: (state) =>
						getValidClassNames(
							styles["control"],
							state.isFocused && styles["control-focused"],
							isSmall && styles["control-small"],
							isBackgroundPrimary && styles["control-primary"],
						),
					indicatorsContainer: () => styles["indicators-container"] as string,
					input: () => styles["input"] as string,
					menu: () =>
						getValidClassNames(
							styles["menu"],
							isBackgroundPrimary && styles["menu-primary"],
						),
					multiValue: () => styles["multi-value"] as string,
					multiValueLabel: () => styles["multi-value-label"] as string,
					noOptionsMessage: () => styles["no-options-message"] as string,
					option: (state) =>
						getValidClassNames(
							styles["option"],
							state.isSelected && styles["option-selected"],
							state.isFocused && styles["option-focused"],
							isSmall && styles["option-small"],
							isBackgroundPrimary && styles["option-primary"],
						),
					placeholder: () => styles["placeholder"] as string,
					singleValue: () =>
						getValidClassNames(
							styles["single-value"],
							isSmall && styles["single-value-small"],
						),
					valueContainer: () => styles["value-container"] as string,
				}}
				isClearable={false}
				isMulti={isMulti}
				isSearchable={isSearchable}
				name={name}
				onChange={handleChange}
				options={options as PathValue<TFieldValues, Path<TFieldValues>>}
				placeholder={placeholder}
				styles={{
					control: (base) => ({
						...base,
						cursor: "pointer",
						minHeight: "32px",
					}),
					option: (base) => ({
						...base,
						cursor: "pointer",
					}),
				}}
				unstyled
				value={handleSelectedValue}
			/>
		</label>
	);
};

export { Select };
