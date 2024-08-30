import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({ project }: Properties): JSX.Element => {
	return (
		<NavLink
			className={styles["project"] ?? ""}
			to={AppRoute.PROJECT.replace(":id", project.id.toString())}
		>
			{project.name}
		</NavLink>
	);
};

export { ProjectCard };
