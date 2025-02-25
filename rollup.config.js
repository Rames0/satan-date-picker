import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/StnNepaliDatePicker.jsx",
  output: {
    file: "dist/index.js",
    format: "cjs",
    exports: "default",
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: "bundled", presets: ["@babel/preset-react"] }),
  ],
  external: ["react", "react-dom"],
};
