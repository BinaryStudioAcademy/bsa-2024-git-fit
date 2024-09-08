import { useEffect, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	left?: number;
	top?: number;
};

const usePopoverPosition = <T extends HTMLElement>(
	reference: React.RefObject<T>,
	isActive: boolean,
	usePositioning: boolean = false,
): Properties => {
	const [position, setPosition] = useState<Properties>({});

	useEffect(() => {
		if (usePositioning && isActive && reference.current) {
			const targetRect = reference.current.getBoundingClientRect();
			const { left, top } = targetRect;

			const scrollOffset = window.scrollY || document.documentElement.scrollTop;

			setPosition({
				left,
				top: top + scrollOffset,
			});
		} else {
			setPosition({});
		}
	}, [reference, isActive, usePositioning]);

	return position;
};

export { usePopoverPosition };
