import React,{useEffect,useState} from 'react'
import HeaderSecundary from '../components/headerSecundary';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import key from '../scripts/apikey'
import Footer from '../components/footer';
import img from '../assets/lasvegas.jpg';
import ContainerPrice from '../components/containerPrice';
import Faq from '../components/faq';

const LandingTour = () => {
 
  const { packageId } = useParams();
  const [trip,setTrip] = useState();

  useEffect(() => {
      getToken()  
  }, [])  
  
const getToken = async () => {
  await axios.get(`https://cms.trotatourism.com/api/servicios/${packageId}?populate=*`)
  .then(function (response) {
    // manejar respuesta exitosa
    console.log(response.data.data.attributes);
    setTrip(response.data.data.attributes);
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
 } 


return (
  <div className='landing'>
      <HeaderSecundary title={trip?.titulo && trip?.titulo} subtitle={trip?.locacion.description && trip?.locacion.description} img={`https://cms.trotatourism.com/${trip?.portada?.data?.attributes?.url}`&& `https://cms.trotatourism.com/${trip?.portada?.data?.attributes?.url}`} />
      <section className='landing-container'>
        <div className='landing-about'>
          <div className='landing-info'>
            <div className='landing-item'>
              <div className='landing-itemIcon'><i className="fa-light fa-clock"></i></div>
              <div className='landing-itemInfo'>
                <h6>Duracion</h6>
                <span>3 dias</span>
              </div>
            </div>
            <div className='landing-item'>
              <div className='landing-itemIcon'><i className="fa-light fa-user-group"></i></div>
              <div className='landing-itemInfo'>
                <h6>Grupo</h6>
                <span>{trip?.group_size && trip?.group_size} Personas</span>
              </div>
            </div>
            <div className='landing-item'>
              <div className='landing-itemIcon'><i className="fa-sharp fa-light fa-earth-americas"></i></div>
              <div className='landing-itemInfo'>
                <h6>Tipo Tour</h6>
                <span>{trip?.tipo_servicio.data.attributes.titulo && trip?.tipo_servicio.data.attributes.titulo}</span>
              </div>
            </div>
            <div className='landing-item'>
              <div className='landing-itemIcon'><i className="fa-light fa-language"></i></div>
              <div className='landing-itemInfo'>
                <h6>Lenguaje</h6>
                <span>Español</span>
              </div>
            </div>
          </div>
              <div className='landing-seccion'>
                <span className='landing-span'>Acerca del viaje:</span>
                <p>
                  {trip?.descripcion}
                </p>
              </div>
              <div className='landing-seccion'>
                <span className='landing-span'>Que esta incluido:</span>
                <div className='landing-inclusiones'>
                  <ul className='landing-ul'>
                  {trip?.incluido && trip?.incluido.length && trip?.incluido.map ( item =>(
                      <li key={item.id} className='landing-li'>
                        <div>
                          <i class="fa-sharp fa-light fa-circle-check"></i>
                          <span>{item.titulo}</span>
                        </div>
                        <p>{item.descripcion}</p>
                      </li>
                      )
                    )       
                    }
                  </ul>
                </div>
              </div>
              <div className='landing-seccion'>
                <span className='landing-span'>No incluido:</span>
                <div className='landing-inclusiones'>
                  <ul className='landing-ul'>
                  {trip?.no_incluido && trip?.no_incluido.length && trip?.no_incluido.map ( item =>(
                      <li key={item.id} className='landing-li no-include'>
                        <div>
                          <i class="fa-solid fa-ban"></i>
                          <span>{item.titulo}</span>
                        </div>
                        <p>{item.descripcion}</p>
                      </li>
                      )
                    )       
                    }
                  </ul>
                </div>
              </div>
              <Faq trip={trip}/>
          </div>
          <ContainerPrice trip={trip}/>
      </section>
      <section className='landing-gallery'>
        <div className='landing-photoPrincipal'>
          <div className='landing-img'><img src={img} alt="" /></div>
        </div>
        <div className='landing-photos'>
          <div className='landing-photo'>
            <div className='landing-img'><img src={img} alt="" /></div>
            <div className='landing-img'><img src={img} alt="" /></div>
          </div>
          <div className='landing-photo'>
            <div className='landing-img'><img src={img} alt="" /></div>
            <div className='landing-img'><img src={img} alt="" /></div>
          </div>
        </div>
      </section>
      <Footer/>
  </div>
)
}

export default LandingTour