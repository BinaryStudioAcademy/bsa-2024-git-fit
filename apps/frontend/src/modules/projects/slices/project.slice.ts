import { createSlice } from "@reduxjs/toolkit";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import {
	type ProjectGetAllItemResponseDto,
	type ProjectGetByIdResponseDto,
} from "~/modules/projects/projects.js";

import { create, deleteById, getById, loadAll, patch } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	project: null | ProjectGetByIdResponseDto;
	projectCreateStatus: ValueOf<typeof DataStatus>;
	projectPatchStatus: ValueOf<typeof DataStatus>;
	projects: ProjectGetAllItemResponseDto[];
	projectStatus: ValueOf<typeof DataStatus>;
	projectsTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	project: null,
	projectCreateStatus: DataStatus.IDLE,
	projectPatchStatus: DataStatus.IDLE,
	projects: [],
	projectStatus: DataStatus.IDLE,
	projectsTotalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.projectStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.project = action.payload;
			state.projectStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.rejected, (state) => {
			state.project = null;
			state.projectStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			const { items, page, totalItems } = action.payload;

			state.projects =
				page === EMPTY_LENGTH ? items : [...state.projects, ...items];
			state.projectsTotalCount = totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.projects = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(create.pending, (state) => {
			state.projectCreateStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.projects = [action.payload, ...state.projects];
			state.projectCreateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.projectCreateStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.projectPatchStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			const updatedProject = action.payload;
			state.projects = state.projects.map((project) =>
				project.id === updatedProject.id ? updatedProject : project,
			);

			state.projectPatchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.projectPatchStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteById.fulfilled, (state, action) => {
			const deletedProjectId = action.meta.arg;
			state.projects = state.projects.filter(
				(project) => project.id !== deletedProjectId,
			);
		});
		builder.addCase(projectApiKeyActions.create.fulfilled, (state, action) => {
			if (state.project) {
				state.project.apiKey = action.payload.apiKey;
			}
		});
	},
	initialState,
	name: "projects",
	reducers: {},
});

export { actions, name, reducer };
