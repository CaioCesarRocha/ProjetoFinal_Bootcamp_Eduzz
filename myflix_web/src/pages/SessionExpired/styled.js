import styled from "styled-components";

export const WrapperPage = styled.div`  
    width: 100%;
    margin: 0 auto;
    text-align: center;
    
   
`

export const WrapperContent = styled.div`
    
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    img {
        width: 420px;
        height: 450px;
        no-repeat bottom;

        @media(max-width: 600px) {
            width: 250px;
            height: 300px;
            font-size: 25px;
        }

        @media(max-width: 400px) {
            width: 170px;
            height: 200px;
            font-size: 25px;
        }
    }

   
`


export const WrapperInfo = styled.div`

    h1 {
        font-size: 40px;
        color: #a11326;
        font-weight: bold;

        @media(max-width: 600px) {
            font-size: 30px;
        }

        @media(max-width: 400px) {
            font-size: 20px;
        }
    }

    button {
        margin-top: 20px;
        width: 140px;
        height: 45px;
        font-size: 20px;
        border-radius: 6px;
        
        background-color: #a11326;
        color: #fff;

        &:hover {
            background-color: #b04545;
        }

        @media(max-width: 600px) {
            width: 110px;
            font-size: 16px;
            height: 38px;
        }

        @media(max-width: 400px) {
            width:80px;
            font-size: 13px;
            height: 30px;
        }
    }
`