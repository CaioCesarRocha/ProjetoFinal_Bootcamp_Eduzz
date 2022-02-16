import styled from "styled-components";

export const WrapperContent = styled.div`  
    width: 100%;
    margin: 0 auto;
`

export const WrapperFieldset = styled.fieldset`
    margin-top: 30px;
    min-inline-size: auto;
    border: 0;
`

export const WrapperForm = styled.form`
    margin: 20px auto;
    padding: 32px;
    max-width: 600px;
    background-color: #a11326;
    border-radius: 8px; 
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 36px;
        font-weight: bold;
        color: #d1b4b4;
    }

    fieldset {
        margin-top: 30px;
        min-inline-size: auto;
        border: 0;
    }

    button {
        width: 260px;
        height: 56px;
        background: #fff;
        border-radius: 8px;
        color: #a11326; 
        font-weight: bold;
        font-size: 16px;
        border: 0;
        text-align: center;
        align-self: flex-end;
        margin-top: 20px;
        transition: background-color 0.2s;
        cursor: pointer;

        &: hover{
            background: #f79292
        }
    }
`

export const WrapperErrorForms = styled.div`
    color: #380101;
    font-size: 15px;
    font-weight: bold;
`
