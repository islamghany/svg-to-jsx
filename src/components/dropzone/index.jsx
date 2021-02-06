import { useCallback, useEffect, useState,useContext } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import svgo from "../../utils/svgo";
import prettier from "prettier";
import svgr from "@svgr/core";
import {CodeContext} from '../../context'


const UploaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    margin: 0 0 4rem 0;
  }
  .box {
    padding: 2rem 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px dashed ${({ theme }) => theme.secondary};
    border-radius: 1rem;
    min-height: 25rem;
    max-width: 40rem;
    width: 100%;
    outline: none;
    cursor: pointer;
  }
  .icon {
    svg {
      width: 5rem;
      height: 5rem;
    }
    margin-bottom: 2rem;
  }
  p {
    text-align: center;
  }
`;
function UploadIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="#6563ff"
        d="M15.707 5.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L11 5.414V17a1 1 0 002 0V5.414l1.293 1.293a1 1 0 001.414-1.414z"
      />
      <path
        fill="#a2a1ff"
        d="M18 9h-5v8a1 1 0 01-2 0V9H6a3.003 3.003 0 00-3 3v7a3.003 3.003 0 003 3h12a3.003 3.003 0 003-3v-7a3.003 3.003 0 00-3-3z"
      />
    </svg>
  );
}

const handleCode = (code)=>{
   return 'export '+code.slice(code.indexOf('fun'),code.indexOf('export default'));
}
function MyDropzone() {
  const {setJSCode} = useContext(CodeContext);
  const [svgCode, setSVGCode] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSVGCode([]);
    for (var i = 0; i < acceptedFiles.length; i++) {
      setupReader(acceptedFiles[i]);
    }
  }, []);
  function setupReader(file) {
    // eslint-disable-next-line
    var reader = new FileReader();
    reader.onload = function () {
      const binaryStr = reader.result;
      setSVGCode((svgCode) =>
        svgCode.concat({ svg: binaryStr, name: file.name })
      );
    };
    reader.readAsBinaryString(file);
  }
  const onSubmit = async (code) => {
    setJSCode('')
    code.map(async (c) => {
      const svgoCode = await svgo(c.svg);
      const transformedCode = await svgr(
        svgoCode,
        {

          svgCode: "",
          native: false,
          name: "Icon",
          icon: false,
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
        { componentName: c.name.split(".")[0].replace(' ', '') }
      );
       setJSCode((e)=>e+handleCode(transformedCode));
      // const prettierCode = prettier.format(transformedCode, {
      //   parser: "babel",
      //   printWidth: 80,
      //   tabWidth: 2,
      //   useTabs: false,
      //   semi: true,
      //   singleQuote: false,
      //   quoteProps: "as-needed",
      //   jsxSingleQuote: false,
      //   trailingComma: "none",
      //   bracketSpacing: true,
      //   jsxBracketSameLine: false,
      //   arrowParens: "always",
      // });
      // setJSCode((jsCode) => jsCode.concat({ name: c.name, svg: prettierCode }));
    });
  };
  const {
    rejectedFiles,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: "image/svg+xml",
  });
  useEffect(() => {
    if (svgCode.length && svgCode.length === acceptedFiles.length) {
      onSubmit(svgCode);
    }
  }, [svgCode]);

  return (
    <UploaderContainer>
      <h1>Upload Svgs</h1>

      <div {...getRootProps()} className="box">
        <div className="icon">
          <UploadIcon />
        </div>
        <input {...getInputProps()} />
        <p>Drag & Drop your svgs here or Click in the box</p>
      </div>
    </UploaderContainer>
  );
}
export default MyDropzone;
