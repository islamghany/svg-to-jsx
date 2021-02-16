import { useEffect, useState, memo } from "react";
import styled, { keyframes } from "styled-components";
import copy from "copy-to-clipboard";
import { Clipboard } from "../../assets/icons/";
import { useSelector, useDispatch } from "react-redux";
import Editor from "../editor/";
import { optimize, toJSX, format, handleCode } from "../../utils/svg";
const Icon = styled.div`
  cursor: pointer;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    path {
      fill: ${({ theme }) => theme.mainText};
      transition: fill 0.3s ease;
    }
  }
  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.primary};
      }
    }
  }
`;
const CodeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4.6rem);
  border-left: 1px solid ${({ theme }) => theme.border};
  position: relative;
  width: calc((100vw - 20rem) / 2);
  .head {
    padding: 0.8rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.secondary};
    @media (max-width: 900px) {
      border-top: 1px solid ${({ theme }) => theme.border};
    }
    h5 {
      text-align: center;
      background: ${({ theme }) => theme.secondary};
    }
  }
`;

const lds = keyframes`
   0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const ContainerLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  .lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: ${lds} 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

const Loading = memo(() => {
  const loading = useSelector((state) => state.loading);
  if (loading) {
    return (
      <ContainerLoading>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </ContainerLoading>
    );
  } else {
    return null;
  }
});
const Copy = ({ code }) => {
  const [copied, setCopied] = useState(false);
  return copied ? (
    <Icon>
      <span>Copied..</span>
    </Icon>
  ) : (
    <Icon
      title="copy to clipboard"
      onClick={() => {
        copy(code, { message: "Click to copy to clipboard" });
        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      <Clipboard width="24px" height="24px" />
    </Icon>
  );
};
const getImportsName = (imports) => {
  return Object.keys(imports).join(" ,");
};

const Output = memo(() => {
  const code = useSelector((state) => state.jsx);
  return (
    <>
      <div className="head">
        <h5>JSX Output</h5>
        <Copy code={code} />
      </div>
      <Editor mode="jsx" isReadOnly value={code} />
    </>
  );
});

const Code = () => {
  const svg = useSelector((state) => state.svg);
  const icon = useSelector((state) => state.icon);
  const rn = useSelector((state) => state.rn);
  const append = useSelector((state) => state.append);
  const [jsCode, setJSCode] = useState({ code: "", imports: {}, counts: 0 });
  const dispatch = useDispatch();
  const handleSvgFiles = async () => {
    setJSCode({ code: "", imports: {}, count: 0 });
    svg.code.map(async (c, idx) => {
      const svgoCode = await optimize(c.svg);
      if (svgoCode === false) {
        if (!svg.isCode || c.svg.length > 0) {
          dispatch({
            type: "ERROR",
            payload: true,
          });
        } else {
          dispatch({
            type: "ERROR",
            payload: false,
          });
        }
        dispatch({
          type: "LOADING",
          payload: false,
        });
        dispatch({
        type: "JSX",
        payload: '',
      });
        return;
      }
      const transformedCode = await toJSX(
        svgoCode,
        c.name,
        append?.length ? append : null,
        rn,
        icon
      );
      if (transformedCode === false) {
        if (!svg.isCode || c.svg.length > 0) {
          dispatch({
            type: "ERROR",
            payload: true,
          });
        } else {
          dispatch({
            type: "ERROR",
            payload: false,
          });
        }
        dispatch({
          type: "LOADING",
          payload: false,
        });
        dispatch({
        type: "JSX",
        payload: '',
      });
        return;
      }
      const formattedCode = format(transformedCode);
      setJSCode((e) => ({
        code: e.code + handleCode(formattedCode),
        imports: ((impo, rn) => {
          if (rn) {
            let imp = { ...impo };
            const i = formattedCode.indexOf("Svg,");
            if (i !== -1) {
              const exp = formattedCode
                .slice(i + 6, formattedCode.indexOf("}"))
                .split(",");
              for (let o of exp) {
                if (o?.length && !(o.trim() in imp)) {
                  imp[o.trim()] = 1;
                }
              }
            }
            return { ...imp };
          }
          return {};
        })(e.imports, rn),
        count: idx + 1,
      }));
    });
  };
  useEffect(() => {
    if (svg.code.length && svg.id !== -1) {
      handleSvgFiles();
    }
  }, [svg.id, icon, rn, append]);
  useEffect(() => {
    if (jsCode?.count > 0 && jsCode.count === svg?.code?.length) {
      if (jsCode?.count > 1) {
        dispatch({
          type: "LOADING",
          payload: false,
        });
      }
      dispatch({
        type: "ERROR",
        payload: false,
      });
      let c = rn
        ? "import Svg" +
          (Object.entries(jsCode.imports).length === 0
            ? ' from "react-native-svg"\n\n '
            : ",{ " +
              getImportsName(jsCode.imports) +
              ' } from "react-native-svg" \n\n') +
          jsCode.code
        : jsCode.code;
      dispatch({
        type: "JSX",
        payload: c,
      });
    }
  }, [jsCode.count]);
  return (
    <CodeContainer>
      <Loading />
      <Output />
    </CodeContainer>
  );
};
export default Code;

/**

const Container = styled.div`
      flex: 1;
      height: 100%;
      position: relative;
      .head {
        height: 4rem;
        padding: 0 2rem 0 6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        background: ${({ theme }) => theme.secondary};
        @media (max-width: 900px) {
          border-top: 1px solid ${({ theme }) => theme.border};
        }
        h5 {
          text-align: center;
          background: ${({ theme }) => theme.secondary};
        }
      }
      .error {
        height: 0.4rem;
        width: 100%;
        background: transparent;
        &.active {
          background: red;
        }
      }
    `;
    const Error = () => {
      const error = useSelector(state=>state.error);
      console.log(error)
      return <div className={`error ${error ? "active" : ""}`}></div>;
    };
    
    const JsxCode = () => {
      return (
        <Container>
          <Loading />
          <div className="head">
            <h5>JSX Output</h5>
            <Copy code={"code"} />
          </div>
          <Editor value="" mode="jsx" onClick={() => {}} isReadOnly />
        </Container>
      );
    };
    const SvgCode = () => {
      const dispatch = useDispatch();
      const onChange = async (svg) => {
        const v = svg.split("</svg>");
        let code = [];
        dispatch({
                  type:'LOADING',
                  payload:true
                });
        for (let d of v) {
          if (d.length && d.trim()) {
            try {
              const c = await optimize(d + "</svg>");
              if (c === false){
                dispatch({
                  type:'ERROR',
                  payload:true
                });
                dispatch({
                  type:'LOADING',
                  payload:false
                });
                return;
              }
              code.push(c);
            } catch (err) {
              console.log(err);
            }
          }
        }
        dispatch({
                  type:'ERROR',
                  payload:false
                })
        console.log(code);
       let jsCode='',idx=1;
       for(let svgo of code){
        
           const c = await toJSX(svgo,"Svg"+(idx++));
           if(c===false){
              dispatch({
                  type:'ERROR',
                  payload:true
                });
                dispatch({
                  type:'LOADING',
                  payload:false
                });
           }
           jsCode+=c;
         
       }
        dispatch({
                  type:'LOADING',
                  payload:false
                })
        dispatch({
                  type:'ERROR',
                  payload:false
                })
        
      };
      return (
        <Container>
          <div className="head">
            <h5>SVGs Input</h5>
          </div>
          <Error />
          <Editor value="" mode="xml" onChange={onChange} />
        </Container>
      );
    };
    export const Code = ({}) => {
      return (
        <>
          <SvgCode />
          <JsxCode />
        </>
      );
    };*/