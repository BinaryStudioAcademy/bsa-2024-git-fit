import { transaction } from "objection";

import { changeCase } from "~/libs/helpers/helpers.js";
import { HTTPCode } from "~/libs/modules/http/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { ExceptionMessage } from "./libs/enums/enums.js";
import { ProjectGroupError } from "./libs/exceptions/exceptions.js";
import { ProjectGroupEntity } from "./project-group.entity.js";
import { type ProjectGroupModel } from "./project-group.model.js";

class ProjectGroupRepository implements Repository {
	private projectGroupModel: typeof ProjectGroupModel;

	public constructor(projectGroupModel: typeof ProjectGroupModel) {
		this.projectGroupModel = projectGroupModel;
	}

	public async create(entity: ProjectGroupEntity): Promise<ProjectGroupEntity> {
		const { name, permissions, projectId, users } = entity.toNewObject();
		const key = changeCase(name, "snakeCase");

		const trx = await transaction.start(this.projectGroupModel.knex());

		try {
			const projectGroupData = {
				key,
				name,
				permissions,
				projects: projectId,
				users,
			};

			const createdProjectGroup = await this.projectGroupModel
				.query(trx)
				.insertGraph(projectGroupData, { relate: true })
				.returning("*")
				.withGraphJoined("[permissions, projects, users]");

			await trx.commit();

			return ProjectGroupEntity.initialize({
				id: createdProjectGroup.id,
				name: createdProjectGroup.name,
				permissions,
				projectId,
				users,
			});
		} catch {
			await trx.rollback();

			throw new ProjectGroupError({
				message: ExceptionMessage.CREATE_PROJECT_GROUP_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve([]);
	}

	public async findByName(name: string): Promise<null | ProjectGroupModel> {
		const key = changeCase(name, "snakeCase");

		return (await this.projectGroupModel.query().findOne({ key })) ?? null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectGroupRepository };
