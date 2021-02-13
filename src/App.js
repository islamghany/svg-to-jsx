import styled,{ThemeProvider} from 'styled-components'
import GlobalStyle from './utils/style'
import Dropzone from './components/dropzone'
import Code from './components/code'

import CodeProvider from './context/'
import Header from './components/header/'
import Options from './components/options/'

/*
  background-image: linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 200%;
*/
const theme = {
  bg:'#0E0E12',
  primary:'#6333ff',
  secondary:'#16161E',
  mainText:'#eef5f8',
  subText:'#788ca0',
  gradient:'linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%)',
  gradient2:'linear-gradient(90deg,#f4bd82,#fe9e9a 30%,#e47ac8)',
  white:'#fff'
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100vh;
  .main{
    flex:1;
    display:flex;
    height:100%;
  }
`
function App() {
  return (
    <CodeProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
      <Header />
      <div className="main">
      <Options />
      <Dropzone />
      <Code />
      </div>
      </Container>
    </ThemeProvider>
    </CodeProvider>
  );
}

export default App;
