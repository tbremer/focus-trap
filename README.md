# focus-trap

Small focus trap utility and React hook.

Usage

```ts
import { createFocusTrap } from "@tbremer/focus-trap";

const el = document.getElementById("dialog")!;
const trap = createFocusTrap(el);
trap.attach();
// later
trap.detach();
```

React hook

```tsx
import { useRef } from "react";
import { useFocusTrap } from "@tbremer/focus-trap/react";

function Example() {
  const ref = useRef<HTMLDivElement | null>(null);
  useFocusTrap(ref.current);
  return <div ref={ref}>...</div>;
}
```

Development

Install dependencies and run tests:

```shell
npm ci
npm run test
```

