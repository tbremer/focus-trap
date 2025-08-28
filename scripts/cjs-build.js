const fs = require("node:fs");
const path = require("node:path");

// create a tiny CommonJS wrapper that loads the ESM build
const esmMain = path.join(__dirname, "..", "dist", "esm", "entry.js");
const esmReact = path.join(__dirname, "..", "dist", "esm", "react.js");
const outMain = path.join(__dirname, "..", "dist", "index.cjs.js");
const outReact = path.join(__dirname, "..", "dist", "react.cjs.js");

function writeWrapper(esmPath, outPath) {
	if (!fs.existsSync(esmPath)) {
		console.warn("ESM build not found for", esmPath, "skipping");
		return;
	}

	const rel = `./${path.relative(path.join(__dirname, ".."), esmPath)}`;
	const content = `Object.defineProperty(exports, "__esModule", { value: true });
const mod = require(${JSON.stringify(rel)});
for (const k in mod) exports[k] = mod[k];
`;

	fs.writeFileSync(outPath, content);
	console.log("Wrote", outPath);
}

writeWrapper(esmMain, outMain);
writeWrapper(esmReact, outReact);
