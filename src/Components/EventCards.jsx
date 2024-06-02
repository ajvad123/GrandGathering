import React from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import base_url from '../Services/server_url';



function EventCards({event}) {


     const navigate =useNavigate()

      const jump=()=>{
        navigate('/elist')
      }


     

    
    return (
        <>
            <div className='mx-5'>

                <Card style={{ width: '18rem' }}> 
                    <Card.Img onClick={jump} variant="top" style={{width:'100%',height:'250px'}} src= {event.eimage?`${base_url}/Uploads/${event.eimage}`: "https://wallpaperaccess.com/full/5137780.jpg"} />
                    <Card.Body>
                        <Card.Title>{event.etitle}</Card.Title>

                    </Card.Body>
                </Card>

            </div>

        
        </>
    )
}

export default EventCards