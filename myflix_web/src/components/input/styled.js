import styled from "styled-components";


export const WrapperField= styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #d1b4b4;

    @media(max-width: 800px) {
        margin-top: 12px;
    }

    @media(max-width: 600px) {
        margin-top: 8px;
    }
`;

export const WrapperInput = styled.input`
    flex: 1;
    background: #F0F0F5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #080000;

    @media(max-width: 800px) {
        padding: 12px 20px;
    }

    @media(max-width: 600px) {
        padding: 6px 14px;
    }
`