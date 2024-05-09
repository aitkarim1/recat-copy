import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import Navbar from '../page/Navbar';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFolder, faList, faMap, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Control, Icon, divIcon, point } from "leaflet";
import { TileLayer,Marker,MapContainer,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useAppContext } from '../componentes/reducers';
import { useNavigate } from 'react-router-dom';


const Dashboard = (props) => {

  const { state } = useAppContext();
  const name = state.name;

  const [view2, setView2] = useState(1); // Estado para controlar qué vista se está mostrando
  const [view, setView] = useState(1); // Estado para controlar qué vista se está mostrando
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);

  const position = [51.505, -0.09]
  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../assets/icons/iconoMapa.webp"), 
    iconSize: [30, 30] // size of the icon
  });

  const projects = []; // Agrega tu lógica para obtener los proyectos aquí
  const admin = true; // Asumiendo que tienes una variable booleana admin


  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [projectIfcFile, setProjectIfcFile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Petición POST a la API
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-projects`);
        console.log(response.data)
        setProyectos(response.data)
        
      } catch (err) {
          console.log(err.response);
      }
        
    })();
  }, []);


  const addProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', projectName);
    formData.append('descripcion', projectDescription);
    if (projectIfcFile) {
      formData.append('ifcFile', projectIfcFile);
    }
    if (projectImageFile) {
      formData.append('imageFile', projectImageFile);
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-project`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      
    } catch (error) {
      console.error("Error uploading the project: ", error.response);  
    }
  };
  
  const goToPage = (page) => {
    setView(page); 
  };
  
  const goToPage2 = (page) => {
    setView2(page); 
  };

  const showAddUsers = () => {
    // Agrega tu lógica para mostrar el modal de añadir usuarios aquí
  };

  const getValToEditProject = () => {
    // Agrega tu lógica para obtener los valores a editar del proyecto aquí
  };

  const showConfirmDelProject = () => {
    // Agrega tu lógica para mostrar el modal de confirmar eliminación del proyecto aquí
  };

  return (
        

   <Container fluid className="vw-100">
      <Navbar name={props.name}/>
      <div className="row">
        <div className="col-xl-8 col-md-12 mw-100">
          <div className="searchbar border-bottom">
            <ul className="nav nav-pills secondary nav-fill justify-content-start" data-bs-theme="light">
              <li className="nav-item">
                <Button
                  className={`nav-link ${view === 1 && 'active'}`}
                  onClick={() => goToPage(1)}
                >
                  <i><FontAwesomeIcon icon={faInbox} className="me-1" /></i> Galeria
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  className={`nav-link ${view === 2 && 'active'}`}
                  onClick={() => goToPage(2)}
                >
                  <i><FontAwesomeIcon icon={faList} className="me-1" /></i> Lista
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  className={`nav-link ${view === 3 && 'active'}`}
                  onClick={() => goToPage(3)}
                >
                  <i><FontAwesomeIcon icon={faMap} className="me-1" /></i> Mapa
                </Button>
              </li>
            </ul>
          </div>
          <div className="alert alert-warning alert-dismissible fade show  mx-2 my-1" role="alert">
            <p><strong>¡Nueva actualización! </strong><a href="/changelog">Click aquí para acceder al historial de versiones</a></p>
            Última actualización 16/10/2023
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

{view === 1 && (
  <>
    <div className="row w-100 px-2 py-1">
      <div className="col-xl-4 col-md-12 g-4">
        {
          proyectos.map((proyecto) => (
            <Card className="h-100 w-100 mb-4 shadow-sm">
              {proyecto.miniatura ? <Card.Img variant="top" src={`http://localhost:4000/projects/${proyecto.id}/${proyecto.miniatura}`}/> : <Card.Img variant="top" src="https://placehold.co/600x340?text=Photo+not+found"/>}
              <Card.Body>
                <Card.Title>{proyecto.name}</Card.Title>
                <Card.Text>{proyecto.descripcion}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Button variant="outline-primary"><i><FontAwesomeIcon icon={faFolder} className="me-1" /></i>Abrir</Button>
                    <Button variant="outline-success"><i><FontAwesomeIcon icon={faUsers} className="me-1" /></i>Usuarios</Button>
                    <Button variant="outline-secondary"><i><FontAwesomeIcon icon={faEdit} className="me-1" /></i>Editar</Button>
                    <Button variant="outline-danger"><i><FontAwesomeIcon icon={faEdit} className="me-1" /></i>Archivar</Button>
                  </div>
                </div>
                <small className="text-muted pt-4">{proyecto.fechaCreacion}</small>
              </Card.Body>
            </Card>
          ))
        }
      </div>
    </div>
    <div className="col-xl-4 col-md-8 d-flex align-items-center justify-content-center g-4 " >
      <Button variant="primary" className='justify-content-center align-items-center d-flex h-100 w-100'  onClick={handleShow}>
        <Plus size={24} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={addProject}>
          <Modal.Header closeButton>
            <Modal.Title>Crear proyecto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre del proyecto</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {setProjectName(e.target.value)}}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                  type='text'                 
                  onChange={(e) => {setProjectDescription(e.target.value)}}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Archivos</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setProjectIfcFile(e.target.files[0])}
                  accept=".ifc"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Miniatura</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setProjectImageFile(e.target.files[0])}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </Form.Group>
            
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
</>
)}


