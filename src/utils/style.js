import {createGlobalStyle} from 'styled-components';
import Avenir from '../assets/fonts/AvenirLTStd-Roman.woff2'
import MonoLisa from '../assets/fonts/MonoLisa.woff2'

export default createGlobalStyle`
	 @font-face {
	     font-family: 'Avenir';
	     src: url(${Avenir}) format('woff2');
         font-style: normal;
	  }
	  @font-face {
	     font-family: 'MonoLisa';
	     src: url(${MonoLisa}) format('woff2');
         font-style: normal;
	  }
    *,
    *::before,
    *::after{
    	padding:0;
    	margin:0;
    	box-sizing: border-box;
    }
	html{
		font-size:62.5%;
	}
	body{
		color: ${({theme})=>theme.mainText};
		font-size:1.6rem;
		background: ${({theme})=>theme.bg};
		font-family: -apple-system, BlinkMacSystemFont, Avenir, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
`