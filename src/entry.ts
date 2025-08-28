import { createFocusTrap } from "./focus-trap";

export { getFocusableElements } from "./focus-trap";

// Re-export createFocusTrap for public API
export { createFocusTrap };

// Provide a more consumer-friendly alias requested by package consumers
export const focusTrap = createFocusTrap;

// Convenience helper: attach a trap immediately to a node and return the detach fn
export function attachFocusTrap(node: HTMLElement) {
	const trap = createFocusTrap(node);
	trap.attach();
	return () => trap.detach();
}
