import React, { useState } from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import logoImg from '../assets/images/levitec-viewerifc.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../componentes/reducers';


const Login = () => {
   
 const {dispatch} = useAppContext();


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  


  const submitData = async (e) => {
    e.preventDefault();
        try {
            // Petición POST a la API
            console.log(process.env.REACT_APP_API_URL)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                email: email,
                password: password
            }, {
              withCredentials: true
            });
            dispatch({ type: 'SET_NAME', value: response.data.name }); 
            console.log("success login")
         
            navigate('/dashboard');
            
            
        } catch (err) {
            console.log("errrr: " + err.response);
            // Mensaje de alerta
            toast.error('Error al iniciar sesión');
        }
  };

  
  return (
    <Container fluid className="m-0 p-0 vh-100 vw-100">
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">

                                {/* col del formulario */}
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        
                                        {/* logo */}
                                        <div className="text-center pt-3 pb-5">
                                            <img src={ logoImg } style={{  width: "205px" }} alt="logo" />
                                        </div>

                                        {/* Formulario */}
                                        <Form onSubmit={submitData}>
                                            <Form.Floating className="mb-3">
                                                <Form.Control type="email" id="email" placeholder="name@example.com" onChange={e =>{setEmail(e.target.value)}} required/>
                                                <label htmlFor="email">Correo</label>
                                            </Form.Floating>
                                            <Form.Floating className="mb-3">
                                                <Form.Control type="password" id="password" placeholder="Password" onChange={e =>{setPassword(e.target.value)}} required/>
                                                <label htmlFor="password">Contraseña</label>
                                            </Form.Floating>
                                            
                                            <div className="row justify-content-center my-3 px-3">
                                                <Button type="submit"  className="btn-block btn btn-primary btn-color">Iniciar sesión</Button>
                                            </div>

                                            <div className="row justify-content-center pointer my-2">
                                                <Link to={"/password-recover"} style={{textDecoration: 'none', color: 'inherit'}}><small  className="text-muted user-select-none pe-auto">¿Olvidaste la contraseña?</small></Link>
                                            </div>
                                        </Form>
                                    </div>
                                </div>

                                {/* col de imagen de fondo */}
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4"> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Configuracion de libreria de mensajes de alerta */}
        <ToastContainer
            theme="colored"
            position="bottom-right"
            hideProgressBar
            closeOnClick
        />
    </Container>
  )
}

export default Login