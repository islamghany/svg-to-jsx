import styled from 'styled-components';
import {useRef,useContext} from 'react';
import {CodeContext} from '../../context'

const FormContainer = styled.div`
	padding:2rem;
	max-width:50rem;
	width:100%;
	margin:2rem auto;
	background:#fff;
	border-radius:1rem;

`
const Input = styled.input`
	width:100%;
	background:${({theme})=>theme.white};
	border:2px solid #666;
	border-radius:.5rem;
	padding:1.2rem .8rem;
	font-size:1.6rem;
	font-weight:300;
	margin:.8rem 0;
`
const Button = styled.button`
	padding:1.2rem .8rem;
	background:${({theme})=>theme.primary};
	min-width:8rem;
	border:none;
	cursor: pointer;
	font-size:1.6rem;
	color:#fff;
	border-radius:.8rem;

`
const AddEnd = ()=>{
	const {setEndName} = useContext(CodeContext);
	const inputRef = useRef(null);
	const handleSubmit=(e)=>{
		e.preventDefault();
		if(inputRef?.current?.value) setEndName(inputRef?.current?.value)
	}
	return <FormContainer>
		<form onSubmit={handleSubmit}>
			<Input ref={inputRef} placeholder="Add a end name" type="text" />
			<Button>
			  Add
			</Button>	
		</form>
	</FormContainer>
}

export default AddEnd;