import {ThemeProvider} from 'styled-components'
import GlobalStyle from './utils/style'
import Dropzone from './components/dropzone'
import Code from './components/code'
import AddEnd from './components/addEnd/';

import CodeProvider from './context/'
const theme = {
  bg:'#343837',
  primary:'#0F9B8E',
  secondary:'#03719C',
  white:'#fff'
}

function App() {
  return (
    <CodeProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AddEnd />
      <Dropzone />
      <Code />
    </ThemeProvider>
    </CodeProvider>
  );
}

export default App;
