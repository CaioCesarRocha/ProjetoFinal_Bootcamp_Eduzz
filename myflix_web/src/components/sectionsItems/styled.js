import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 8px;
  border-radius: 6px;
  border: 2px solid #ccc;
  border-color: #a11326;
  background-color: #a11326;
  margin: 16px 16px;
  width: 320px;
  height: 150px;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export const WrapperImage = styled.img`
  width: 110px;
  border-radius: 20px;
`

export const WrapperContentInfos = styled.div`
  padding: 8px;
  text-align: center;
  flex: 1;
  justify-content: center;
  color: #fff;
  button {
    font-size: 28px;
    &:hover {
      color: #f25e5e;
    }
  }
`

export const WrapperTitle = styled.a`
  font-size: 18px;
  font-weight: bold;
  align-items: center;
  &:hover {
    color: #f25e5e;
  }
`;

export const WrapperDuration = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin: 8px 0;
`;

export const WrapperLink = styled.a`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
`;

export const WrapperIcons = styled.div`
  display: flex;
  width: 60%;
  flex: 1;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
`

