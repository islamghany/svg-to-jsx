import { useCallback, useEffect, useState,useContext } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import svgo from "../../utils/svgo";
import prettier from "prettier";
import svgr from "@svgr/core";
import {CodeContext} from '../../context'
import {Fileimage} from '../../assets/icons/'
import Loading from '../loading/'
const handleSVGName=(e='')=>{
  let name = e.replace(/#|_| |-/g, '');
  let nums='';
    for(let ch of name){
      if(!isNaN(ch) &&!isNaN(parseInt(ch))) nums+=ch;
      else break;
    } 
    if(nums.length){
     name=name.slice(nums.length);
   }
    return nums?.length ? name+nums : name;
}
const Button = styled.button`
    background-image: linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 200%;
    padding:.8rem .8rem;
    min-width:8rem;
    border:none;
    cursor: pointer;
    font-size:1.6rem;
    color:#fff;
    border-radius:.8rem;
    margin-top:1rem;
    outline:0;

`

const Divider = styled.div`
    height:.1rem;
    background:${({theme})=>theme.subText};
    margin:1rem 0 ;
    border-radius:.002rem;
`

const UploaderContainer = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  height:calc( 100vh - 6.6rem);
  h5{
    padding:1.2rem;
    text-align:center;
    border-bottom:1px solid ${({theme})=>theme.subText};
    background: ${({theme})=>theme.secondary};
  }
  .container{
    flex:1;
    display:flex;
    align-items: center;
    justify-content: center;
    outline:none;
    position: relative;
    .active-drag{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index: 4;
    background: rgba(0,0,0,.8);
    border:2px dashed ${({ theme }) => theme.mainText};
    display:flex;
    align-items: center;
    justify-content: center;
    .icon{
          margin-right:.8rem;

      svg{
        path{
          fill:${({ theme }) => theme.mainText};
        }
      }
    }
    }
  }
  .box {
    padding: 2rem 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background :${({ theme }) => theme.secondary};
    border-radius: 1rem;
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
  const {setJSCode,endName} = useContext(CodeContext);
  const [svgCode, setSVGCode] = useState([]);
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
  const waitUntil = async (code)=>{
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
        { componentName: endName?.length ? handleSVGName(c.name.split(".")[0])+endName : handleSVGName(c.name.split(".")[0])  }
      );
      //icon +=handleCode(transformedCode);
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
  }
  const onSubmit = async (code) => {
     setJSCode('')
    await waitUntil(code);
    
  };
  const {
    rejectedFiles,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    open
  } = useDropzone({
    onDrop,
    accept: "image/svg+xml",
    noClick:true,
    noKeyboard: true
  });
  useEffect(() => {
    if (svgCode.length && svgCode.length === acceptedFiles.length) {
      onSubmit(svgCode);
    }
  }, [svgCode,endName]);
  return (
    <UploaderContainer>
      <h5>SVGs Input</h5>
      <div className="container" {...getRootProps()}>
      {isDragActive  && <div className="active-drag">
        <div className="icon">
          <Fileimage />
        </div>
        <h3>Drag Your SVGs here</h3>
      </div>}  
      {rejectedFiles && <p>error there are error in upload files</p>}
      <div  className="box">
        <div className="icon">
          <UploadIcon />
        </div>
        <input {...getInputProps()} />
        <p>Drag & Drop your svgs here</p>
        <Divider />
        <p>or</p>
        <Button onClick={open}>
          Upload SVGs
        </Button>
      </div>
      </div>
    </UploaderContainer>
  );
}
export default MyDropzone;
