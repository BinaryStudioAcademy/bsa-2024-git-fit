const UserValidationRule = {
	EMAIL_MINIMUM_LENGTH: 1,
	NAME_MAXIMUM_LENGTH: 100,
	NAME_MINIMUM_LENGTH: 1,
	PASSWORD_MINIMUM_LENGTH: 3,
} as const;

export { UserValidationRule };
