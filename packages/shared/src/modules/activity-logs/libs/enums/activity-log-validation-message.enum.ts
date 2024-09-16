const ActivityLogValidationMessage = {
	AUTHOR_EMAIL_INVALID: "Author email must be a valid email address.",
	AUTHOR_EMAIL_REQUIRED: "Author email is required.",
	AUTHOR_NAME_REQUIRED: "Author name is required.",
	COMMITS_NUMBER_REQUIRED: "Commits number is required.",
	DATE_REQUIRED: "Date is required.",
	ITEMS_REQUIRED: "Activity log items cannot be empty.",
} as const;

export { ActivityLogValidationMessage };
