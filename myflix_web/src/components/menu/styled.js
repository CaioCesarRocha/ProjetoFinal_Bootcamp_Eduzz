import styled from "styled-components";

export const WrapperHeader = styled.header`
  background-color: #a11326;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding-left: 5px;
  align-items: center;
  margin: 0 auto;
`;

export const WrapperLogo = styled.a`
    img {
        max-width: 60px;
    }
   
`;


export const WrapperOption = styled.a`
    color: #fff;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 12px;
    h1 {
        font-size: 14px;
    }
    &:hover {
        color: #f79292;
        box-shadow: #000;
    }
`

export const WrapperContentTitle = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    text-align: center;
    padding:12px;
`;


export const WrapperTitle = styled.h1`  
    font-size: 34px;
    text-align: center;
    font-weight: bold;
`;