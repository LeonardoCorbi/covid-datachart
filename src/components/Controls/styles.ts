import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;

  margin-top: 40px;

  section {
    &:first-child {
      width: 70%;
    }

    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-family: sans-serif;
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
  
    article:first-child {
      min-width: 80%;
      display: flex;
      justify-content: space-between;
      font-family: sans-serif;
    }
  
    article:nth-child(2) {
      min-width: 80%;
      display: flex;
      justify-content: space-between;
      font-family: sans-serif;
    }
  }
`;