import React from 'react';
import * as S from './styled';


const FieldInput = ({nomeCampo, type, name, value, onChange, placeholder }) =>{
    return (
        <S.WrapperField>
            <label htmlFor={name}>{nomeCampo}</label>
            <S.WrapperInput type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}/>
        </S.WrapperField>
    );
}

export default FieldInput;