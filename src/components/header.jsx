import React, { useEffect,useState } from 'react';
import logo from '../assets/gstm-imagotipo.png';
import classNames from 'classnames';
import { useNavigate  } from "react-router-dom";
import ModalLogin from './modalLogin'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice'
import axios from 'axios'
const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)
  const [url,setUrl] = useState();
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios.get('https://cms-l4tiq.ondigitalocean.app/api/page-externas')
    .then(response => {
      const data =response?.data?.data; 
      data.forEach(element => {
        console.log(element)
      });
      setUrl(data);
    })

  }, [])

  const classMenu = classNames({
    'Header-containerMenu': true,
    'Header-containerMenu--active':activeMenu,
  })

  const buttonClose = classNames({
    'Header-menuMobile': true,
    'Header-menuMobile--active':activeMenu,
  })

  const handleLogin = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className='Header'>
      <div className="Header-container">
        <div className="Header-logo" onClick={() => navigate('/')}>
          <img src={ logo } alt="" />
        </div>
        <div className={ classMenu }>
          <ul className='Header-menu'>
            <a href="#home"><li className='Header-li'>Inicio</li></a>
            <a href="#destinos"><li className='Header-li'>Destinos</li></a>
            <a href="#servicios"><li className='Header-li'>Servicios</li></a>
            <a href="#footer"><li className='Header-li'>Contacto</li></a>
            {
              url?.map ( item =>(
                <a key={item.attributes.Name} href={item.attributes.url} target='_blank'>
                  <li className='Header-li'>
                    {item.attributes.Name}
                  </li>
                </a>
                    )
                  )       
            }
            { user.activeLogin ? 
              <div className='Header-logout logout-mobile Header-li' onClick={() => handleLogin()}>
                <span>{user.email}</span>
                <i className="fa-duotone fa-right-from-bracket"></i>
              </div>
            
            : 
              <div className='Header-Login login-mobile Header-li'>
                <span onClick={()=> setActiveLogin(true)}>
                  Iniciar Sesion
                </span>
              </div>
              
            }
            { user.activeLogin ? 
            <></>
            : 
              <div className='login-mobile Header-li'>
                <span onClick={()=> setActiveLogin(true)}>
                  Registrate
                </span>
              </div>
              
            }

        { user.activeLogin ? 
          <div className='Header-logout logout-desktop Header-li' onClick={() => handleLogin()}>
            <span>{user.email}</span>
            <i className="fa-duotone fa-right-from-bracket"></i>
          </div>
         
        : 
          <div className='Header-Login Header-li'>
            <span onClick={()=> setActiveLogin(true)}>
              Iniciar Sesion
            </span>
          </div>
        }
    
          { user.activeLogin ? 
          <></>
         
        : 
          <div className='Header-Login Header-li'>
            <span onClick={()=> setActiveLogin(true)}>
            Registrate
            </span>
          </div>
        }
                  </ul>
        </div>
        <div className={ buttonClose } onClick={ () => setActiveMenu(!activeMenu) }>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <ModalLogin
        activeModal={ activeLogin }
        closeModal={ setActiveLogin }      
      />
    </nav>
  );
};

export default Header;