import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FiArrowRightCircle } from "react-icons/fi";

import * as S from './styled';
import Menu from '../../components/menu';
import FieldInput from '../../components/input';
import Button from '../../components/button';


const schema = Yup.object().shape({
    email: Yup.string().email().required('O campo Email é obrigatório'),
    password: Yup.string().required('O campo Password é obrigatório'),
})


const Login = () =>{

    const initialValues = {email: '', password: ''};

    async function handleSubmit(data){
        
    }

    const formik  = useFormik({
        initialValues: initialValues,
    
        validationSchema: schema,
    
        enableReinitialize: true,

        onSubmit: async (data) => {       
            const response = await handleSubmit(data);

            //formik.resetForm();
            alert(`User ${data.email} logado`);
            console.log("Olha ai a resposta:",response);

            /*navigate.push({
                pathname: '/',
            })*/     
        }
    })


    return (
        <S.WrapperContent>          
            <Menu/>                    
            <S.WrapperForm onSubmit={formik.handleSubmit}>
                <h1>Login</h1>
                <S.WrapperFieldset>
                    <FieldInput
                        nomeCampo={"Email"}
                        type={"text"}
                        name={"email"}
                        placeholder={"Email"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.email && formik.touched.email &&(<S.WrapperErrorForms>{formik.errors.email}</S.WrapperErrorForms>)}

                    <FieldInput
                        nomeCampo={"Password"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Senha"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.password && formik.touched.password &&(<S.WrapperErrorForms>{formik.errors.password}</S.WrapperErrorForms>)}
                                            
                </S.WrapperFieldset>
                
                <Button
                    text={'Entrar'}                 
                />
            </S.WrapperForm>                           
        </S.WrapperContent>
    );
}


export default Login;