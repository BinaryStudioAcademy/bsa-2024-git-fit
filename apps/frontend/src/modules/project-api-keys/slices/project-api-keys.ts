import { create, patch } from "./actions.js";
import { actions } from "./project-api-keys.slice.js";

const allActions = {
	...actions,
	create,
	patch,
};

export { allActions as actions };
export { reducer } from "./project-api-keys.slice.js";
