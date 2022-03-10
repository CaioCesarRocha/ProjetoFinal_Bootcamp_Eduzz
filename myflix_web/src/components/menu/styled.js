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
  h3 {
      color: white;
      font-weight: bold;
  }
`;

export const WrapperLogo = styled.a`
    img {
        max-width: 100%;
        width: 95px;
    } 

    @media(max-width: 800px) {
        width: 75px;
    }

    @media(max-width: 350px) {
        width: 55px;
    }
`;


export const WrapperOption = styled.a`
    color: #fff;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    padding: 5px;
    h1 {
        font-size: 14px;
    }
    &:hover {
        color: #f79292;
        box-shadow: #000;
    }

    
    @media(max-width: 800px) {
        font-size: 24px;
        h1 {
            font-size: 12px;
        }
    } 
    
    @media(max-width: 350px) {
        font-size: 18px;
        h1 {
            font-size: 8px;
        }
    } 
`

export const WrapperContentTitle = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
    padding:12px;
    
`;


export const WrapperTitle = styled.h1`  
    font-size: 34px;
    text-align: center;
    font-weight: bold;

    @media(max-width: 800px) {
        font-size: 25px;
    }
    
    @media(max-width: 350px) {
        font-size: 17px;
    } 
`;


export const WrapperContentUsername = styled.div`
    display: flex;
    max-width: 17%;
    justify-content: right;
    text-align: center;
    padding: 8px;

    @media(max-width: 800px) {
        padding: 0px;
        h3 {
            font-size: 12px;          
        }       
    } 

    @media(max-width: 350px) {
        padding: 0px;
        h3 {
            font-size: 8px;          
        }       
    } 
`;


