import styled from 'styled-components';

const HeaderContainer = styled.div`
	background-image: linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%);
    padding:1rem 2rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    h1{
    	font-size:2.2rem;
    	color:${({theme})=>theme.mainText}
    }
    div{
        a{
            text-decoration:none;
            
        }
    	span{
    		font-size:1.6rem;
    		text-transform: capitalize;
    		color:${({theme})=>theme.mainText};
    		&.github{
    			color:${({theme})=>theme.white};
    			font-weight:500;
    		}
    	}
    }
`
const Header = ()=>{
	return <HeaderContainer>
		<h1>SVGs to JSX</h1>
		<div>
			<a href="https://github.com/islamghany/svg-to-jsx" target="_blank"><span>show on</span>
			<span className="github"> Github</span>
            </a>
		</div>
	</HeaderContainer>
}
export default Header;