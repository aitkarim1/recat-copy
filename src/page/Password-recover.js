import React, { useState } from 'react'
import { Container, Form, Button, Alert, Image } from 'react-bootstrap'
import axios from 'axios'
import logoImg from '../assets/images/levitec-viewerifc.png'
import { Link } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordRecover = () => {
  const [email, setEmail] = useState("")

  const submitData = async (e) => {
    e.preventDefault();
        try {
            // Petición POST a la API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/password-recover`, {
                email: email
            }, {
              withCredentials: true
            });
            console.log("success login")

            // Mensaje de alerta
            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
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
                                            <div className="py-3">Introduce tu correo y te enviaremos un e-mail para recuperar tu contraseña.</div>
                                            <Form.Floating className="mb-3">
                                                <Form.Control type="email" id="email" placeholder="name@example.com" onChange={e =>{setEmail(e.target.value)}} required/>
                                                <label htmlFor="email">Correo</label>
                                            </Form.Floating>
                                            
                                            <div className="row justify-content-center my-3 px-3">
                                                <Button type="submit"  className="btn-block btn btn-primary btn-color">Recuperar contraseña</Button>
                                            </div>

                                            <div className="row justify-content-center pointer my-2">
                                                <Link to={"/login"} style={{textDecoration: 'none', color: 'inherit'}}><small  className="text-muted user-select-none pe-auto">Volver a inicio de sesión</small></Link>
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
            {/* Configuracion de libreria de mensajes de alerta */}
            <ToastContainer
                theme="colored"
                position="bottom-right"
                hideProgressBar
                closeOnClick
            />
        </section>
    </Container>
  )

}

export default PasswordRecover