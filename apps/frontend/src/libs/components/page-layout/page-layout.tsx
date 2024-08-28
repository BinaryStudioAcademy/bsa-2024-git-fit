import { type ReactNode } from "react";

import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";

import { Header } from "../header/header.js";
import { Sidebar } from "../sidebar/sidebar.js";
import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
};

const PageLayout = ({ children }: Properties): JSX.Element => {
	return (
		<div className={styles["page"]}>
			<div className={styles["page-header"]}>
				<Header />
			</div>
			<aside className={styles["page-sidebar"]}>
				<Sidebar items={SIDEBAR_ITEMS} />
			</aside>
			<main className={styles["page-content"]}>{children}</main>
		</div>
	);
};

export { PageLayout };
