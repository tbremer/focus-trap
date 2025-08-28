import { useEffect, useRef } from "react";
import { createFocusTrap } from "./focus-trap";

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
	node: null | T,
) {
	const trapRef = useRef<ReturnType<typeof createFocusTrap> | null>(null);

	useEffect(() => {
		if (node === null) {
			if (trapRef.current) {
				trapRef.current.detach();
				trapRef.current = null;
			}
			return;
		}

		trapRef.current = createFocusTrap(node);
		trapRef.current.attach();

		return () => {
			if (trapRef.current) trapRef.current.detach();
		};
	}, [node]);
}
