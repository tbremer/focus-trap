import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createFocusTrap, getFocusableElements } from "../src/focus-trap";

describe("createFocusTrap", () => {
	let root: HTMLElement;

	beforeEach(() => {
		root = document.createElement("div");
		document.body.appendChild(root);
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("focuses first focusable when Tab pressed from outside", () => {
		root.innerHTML = '<button id="b1">one</button><button id="b2">two</button>';
		const trap = createFocusTrap(root);
		trap.attach();

		const evt = new KeyboardEvent("keydown", { key: "Tab" });
		document.dispatchEvent(evt);

		expect(document.activeElement).toBe(root.querySelector("#b1"));

		trap.detach();
	});

	it("cycles focus forward/backward", () => {
		root.innerHTML = '<button id="b1">one</button><button id="b2">two</button>';
		const b1 = root.querySelector("#b1") as HTMLElement;
		const b2 = root.querySelector("#b2") as HTMLElement;

		const trap = createFocusTrap(root);
		trap.attach();

		// focus first
		document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
		expect(document.activeElement).toBe(b1);

		// Tab -> b2
		document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
		expect(document.activeElement).toBe(b2);

		// Shift+Tab -> b1
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Tab", shiftKey: true }),
		);
		expect(document.activeElement).toBe(b1);

		trap.detach();
	});
});

describe("getFocusableElements", () => {
	it("returns focusable elements", () => {
		const root = document.createElement("div");
		root.innerHTML =
			'<button id="b1">one</button><div tabindex="0" id="d1"></div>';
		const list = getFocusableElements(root);
		expect(list.length).toBe(2);
	});
});
