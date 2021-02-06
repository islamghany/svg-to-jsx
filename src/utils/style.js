import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
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
		color: ${({theme})=>theme.white};
		font-size:1.6rem;
		background: ${({theme})=>theme.bg};
		font-family: -apple-system, BlinkMacSystemFont, Avenir, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
`