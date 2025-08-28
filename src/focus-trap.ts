const focusableElementSelector = `
button:not([disabled]),
input:not([disabled]):not([type="hidden"]),
select:not([disabled]),
textarea:not([disabled]),

[contenteditable],
[href],
[tabindex]:not([tabindex="-1"])`;

export function getFocusableElements(element: HTMLElement) {
	return Array.from(element.querySelectorAll(focusableElementSelector)).filter(
		(el): el is Element & { focus: () => void } =>
			"focus" in el && typeof el.focus === "function",
	);
}

export function isHTMLElement(node: null | EventTarget): node is HTMLElement {
	return (
		node !== null && "nodeType" in node && node.nodeType === Node.ELEMENT_NODE
	);
}

export function createFocusTrap(root: HTMLElement) {
	let focusIndex = 0;

	function handleKeydown(event: KeyboardEvent) {
		if (!/tab/i.test(event.key)) return;

		event.preventDefault();

		const { activeElement } = document;
		const focusableElements = getFocusableElements(root);

		if (focusableElements.length === 0) return;

		const firstFocusable = focusableElements[0];
		const isForward = !event.shiftKey;

		if (
			!activeElement ||
			!isHTMLElement(activeElement) ||
			!root.contains(activeElement)
		) {
			firstFocusable.focus();
			focusIndex = 0;
			return;
		}

		const tabMovement = isForward ? 1 : -1;
		const nextFocusIndex =
			(focusIndex + tabMovement + focusableElements.length) %
			focusableElements.length;

		focusableElements[nextFocusIndex].focus();
		focusIndex = nextFocusIndex;
	}

	function attach() {
		document.addEventListener("keydown", handleKeydown);
	}

	function detach() {
		document.removeEventListener("keydown", handleKeydown);
	}

	return { attach, detach };
}
