import { expectType } from "tsd";
import { focusTrap } from "../dist/types/entry";

const el = document.createElement("div");
const trap = focusTrap(el as unknown as HTMLElement);
expectType<() => void>(trap.attach);
expectType<() => void>(trap.detach);
