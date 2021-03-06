import styled from "styled-components";

const Unit = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  .toggle{
    display:flex;
    align-items:center;
    &__content{
      flex:1;
      font-size:1.5rem;
      font-weight:400;
      padding-right:1rem;
      color:${({theme})=>theme.mainText};
    }
    &__container{
      input{
        display:none;
         &:checked ~ label{
        background: ${({ theme }) =>  theme.primary};
        &::after{
          background-color: white;
          transform: translateX(1.9rem);
        }
      } 
      }
      label{
      background:${({theme})=>theme.subText};
      width:4.5rem;
      height:2.6rem;
      display:flex;
      align-items:center;
      border-radius:5.2rem;
      transition:all .3s ease-in-out;
      cursor:pointer;
  
      &::after{
        content: "";
        padding-top: 3px;
        width: 20px;
        height: 20px;
        position: relative;
       
        left: 3px;
        background-color: white;
        display: block;
        border-radius: 50%;
        transition: all 0.15s ease 0s;
        opacity: 1;
      }
      }
    }
  }
`;


 const Toggle = ({children,color,name,...props})=>{
  return <Unit color={color}>
    <div className="toggle">
      <div className="toggle__content">
        {children}
      </div>
      <div className="toggle__container">
        <input type="checkbox" className="form__toggle" id={name} {...props} />
          <label htmlFor={name} className="toggle__label ios">
      </label>
      </div>
    </div>
  </Unit>
}
export default Toggle;