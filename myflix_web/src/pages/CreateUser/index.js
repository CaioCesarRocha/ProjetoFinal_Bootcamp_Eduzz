import React, {useState} from 'react';

import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate} from 'react-router-dom';

import * as S from './styled';
import api from '../../services/api';
import Menu from '../../components/menu';
import FieldInput from '../../components/input';
import Button from '../../components/button';




const schema = Yup.object().shape({
    username: Yup.string().required('O campo Password é obrigatório').max(50),
    email: Yup.string().email().required('O campo Email é obrigatório'),
    password: Yup.string().required('O campo Password é obrigatório'),
    confirmPassword: Yup.string().required('O campo confirmPassword é obrigatório'),
})


const CreateUser = () => {
    const [ password, setPassword] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');
    const [samePassword, setSamePassword] = useState(true);

    const initialValues = {username: '', email: '', password: '', confirmPassword: '', admin: false}

    const navigate =  useNavigate();

    async function  handleSubmit(data){
        const dataUsers = [];
        dataUsers.push({
            username: data.username,
            email: data.email,
            password: data.password,
            admin: data.admin,
        })

        const dataUser = dataUsers[0];
        const response = await api.post('user', dataUser);

        return response
    }


    const formik  = useFormik({
        initialValues: initialValues,
    
        validationSchema: schema,
    
        enableReinitialize: true,

        onSubmit: async (data) => {  
            if(data.password !== data.confirmPassword){
                setSamePassword(false);
                return;
            }
            setSamePassword(true);
            const response = await handleSubmit(data);

            console.log("Olha ai a resposta:",response.data);
            formik.resetForm();
            navigate('/')   
        }
        
    })


    return (
        <S.WrapperContent>
            <Menu />
            <S.WrapperForm onSubmit={formik.handleSubmit}>
                <h1> Cadastro de Usuário </h1>
                <S.WrapperFieldset>
                    <FieldInput
                        nomeCampo={"Username"}
                        type={"text"}
                        name={"username"}
                        placeholder={"Nome do usuário"}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.username && formik.touched.username &&(<S.WrapperErrorForms>{formik.errors.username}</S.WrapperErrorForms>)}

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
                    
                        <FieldInput
                        nomeCampo={"Confirm Password"}
                        type={"password"}
                        name={"confirmPassword"}
                        placeholder={"Senha"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword &&(<S.WrapperErrorForms>{formik.errors.confirmPassword}</S.WrapperErrorForms>)}


                </S.WrapperFieldset>

                { samePassword ? '' : <S.WrapperErrorForms>Insira senhas iguais!</S.WrapperErrorForms>}

                <Button
                    text={'Finalizar'}
                />
            </S.WrapperForm>

        </S.WrapperContent>
    );
}

export default CreateUser;