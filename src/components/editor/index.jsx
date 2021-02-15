import {memo} from 'react'
import AceEditor from 'react-ace';
import styled from 'styled-components';

import 'brace/mode/jsx';
import 'brace/mode/xml';
import "ace-builds/src-noconflict/theme-monokai";

//import '../styles/editor';

const Container = styled.div`
    flex:1;
    display:flex;
   .ace_editor {
      width: 100% !important;
      height: 100% !important;
      line-height: 1.6;
      font-size:normal;
      background: ${({theme})=>theme.bg};
      font-family: 'MonoLisa';
      color:#fff;
      flex:1
    }
    .ace-editor{
    width: 100%;
    height: auto;
    }
  
    .ace_text-input{
      color:#fff;
    }
    .ace_scroller {
      margin: 15px 0 0;
    }
 
    .ace_gutter {
      padding: 15px 0 0;
      color: ${({theme})=>theme.mainText};
      background:${({theme})=>theme.secondary};
      font-family: 'MonoLisa';
    }
    .ace_gutter-cell {
      padding: 0 20px;
    }
    .ace_comment {
      color: ${({theme})=>theme.subText};
    }
    .ace_xml.ace_keyword {
      color: #fff;
    }
    .ace-tm .ace_gutter-active-line{
      background: transparent;
    }
`
const  Editor=(({ value, mode, isReadOnly=false, debounceChangePeriod=1000, onChange,...props })=> {
  return (
    <Container>
    <AceEditor
      mode={mode}
      value={value}
      theme="monokai"
      readOnly={isReadOnly}
      showPrintMargin={false}
      debounceChangePeriod={debounceChangePeriod}
      editorProps={{ $blockScrolling: Infinity }}
      setOptions={{ showFoldWidgets: false }}
      onChange={onChange}
      {...props}
    />
    </Container>
  );
})

export default Editor;