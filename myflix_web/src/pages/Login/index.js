import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate} from 'react-router-dom';
//import { FiArrowRightCircle } from "react-icons/fi";

import api from '../../services/api';
import * as S from './styled';
import Menu from '../../components/menu';
import FieldInput from '../../components/input';
import Button from '../../components/button';


const schema = Yup.object().shape({
    email: Yup.string().email().required('O campo Email é obrigatório'),
    password: Yup.string().required('O campo Password é obrigatório'),
})


const Login = () =>{
    const [ wrongPass, setWrongPass] = useState(false);

    const initialValues = {email: '', password: ''};

    const navigate =  useNavigate();


    async function handleSubmit(data){
        const dataUsers = [];
        dataUsers.push({
            email: data.email,
            password: data.password
        })

        const dataUser = dataUsers[0];
        const response = await api.post('token', dataUser);

        return response
    }

    const formik  = useFormik({
        initialValues: initialValues,
    
        validationSchema: schema,
    
        enableReinitialize: true,

        onSubmit: async (data) => {       
            const response = await handleSubmit(data);

            try{
                setWrongPass(response.data.wrongPass)
            }catch(error){
                setWrongPass(false)
                
            }           
            console.log("Olha ai a resposta:",response.data);

            formik.resetForm();
            navigate('/Home')        
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

                { wrongPass ? <S.WrapperErrorForms>Email ou Senha Incorretos!</S.WrapperErrorForms> : ''}
                
                <Button
                    text={'Entrar'}                 
                />
            </S.WrapperForm>                           
        </S.WrapperContent>
    );
}


export default Login;