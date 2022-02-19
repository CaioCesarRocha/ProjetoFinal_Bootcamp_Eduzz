import React , { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import * as S from './styled';

import Menu from '../../components/menu';
import FieldInput from '../../components/input';
import api from '../../services/api';
import useUser from '../../hooks/userHooks';



const schema = Yup.object().shape({ //validation com Yup
    title: Yup.string().required('O campo Title é obrigatório').max(80, "O título deve ter no máximo 80 caracteres"),
    cast: Yup.string().required('O campo Cast é obrigatório'),
    year: Yup.string().required('O campo Year é obrigatório').min(4, 'O ano deve ter pelo menos 4 dígitos'),
    duration: Yup.string().required('O campo Duration é obrigatório'),
    avatar: Yup.string().url().required('O Avatar é obrigatório'),
    producer: Yup.string().required('O campo Nome é obrigatório'),
    description: Yup.string().url().required('O link da descrição é obrigatório'),  
    trailer: Yup.string().url().required('O link do trailer é obrigatório'),
})


const RegisterMovie = () => {
    const [ selectedGenre1, setSelectedGenre1] = useState('0');
    const [ selectedGenre2, setSelectedGenre2] = useState('0');
    const [ genres, setGenres] = useState([]);
    const [username, setUsername] = useState('');

    const initialValues = { title: '', avatar: '', description: '', duration: '', year: '', cast: '', producer: '', trailer: '', genres: []};
    
    const navigate =  useNavigate();
    const {userState} = useUser();


    useEffect(() => {
        api.get('genres').then(response =>{
            setGenres(response.data)
        })
        try{        
            console.log(userState)           
            setUsername(userState.username) 
            console.log('userName', username);           
        } catch{
            navigate('/') 
        }  
    }, []);


    function handleSelectGenre1(event){
        const genre = event.target.value;
        setSelectedGenre1(genre);
    }

    function handleSelectGenre2(event){
        const genre = event.target.value;
        setSelectedGenre2(genre);
    }

    async function handleSubmit(data){
        //const genres = [selectedGenre1, selectedGenre2]

       const dataMovies = [] 
        dataMovies.push({
            title: data.title,
            cast: data.cast,
            duration: data.duration,
            year: data.year,           
            producer: data.producer,
            genres: [selectedGenre1, selectedGenre2],
            avatar: data.avatar,
            description: data.description,
            trailer: data.trailer
        })
        const dataMovie = dataMovies[0];
        console.log("data JSON", dataMovie)

        const res = await api.post('movie', dataMovie);

        return data
    }

    const formik  = useFormik({
        initialValues: initialValues,
    
        validationSchema: schema,
    
        enableReinitialize: true,
        onSubmit: async (data) => {       
            const response = await handleSubmit(data);

            formik.resetForm();
            alert(`Filme ${data.title}cadastrado`);
            console.log("Olha ai a resposta:",response);

            /*navigate.push({
                pathname: '/',
            })*/     
        }
    });

    return(
        <S.WrapperContent id="register-movie">
            <Menu />
            <S.WrapperForm onSubmit={formik.handleSubmit}>
                <h1>Dados do Filme</h1>
                <fieldset> 
                    <FieldInput
                        nomeCampo={"Título"}
                        type={"text"}
                        name={"title"}
                        placeholder={"Digite o nome do filme"}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.title && formik.touched.title &&(<S.WrapperErrorForms>{formik.errors.title}</S.WrapperErrorForms>)}

                    <FieldInput
                        nomeCampo={"Elenco"}
                        type={"text"}
                        name={"cast"}
                        value={formik.values.cast}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.cast && formik.touched.cast &&(<S.WrapperErrorForms>{formik.errors.cast}</S.WrapperErrorForms>)}                
                    
                    <FieldInput
                        nomeCampo={"Ano de Lançamento"}
                        type={"number"}
                        name={"year"}
                        value={formik.values.year}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.year && formik.touched.year &&(<S.WrapperErrorForms>{formik.errors.year}</S.WrapperErrorForms>)}   

                    <FieldInput
                        nomeCampo={"Duração"}
                        type={"text"}
                        name={"duration"}
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.duration && formik.touched.duration &&(<S.WrapperErrorForms>{formik.errors.duration}</S.WrapperErrorForms>)}

                    <FieldInput
                        nomeCampo={"Produtora"}
                        type={"text"}
                        name={"producer"}
                        value={formik.values.producer}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.producer && formik.touched.producer &&(<S.WrapperErrorForms>{formik.errors.producer}</S.WrapperErrorForms>)}

                    <FieldInput
                        nomeCampo={"Avatar"}
                        type={"url"}
                        name={"avatar"}
                        placeholder={"Link do avatar do filme"}
                        value={formik.values.avatar}
                        onChange={formik.handleChange}
                    />    
                        {formik.errors.avatar && formik.touched.avatar &&(<S.WrapperErrorForms>{formik.errors.avatar}</S.WrapperErrorForms>)}

                    <FieldInput
                        nomeCampo={"Descrição - Sinopse"}
                        type={"url"}
                        name={"description"}
                        placeholder={"Link da descrição do filme"}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.description && formik.touched.description &&(<S.WrapperErrorForms>{formik.errors.description}</S.WrapperErrorForms>)}

                    <FieldInput
                        nomeCampo={"Trailer"}
                        type={"url"}
                        name={"trailer"}
                        placeholder={"Link do trailer do filme"}
                        value={formik.values.trailer}
                        onChange={formik.handleChange}
                    />
                        {formik.errors.trailer && formik.touched.trailer &&(<S.WrapperErrorForms>{formik.errors.trailer}</S.WrapperErrorForms>)}

                    <S.WraperrLabel htmlFor="genres">Selecione os gêneros do filme</S.WraperrLabel>
                    <S.WrapperFieldGroup>                    
                            <select 
                                name="genre1" 
                                id="genre1" 
                                value={selectedGenre1}  
                                onChange={handleSelectGenre1}
                            >                             
                                {genres.map(genre =>(
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))};
                            </select>

                            <select 
                                name="genre2" 
                                id="genre2" 
                                value={selectedGenre2}  
                                onChange={handleSelectGenre2}
                            >
                                {genres.map(genre =>(
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))};
                            </select>
                    </S.WrapperFieldGroup>
                 </fieldset>

                <button type="submit" >
                    Finalizar Cadastro
                </button>
            </S.WrapperForm>
         </S.WrapperContent>       
    );  
}


export default RegisterMovie;