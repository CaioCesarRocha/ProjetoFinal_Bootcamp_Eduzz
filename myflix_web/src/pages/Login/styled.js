import styled from "styled-components";

export const WrapperContent = styled.div`  
    width: 100%;
    margin: 0 auto;
`

export const WrapperContentDivider = styled.div`  
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;


    img {
        width: 800px;
        height: 575px;
        no-repeat bottom;
      
        @media(max-width: 1040px) {
            float: left;
            width: 50%;
            height: 480px;
        }

        @media(max-width: 600px) {
            width: 325px;
            height: 470px;
        }
    }
    @media(max-width: 1000px) {
        justify-content: left;
    }

    @media(max-width: 550px) {
        flex-direction: column;
        img{
            width: 550px;
            height: 275px;
        }
    }
    @media(max-width: 400px) {
        flex-direction: column;
        img{
            width: 100%;
            height: 225px;
        }
    }
`

export const WrapperFieldset = styled.fieldset`
    margin-top: 30px;
    min-inline-size: auto;
    border: 0;
`

export const WrapperForm = styled.form`
    margin: 20px auto;
    padding: 32px;
   
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

    @media(max-width: 800px) {
        margin-top: 20px;
        
        padding: 15px;

        h1{
            font-size: 28px;
        } 
        fieldset {
            margin-top: 15px;
        }    
        button {
            width: 180px;
            height: 38px;
        }      
    }

    @media(max-width: 600px) {
        h1{
            font-size: 20px;
        } 
        fieldset {
            margin-top: 10px;
        }    
        button {
            width: 150px;
            height: 30px;
        }      
    }

    
`

export const WrapperErrorForms = styled.div`
    color: #380101;
    font-size: 15px;
    font-weight: bold;
`

export const WrapperRegister = styled.div`
    color: #380101;
    font-size: 12px;
    a {
        font-weight: bold;
        &: hover{
            color: #fff;
        }
    }
`
