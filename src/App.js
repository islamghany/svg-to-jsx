import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./utils/style";
import Dropzone from "./components/dropzone";
import Code from "./components/code";

import Header from "./components/header/";
import Options from "./components/options/";

import { Provider } from "react-redux";
import store from "./store/";
import Editor from './components/editor/'
/*
  background-image: linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 200%;
*/
const theme = {
  bg: "#222529",
  primary: "#6333ff",
  secondary: "#272A2E",
  mainText: "#eef5f8",
  subText: "rgba(255,255,255,.5)",
  border: "rgb(255 255 255 / 23%)",
  gradient: "linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%)",
  gradient2: "linear-gradient(90deg,#f4bd82,#fe9e9a 30%,#e47ac8)",
  white: "#fff",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .main {
    flex: 1;
    display: flex;
    height: 100%;
    @media (max-width: 900px) {
        flex-wrap:wrap;
    }
  }
`;
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;