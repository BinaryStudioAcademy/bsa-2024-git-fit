import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
import { userController, userService } from "~/modules/users/users.js";

import { token } from "../token/token.js";
import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...userController.routes,
);
const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	options: { services: { userService }, token },
	title: "GitFit",
});

export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
export { serverApplication };
