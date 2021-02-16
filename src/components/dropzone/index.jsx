import { useCallback, useEffect, useState, memo } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Fileimage } from "../../assets/icons/";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../editor/";

const Button = styled.button`
  background-image: linear-gradient(181.81deg, #6333ff 25%, #441ebf 75%);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: auto 200%;
  padding: 0.8rem 0.8rem;
  min-width: 8rem;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  color: #fff;
  border-radius: 0.8rem;
  margin-top: 1rem;
  outline: 0;
`;

const Divider = styled.div`
  height: 0.1rem;
  background: ${({ theme }) => theme.subText};
  margin: 1rem 0;
  border-radius: 0.002rem;
`;

const UploaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4.6rem);
  width: calc((100vw - 20rem) / 2);
  @media (max-width: 900px) {
    border-top: 1px solid ${({ theme }) => theme.border};
  }
  h5 {
    padding: 1.2rem;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.secondary};
  }
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    outline: none;
    position: relative;
    .error {
      height: 0.4rem;
      width: 100%;
      background: transparent;
      &.active {
        background: red;
      }
    }
    .ace-editor {
      width: 100%;
      height: auto !important;
      padding-bottom: 2rem !important;
    }
    .ace-content {
      width: 100%;
      height: auto !important;
    }
    .active-drag {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.8);
      border: 2px dashed ${({ theme }) => theme.mainText};
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        margin-right: 0.8rem;

        svg {
          path {
            fill: ${({ theme }) => theme.mainText};
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
    background: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.border};
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

function MyDropzone() {
  const [jsCode, setJSCode] = useState({ code: "", imports: {}, counts: 0 });
  const dispatch = useDispatch();
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
  const onSubmit = (code) => {
    dispatch({
      type: "SVG",
      payload: {
        isCode: false,
        code,
        id: parseInt(10000000 * Math.random()),
      },
    });
  };
  const {
    rejectedFiles,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    onDrop,
    accept: "image/svg+xml",
    noClick: true,
    noKeyboard: true,
  });
  useEffect(() => {
    if (svgCode.length && svgCode.length === acceptedFiles.length) {
      if (svgCode.length > 1) {
        dispatch({
          type: "LOADING",
          payload: true,
        });
      }
      onSubmit(svgCode);
    }
  }, [svgCode?.length]);
  return (
    <UploaderContainer>
      <h5>SVGs Input</h5>
      <div className="container" {...getRootProps()}>
        {isDragActive && (
          <div className="active-drag">
            <div className="icon">
              <Fileimage />
            </div>
            <h3>Drag Your SVGs here</h3>
          </div>
        )}
        {rejectedFiles && <p>error there are error in upload files</p>}
        <div className="box">
          <div className="icon">
            <UploadIcon />
          </div>
          <input {...getInputProps()} />
          <p>Drag & Drop your svgs here</p>
          <Divider />
          <p>or</p>
          <Button onClick={open}>Upload SVGs</Button>
        </div>
        <CodeEditor />
      </div>
    </UploaderContainer>
  );
}

const Error = memo(() => {
  const error = useSelector((state) => state.error);
  return <div className={`error ${error ? "active" : ""}`}></div>;
});

const CodeEditor = memo(() => {
  const dispatch = useDispatch();
  const onChange = (svg) => {
    dispatch({
      type: "SVG",
      payload: {
        isCode: true,
        code: [{ svg, name: "SvgComponent" }],
        id: parseInt(10000000 * Math.random()),
      },
    });
  };
  return (
    <>
      <Error />
      <Editor
        value=""
        mode="xml"
        placeholder="Or paste svg code here"
        onChange={onChange}
      />
    </>
  );
});
export default MyDropzone;