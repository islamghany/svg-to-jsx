import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import { CodeContext } from "../../context";
import copy from "copy-to-clipboard";
import { Clipboard } from "../../assets/icons/";

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
  .head {
    padding: 0.8rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.secondary};
  }
  h5 {
    text-align: center;
    background: ${({ theme }) => theme.secondary};
  }
`;
const Pre = styled.pre`
  text-align: left;
  position: relative;
  padding: 0.5em 0.5em 0.5em 0;
  overflow: auto;
  flex: 1;
  width: calc((100vw - 20rem) / 2);
  background: ${({ theme }) => theme.bg} !important;
  .noLine {
    position: absolute;
    top: 0;
    left: 0;
    width: 4.4rem;
    bottom: 0;
    height: 100%;
    background: ${({ theme }) => theme.secondary} !important;
    z-index: 33;
  }
  &::selection {
    background: ${({ theme }) => theme.primary};
  }
`;
const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  position: absolute;
  z-index: 43;
  display: table-cell;
  text-align: right;
  padding-right: 1rem;
  width: 4.4rem;
  user-select: none;
  color: ${({ theme }) => theme.mainText};
  background: ${({ theme }) => theme.secondary};
  font-size: 1.2rem;
`;

const LineContent = styled.span`
  display: table-cell;
  padding-left: 4.4rem;
`;

const Copy = ({ code }) => {
  const [copied, setCopied] = useState(false);
  return copied ? (
    <Icon>
      <span>Copied..</span>
    </Icon>
  ) : (
    <Icon
      title="copy clipboard"
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
const Code = () => {
  const { jsCode } = useContext(CodeContext);
  console.log(jsCode.loading)
  const code = jsCode?.code ? jsCode?.imports?.Path ? 'import Svg, { '+getImportsName(jsCode.imports)+' } from "react-native-svg" \n\n' +jsCode.code   : jsCode.code  : "";
  return (
    <CodeContainer>
      <div className="head">
        <h5>JSX Output</h5>
        <Copy code={code} />
      </div>
      <Highlight
        {...defaultProps}
        theme={nightOwl}
        code={code}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            <div className="noLine"></div>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        )}
      </Highlight>
    </CodeContainer>
  );
};
export default Code;