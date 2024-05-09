import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import img from '../assets/images/levitec-viewerifc.png';
import { useAppContext } from '../componentes/reducers';


const Navbar = () => {


  const { state } = useAppContext();
  const name = state.name;
  const navigate = useNavigate();

  if (name === 'undefined') {
    navigate('/');

  }

  const desconectarse = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    //dispatch({ type: 'SET_NAME', value: '' }); // Actualiza el nombre a vacío
  
    navigate('/');
  };

  const goToPage = async (page) => {
    // Navega a la página especificada
    await this.ifc.goToDashboard(page);
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-light border border-bottom-black " data-bs-theme="light">
      <div className="container-fluid">
        <a className="navbar-brand" href='/dashboard'>
          <img src={img} height="30" alt="Levitec Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <NavDropdown title={<span> <FontAwesomeIcon icon={faUser} /> {state.name}</span>} id="basic-nav-dropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goToPage('/admin')} ><FontAwesomeIcon icon={faLock} className="me-1" /> Panel de Administracion</NavDropdown.Item>
              <NavDropdown.Item onClick={() => goToPage('/admin')} ><FontAwesomeIcon icon={faLock} className="me-1" /> Perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={desconectarse} > <FontAwesomeIcon icon={faRightFromBracket} className="me-1" /> Desconectarse</NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
