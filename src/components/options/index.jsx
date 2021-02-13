import styled from 'styled-components';
import {useRef,useContext} from 'react';
import {CodeContext} from '../../context'

const OptionsContainer = styled.div`
	background: ${({theme})=>theme.secondary};
    overflow:auto;
    width:20rem;
      border-right:1px solid ${({theme})=>theme.subText};

    h5{
        margin:1rem 0;
    }
    .append{
        padding: 0 2rem;
    }
`
const Input = styled.input`
    width:100%;
    background:transparent;
    border-radius:3rem;
    border:2px solid ${({theme})=>theme.primary};
    padding:.8rem 1rem;
    font-size:1.6rem;
    font-weight:300;
    outline:none;
    color:${({theme})=>theme.mainText};
    transition:border-color .2s ease;
    &::placeholder{
        color:${({theme})=>theme.subText}
    }
    &:focus{
        border-color:${({theme})=>theme.mainText}
    }
`
const Button = styled.button`
    background-image: linear-gradient(181.81deg,#6333ff 25%,#441ebf 75%);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 200%;
    padding:.8rem .8rem;
    min-width:8rem;
    border:none;
    cursor: pointer;
    font-size:1.6rem;
    color:#fff;
    border-radius:.8rem;
    margin-top:1rem;

`

const Divider = styled.div`
    height:.1rem;
    background:${({theme})=>theme.subText};
    margin:1rem 0 ;
    border-radius:.002rem;
`
const AppendForm = ()=>{
    const {setEndName} = useContext(CodeContext);
    const inputRef = useRef(null);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(inputRef?.current?.value) setEndName(inputRef?.current?.value)
    }
    return <div className="append">
        <h5>
            Append a name in the end of the original name
        </h5>
        <form onSubmit={handleSubmit}>
            <Input maxLength={10} ref={inputRef} placeholder="Ex: Bold" type="text" />
            <Button>
              Add
            </Button>   
        </form>

    </div>
}
// const FillColor = ()=>{
//     const {setEndName} = useContext(CodeContext);
//     const inputRef = useRef(null);
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         if(inputRef?.current?.value) setEndName(inputRef?.current?.value)
//     }
//     return <div className="append">
//         <h5>
//             Add fill color
//         </h5>
//         <form onSubmit={handleSubmit}>
//             <Input maxLength={10} ref={inputRef} placeholder="Ex: #1a1a1a" type="text" />
//             <Button>
//               Add
//             </Button>   
//         </form>
// 
//     </div>
// }
const Options = ()=>{
	return <OptionsContainer>
		<AppendForm/>
        <Divider />
        {/* <FillColor/> */}
	</OptionsContainer>
}
export default Options;