import styled from "styled-components";

export const WrapperContent = styled.div`  
    width: 100%;
    margin: 0 auto;
`

export const WrapperForm = styled.form`
    margin: 20px auto;
    padding: 32px;
    max-width: 730px;
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

export const WraperrLabel = styled.label`
    margin-top: 16px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #d1b4b4;
`


export const WrapperFieldGroup = styled.div`
    display: flex;  
    justify-content: space-between;
    flex: 1;
    max-width: 60%;
    margin: auto 0;
    font-weight: bold;
    color: #d1b4b4;
      
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none; 
        background: #F0F0F5;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #6C6C80;
    }
`

