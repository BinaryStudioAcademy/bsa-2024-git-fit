import { type FastifyRequest } from "fastify";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

const checkUserPermissions = (routePermissions: string[]): APIPreHandler => {
	return (request: FastifyRequest): void => {
		const { user } = request;

		if (!user) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const hasPermission = checkHasPermission(
			routePermissions,
			user.groups.flatMap((group) => group.permissions),
		);

		if (!hasPermission) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};
};

export { checkUserPermissions };
