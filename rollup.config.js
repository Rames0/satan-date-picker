import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/StnNepaliDatePicker.jsx", // Ensure this matches your actual component
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "default",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: "bundled", presets: ["@babel/preset-react"] }),
  ],
  external: ["react", "react-dom", "react-icons"], // Add react-icons here
};
