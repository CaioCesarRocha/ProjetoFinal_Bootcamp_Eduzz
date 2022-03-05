import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0; 
  width: 100%;
`

export const WrapperContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  flex: 1;

  @media(max-width: 800px) {
    flex-direction: column;
    margin-top: 15px;
  }
`;

export const WrapperInfoMovie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-center;
  justify-content: space-between;
  margin-left: 8px;
  padding: 15px;
 

  h1 {
    font-size: 32px;
    font-weight: bold;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  h4 {
    font-size: 16px;
    font-weight: bold;
  },
  
`;

export const WrapperTitle = styled.a`
  font-weight: bold;
  &:hover {
    color: #f25e5e;
    box-shadow: #000;
  }
`

export const WrapperMovieGeneric = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  h3 {
    margin-right: 8px;
  }
  a {
    font-size: 16px;
    color: #a11326;
    font-weight: bold;
    &:hover {
      color: #f25e5e;
      box-shadow: #000;
    }
  }
  span {
    color: #a11326;
    font-weight: bold;
  }
`;

export const WrapperImage = styled.img`
  border-radius: 10%;
  width: 230px;
  height: 220px;
  margin: 8px;

  @media(max-width: 800px) {
    justify-content: center;
    margin: 0 auto;
    width: 200px;
    height: 180px;
  }
`;

export const WrapperContainerOptions = styled.div`
  display: flex;
  margin: auto 0;
  max-width: 100%;
  justify-content: center;
  flex: 1;
`

export const WrapperOptions = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 30px;
  font-size: 23px;
  color: #a11326;
  text {
    margin-top: 15px;
  }

  @media(max-width: 800px) {
    font-size: 18px;
  }

  @media(max-width: 350px) {
    font-size: 14px;
  }
`

export const WrapperButton = styled.button`
  font-size: 80px;
  display: flex;
  flex-direction: row;
  &:hover {
    color: #f25e5e;
  }
  span{
    font-size: 30px;
  }

  @media(max-width: 800px) {
    font-size: 60px;
  }

  @media(max-width: 350px) {
    font-size: 40px;
  }
`