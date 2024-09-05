import { PAGE_NAME } from "~/libs/enums/enums.js";
import { PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector, useMemo } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/navigation-item.type.js";

import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: NavigationItem[];
};

const Sidebar = ({ items }: Properties): JSX.Element => {
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			if (item.label === PAGE_NAME.ACCESS_MANAGEMENT) {
				if (!authenticatedUser) {
					return false;
				}

				return checkHasPermission(
					[PermissionKey.MANAGE_USER_ACCESS],
					authenticatedUser.groups.flatMap(group => group.permissions)
				);
			}

			return true;
		});
	}, [items, authenticatedUser]);

	return (
		<ul className={styles["sidebar"]}>
			{filteredItems.map((item) => (
				<SidebarItem
					href={item.href}
					icon={item.icon}
					key={item.label}
					label={item.label}
				/>
			))}
		</ul>
	);
};

export { Sidebar };
