import svgo from "./svgo";
import svgr from "@svgr/core";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const handleSVGName = (e = "") => {
	let name = e.replace(/#|_| |-/g, "");
	let nums = "";
	for (let ch of name) {
		if (!isNaN(ch) && !isNaN(parseInt(ch))) nums += ch;
		else break;
	}
	if (nums.length) {
		name = name.slice(nums.length);
	}
	name = capitalize(name);
	return nums?.length ? name + nums : name;
};

export const handleCode = (code) => {
  return (
    "export " + code.slice(code.indexOf("fun"), code.indexOf("export default"))
  );
};
export const optimize = async (svg) => {
	try {
		let code = await svgo(svg);
		return code;
	} catch (err) {
		return false;
	}
};

export const toJSX = async (svgoCode, name, append=null,RN=false,icon=false) => {
	try {
		const transformedCode = await svgr(
			svgoCode,
			{
				svgCode: "",
				native: RN,
				name: "Icon",
				icon: icon,
				jsx: false,
				jsCode: "",
				prettier: {
					parser: "babel",
					printWidth: 80,
					tabWidth: 2,
					useTabs: false,
					semi: true,
					singleQuote: false,
					quoteProps: "as-needed",
					jsxSingleQuote: false,
					trailingComma: "none",
					bracketSpacing: true,
					jsxBracketSameLine: false,
					arrowParens: "always",
				},
			},
			{
				componentName: append?.length
					? handleSVGName(name.split(".")[0]) + append
					: handleSVGName(name.split(".")[0]),
			}
		);
		return transformedCode;
	} catch (err) {
		return false;
	}
};

export const format = (code)=>{
    return prettier.format(code, {
        parser: "babel",
        plugins: [babylon],
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        quoteProps: "as-needed",
        jsxSingleQuote: false,
        trailingComma: "none",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: "always",
      });
}