import { type Token } from "~/libs/modules/token/token.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private tokenService: Token;
	private userService: UserService;

	public constructor(userService: UserService, tokenService: Token) {
		this.userService = userService;
		this.tokenService = tokenService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		// TODO: should be changed after sign-up implementation
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.createToken({ userId: user.user.id });

		return { token, user: user.user };
	}
}

export { AuthService };
