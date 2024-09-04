import { create, deleteById, getById, loadAll, patch } from "./actions.js";
import { actions } from "./project.slice.js";

const allActions = {
	...actions,
	create,
	deleteById,
	getById,
	loadAll,
	patch,
};

export { allActions as actions };
export { reducer } from "./project.slice.js";
