import { expectType } from 'tsd';
import { createFocusTrap } from '../src/entry';

const el = document.createElement('div');
const trap = createFocusTrap(el);
expectType<() => void>(trap.attach);
expectType<() => void>(trap.detach);
