const HTTPCode = {
	CONFLICT: 409,
	CREATED: 201,
	INTERNAL_SERVER_ERROR: 500,
	NOT_FOUND: 404,
	OK: 200,
	UNAUTHORIZED: 401,
	UNPROCESSED_ENTITY: 422,
} as const;

export { HTTPCode };
