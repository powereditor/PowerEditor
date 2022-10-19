const rollup = require("rollup");
const path = require("path");
const typescript = require("rollup-plugin-typescript");
const livereload = require("rollup-plugin-livereload");
const serve = require("rollup-plugin-serve");
const html = require("@rollup/plugin-html");
const sass = require("rollup-plugin-sass");
const htmlTemplate = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>demo</title><link rel="stylesheet" href="./index.css"></head><body>
<div id='editor'>测试测试测试<br />测试测试</div><script src='./index.js'></script></body></html>`;
const inputOptions = {
  input: path.join(process.cwd(), "src/index.ts"),
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
    html({ template: () => htmlTemplate }),
    livereload(),
    serve({ open: true, port: 8086, contentBase: "dist" }),
    sass({
      output: "dist/index.css",
    }),
  ],
};
const outputOptions = {
  file: path.join(process.cwd(), "dist/index.js"),
  format: "esm",
  sourcemap: true,
};
async function build() {
  const bundle = await rollup.rollup(inputOptions);
  const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}
build();
//  rollup.watch({ include: "src/**" });
