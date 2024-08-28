import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { ProjectGroupError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupCreateResponseDto,
} from "./libs/types/types.js";
import { ProjectGroupEntity } from "./project-group.entity.js";
import { type ProjectGroupRepository } from "./project-group.repository.js";

class ProjectGroupService implements Service {
	private projectGroupRepository: ProjectGroupRepository;

	public constructor(projectGroupRepository: ProjectGroupRepository) {
		this.projectGroupRepository = projectGroupRepository;
	}

	public async create(
		payload: ProjectGroupCreateRequestDto,
	): Promise<ProjectGroupCreateResponseDto> {
		const { name, permissionIds = [], projectId, userIds } = payload;

		const existingProjectGroup =
			await this.projectGroupRepository.findByName(name);

		if (existingProjectGroup) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.projectGroupRepository.create(
			ProjectGroupEntity.initializeNew({
				name,
				permissionIds: permissionIds.map((id) => ({ id })),
				projectId: { id: projectId },
				userIds: userIds.map((id) => ({ id })),
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectGroupService };
