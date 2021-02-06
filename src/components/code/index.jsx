import { useContext } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import {CodeContext} from '../../context';


//const CodeContainer 

const CodeContainer = styled.div`
	padding:2rem;
	margin:4rem;
	
`
const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: auto;
  max-height:90vh;
`;
 
const Line = styled.div`
  display: table-row;
`;
 
const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;
 
const LineContent = styled.span`
  display: table-cell;
`;
const Code = ()=>{
	const {jsCode} = useContext(CodeContext);
	if(!jsCode || !jsCode?.length) return null;
	return <CodeContainer><Highlight {...defaultProps} theme={nightOwl} code={jsCode} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
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
}
export default Code;