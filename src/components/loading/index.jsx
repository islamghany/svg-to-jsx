import styled, { keyframes } from "styled-components";

const Bouncing = keyframes`
    to {
        opacity: 0.1;
        transform: translate3d(0, -16px, 0);
    }
`;
const LoadingPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: transparent;

  .modal__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  .bouncingLoader{
   
  }
  .bouncingLoader > div,
  .bouncingLoader:before,
  .bouncingLoader:after {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: ${({theme}) => theme.gradient};
    border-radius: 50%;
    animation: ${Bouncing} 0.6s infinite alternate;
  }
  .bouncingLoader > div,
  .bouncingLoader:before,
  .bouncingLoader:after {
    content: " ";
  }
  .bouncingLoader > div {
    margin: 0 10px;
  }
  .bouncingLoader > div {
    animation-delay: 0.2s;
  }
  .bouncingLoader:after {
    animation-delay: 0.4s;
  }
`;
const LoadingModal = ({ loading=true }) => {
  if (loading) {
    return (
      <LoadingPage>
        <div className="modal__container">
          <div className="bouncingLoader">
            <div></div>
          </div>
        </div>
      </LoadingPage>
    );
  } else return null;
};
export default LoadingModal;