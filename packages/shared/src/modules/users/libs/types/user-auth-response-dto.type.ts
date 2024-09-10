type UserAuthResponseDto = {
	createdAt: string;
	email: string;
	groups: {
		id: number;
		name: string;
		permissions: {
			id: number;
			key: string;
			name: string;
		}[];
	}[];
	id: number;
	name: string;
};

export { type UserAuthResponseDto };