{view === 2 && (
  <>
    <table className="w-100 table align-middle table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha creación</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Agrega tu lógica para iterar sobre los proyectos aquí */}
      </tbody>
    </table>
    <div className="col-xl-4 col-md-8 d-flex align-items-center justify-content-center g-4 " >
      <Button variant="primary" className='justify-content-center align-items-center d-flex h-100 w-100'  onClick={handleShow}>
        <Plus size={24} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre del proyecto</Form.Label>
              <Form.Control
                type="text"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripción</Form.Label>
              <Form.Control  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Archivos</Form.Label>
              <Form.Control
                type="file"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Miniatura</Form.Label>
              <Form.Control
                type="file"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleClose}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </>
  
)}
</div>

{console.log(proyectos)}
{view === 3 && proyectos.length>0 && (
  <div className="col-xl-8 col-md-12">
    <div className='mapa'>
      <MapContainer center={[40.911955151705315, 0.1537488871630788]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
        chunkedLoading
        >
        {proyectos.map((proyecto) => (
          <Marker position={[proyecto.lantitud, proyecto.longitud]} icon={customIcon}>
          <Popup className='popup'>
            <Card style={{ width: '14rem', border: "none" }}>
            {proyecto.miniatura ? <Card.Img variant="top" src={`http://localhost:4000/projects/${proyecto.id}/${proyecto.miniatura}`} /> : <Card.Img variant="top" src="https://placehold.co/600x340?text=Photo+not+found"/>}
              <Card.Body>
                <Card.Title>{proyecto.name}</Card.Title>
                <Card.Text>
                  {proyecto.descripcion}
                </Card.Text>
                <Button variant="primary">Go to Viewer</Button>
              </Card.Body>
            </Card>
          </Popup>
        </Marker>
        
        ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
    {console.log("./"+proyectos[0].urlImage)}
  </div>
)}

<div className="col-xl-4 col-md-12 m-0">        
<div className="col-xl-12 col-md-12 mw-100">
<div className="searchbar border-bottom">
<ul className="nav nav-pills secondary nav-fill justify-content-start" data-bs-theme="light">
  <li className="nav-item">
      <Button 
         className={`nav-link ${view2 === 1 && 'active'}`}
         onClick={() => goToPage2(1)}
        >
          <i><FontAwesomeIcon icon={faInbox} className="me-1" /></i> Incidencias
        </Button>
  </li>
  <li className="nav-item">
       <Button 
         className={`nav-link ${view2 === 2 && 'active'}`}
         onClick={() => goToPage2(2)}
        >
          <i><FontAwesomeIcon icon={faList} className="me-1" /></i> Tareas
        </Button>
  </li>
</ul>

</div>
<div className="col-12 d-flex p-1 justify-content-center">
<select  onChange={(event) => this.comprobarValor(event)} className="form-select">
<option disabled>Asigna un proyecto para filtrar</option>

<option value="Todos">Todos</option>
</select>
</div>
<div className="list-group w-100">

</div>
<div className="list-group w-100">

</div>
</div>

</div>
</div>
  </Container>
  
      ) 
}; 

export default Dashboard