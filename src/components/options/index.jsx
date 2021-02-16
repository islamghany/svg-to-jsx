import styled from "styled-components";
import { useRef } from "react";
import Toggle from "../toggle/";
import { useDispatch } from "react-redux";
const OptionsContainer = styled.div`
    background: ${({ theme }) => theme.secondary};
    overflow: auto;
    width: 20rem;
    border-right: 1px solid ${({ theme }) => theme.border};
    @media (max-width: 900px) {
        max-width:100vw;
        width:100%;
    }
    p {
        margin: 1rem 0;
    }
    .append {
        padding: 0 2rem 2rem;
    }
    .row {
        padding: 1rem 2rem 0;
    }
`;
const Input = styled.input`
    width: 100%;
    background: transparent;
    border-radius: 3rem;
    border: 2px solid ${({ theme }) => theme.primary};
    padding: 0.8rem 1rem;
    font-size: 1.6rem;
    font-weight: 300;
    outline: none;
    color: ${({ theme }) => theme.mainText};
    transition: border-color 0.2s ease;
    &::placeholder {
        color: ${({ theme }) => theme.subText};
    }
    &:focus {
        border-color: ${({ theme }) => theme.mainText};
    }
`;
const Button = styled.button`
    background-image: linear-gradient(181.81deg, #6333ff 25%, #441ebf 75%);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 200%;
    padding: 0.8rem 0.8rem;
    min-width: 8rem;
    border: none;
    cursor: pointer;
    font-size: 1.6rem;
    color: #fff;
    border-radius: 0.8rem;
    margin-top: 1rem;
`;

const Divider = styled.div`
    height: 0.1rem;
    background: ${({ theme }) => theme.border};
    margin: 1.4rem 0;
    border-radius: 0.002rem;
`;
const AppendForm = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef?.current?.value)
            dispatch({ type: "APPEND", payload: inputRef?.current?.value });
    };
    return (
        <div className="append">
            <p>Append a name</p>
            <form onSubmit={handleSubmit}>
                <Input
                    maxLength={10}
                    ref={inputRef}
                    placeholder="Ex: Bold"
                    type="text"
                />
                <Button>Add</Button>
            </form>
        </div>
    );
};

const ReactNativeOption = () => {
    const dispatch = useDispatch();
    return (
        <div className="row">
            <Toggle
                name="rn"
                onChange={(e) =>
                    dispatch({ type: "RN", payload: e.target.checked })
                }
            >
                React Native
            </Toggle>
        </div>
    );
};
const IconOption = () => {
    const dispatch = useDispatch();

    return (
        <div className="row">
            <Toggle
                name="icon"
                onChange={(e) =>
                    dispatch({ type: "ICON", payload: e.target.checked })
                }
            >
                Icon
            </Toggle>
        </div>
    );
};
// const FillColor = ()=>{
//     const {setEndName} = useContext(CodeContext);
//     const inputRef = useRef(null);
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         if(inputRef?.current?.value) setEndName(inputRef?.current?.value)
//     }
//     return <div className="append">
//         <p>
//             Add fill color
//         </p>
//         <form onSubmit={handleSubmit}>
//             <Input maxLength={10} ref={inputRef} placeholder="Ex: #1a1a1a" type="text" />
//             <Button>
//               Add
//             </Button>
//         </form>
//
//     </div>
// }
const Options = () => {
    return (
        <OptionsContainer>
            <ReactNativeOption />
            <IconOption />
            <Divider />
            <AppendForm />
            {/* <FillColor/> */}
        </OptionsContainer>
    );
};
export default Options;
