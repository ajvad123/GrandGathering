import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { dashAllEvents } from '../Services/allApies';
import base_url from '../Services/server_url';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import EventTicket from './EventTicket';




function EventList() {


  const [search,setSearch]=useState("")

  const navigate=useNavigate()
  const [allevents, setAllEvents] = useState([])

  useEffect(() => {
    handleAddEvents()
  },[search])

  const handleAddEvents = async () => {

    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }

    const result = await dashAllEvents(header,search)
    // console.log(result);

    if (result.status == 200) {

      setAllEvents(result.data)

    } else {
      console.log(result.response.data);
    }

  }

  const handleNavigate=()=>{

    navigate('/Ticket')

  }



  return (

    <>
      <Row style={{ backgroundColor: '#240636' }}>

      



        <div className='m-5 d-flex justify-content-between'>
          

            <input type="text" name="" onChange={(e)=>{setSearch(e.target.value)}} className='form-control  w-25 ' style={{ paddingLeft: '10px', paddingRight: '30px' }} placeholder='Enter Title for Event search ' id="" />
            <button onClick={handleNavigate} className='btn btn-outline' style={{color: "#FFD43B",marginRight:'155px'}}> <i className="fa-solid fa-backward" style={{color: "#FFD43B"}}></i> Back  </button>

          </div>

          


        {

          allevents.length > 0 ?
            allevents.map(item => (



              <Col className='m-5 '>

                <MDBCard style={{ width: '18rem'  }}>
                  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage style={{ width: '100%', height: '250px' }}  src={item.eimage ? `${base_url}/Uploads/${item.eimage}` : 'https://mdbootstrap.com/img/new/standard/nature/111.webp'} fluid alt='...' />
                    <a>
                      <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{item.etitle}</MDBCardTitle>
                    <MDBCardText>
                      <h4 className='text-danger'>{item.etype}</h4>

                      <h6>Location:{item.elocation}</h6>

                      <h6>Time:{item.etime}</h6>

                      <h6>Price:{item.eticket}</h6>

                    </MDBCardText>
                    <MDBBtn onClick={handleNavigate} >Get YOUR Ticket</MDBBtn>
                  </MDBCardBody>
                </MDBCard>


              </Col>


            ))

            :

            <h3>No Events Availbale</h3>


        }


      </Row>

    </>

  )
}

export default EventList