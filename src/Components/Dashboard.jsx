import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EventCards from './EventCards'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { dashEvents } from '../Services/allApies';
import { dashCompanies } from '../Services/allApies';
import base_url from '../Services/server_url';



function Dashboard() {
  const name = sessionStorage.getItem('username')
  const navigate = useNavigate()

  const jump = () => {
    navigate('/ecompany')
  }

  const [devnts, setDevents] = useState([])
  const [dcompany, setDcompany] = useState([])

  useEffect(() => {

    handleEvents()
    handleCompany()

  })

  const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }


  const handleEvents = async () => {


    try {

      const result = await dashEvents(header)

      if (result.status == 200) {

        setDevents(result.data)

      } else {

        console.log(result.response.data);

      }

    } catch (err) {
      console.log(err);
    }


  }

  const handleCompany = async () => {

    const result = await dashCompanies(header)

    console.log();
    if (result.status == 200) {

      setDcompany(result.data)
    } else {
      console.log(result.response.data);
    }



  }


  console.log(dcompany);

  return (

    <>

      <Row className='d-flex align-items-center' style={{backgroundImage:`url("https://cleproductions.com/wp-content/uploads/2019/10/AI-Events-FB.jpg")`,backgroundRepeat:'no-repeat' ,backgroundSize:'100%'}}> 




    

        <Col  style={{ marginLeft: '250px', marginTop: '150px', marginBottom: '150px' }}>
        <p className='' style={{marginLeft: '40px', color: "#ad175f", fontSize: '30px' }}>"let's turn your visions into unforgettable experiences....!"</p>

          <h1 className='text-dark' style={{marginLeft:'300px'}}>Hi, Welcome <span className='text-danger'>{name}</span></h1>

          <div className='d-flex mt-4' style={{ marginLeft: '0px' }}>

            <Link className='btn btn-info' style={{marginLeft:'330px'}} to={'/elist'} >Events</Link>

            <Link className='btn btn-success' style={{ marginLeft: '30px' }} to={'/ecompany'} >Event Companies</Link>

          </div>


        </Col>

        



      </Row>





    </>
  )
}

export default Dashboard