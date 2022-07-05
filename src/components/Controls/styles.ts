import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 40px;

  section {
    &:first-child {
      width: 50%;

      @media(max-width: 845px){
        width: 90%;
      }

      article:first-child {
        min-width: 80%;
        display: flex;
        justify-content: space-between;
        font-family: sans-serif;
      }

      article:nth-child(2) {
        ul {
          min-width: 80%;
          display: flex;
          justify-content: space-between;
          font-family: sans-serif;
          list-style: none;
          padding: 0;
        }
      }
    }

    &:nth-child(2) {
      display: flex;
      gap: 16px;
      font-family: sans-serif;

      article {
        display: flex;
        flex-direction: column;
        gap: 8px;

        @media(max-width: 460px){
          label {
            font-size: 14px;
          }
        }
      }
    }  

    input[type="range"] {
      min-width: 80%;
      position: relative;
    }
    
    [class*=PrivateValueLabel-circle] {
      transform: translateX(-24px);
      width: max-content;
      padding: 0 8px;
      border-radius: 4px;
    }
  
    [class*=PrivateValueLabel-label] {
      transform: rotate(0deg)
    }
  
    
  }
`;

export const Button = styled.button`
  background-color: #364BA8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 8px;
  height: 32px;
  cursor: pointer;
`;