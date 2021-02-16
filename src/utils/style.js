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
		@media (max-width:  56.25em){
			font-size: 50%;
		}
		@media (max-width: : 75em){
			 font-size: 56.25%;
		}
		@media (min-width:112.5em){
			font-size:75%;	
		}
	}
	body{
		color: ${({theme})=>theme.mainText};
		font-size:1.6rem;
		background: ${({theme})=>theme.bg};
		font-family: -apple-system, BlinkMacSystemFont, Avenir, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
`