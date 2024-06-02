import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'




function Admin() {
  return (
    <>

      <Row style={{backgroundImage:'url("https://zenkins.com/media/2024/01/Event-Management-Software.jpg")',backgroundRepeat:'no-repeat',backgroundSize:'100%'}} >

        <Col className=''>

          <div className='bg-dark ' style={{width:'300px', height:'600px'}} >

            <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link style={{ textDecoration: 'none' }} to='/dash' className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white'>
              <span className='fs-5 fw-bolder d-none d-sm-inline text-danger'>ADMIN</span></Link>

            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu' >
              <li className='w-100'>
                <Link style={{ textDecoration: 'none' }} to={'/dash/addevnt'} className='nav-link text-white px-0 align-middle'>
                <i className="fa-solid fa-plus fa-beat-fade" style={{color: '#b80000'}}></i> <span className='ms-2 d-none d-sm-inline'>Add Events</span></Link>
              </li>
              <li className='w-100'>
                <Link style={{ textDecoration: 'none' }} to={'/dash/addeCmpny'} className='nav-link px-0 align-middle text-white'>
                <i className="fa-solid fa-user-plus fa-beat-fade" style={{color: "#b80000"}}></i> <span className='ms-2 d-none d-sm-inline'>Add Event Companies</span></Link>
              </li>
              <li className='w-100'>
                <Link style={{ textDecoration: 'none' }} to={'/dash/edit'} className='nav-link px-0 align-middle text-white' >
                  <i className="fa-solid fa-square-pen fa-beat-fade" style={{ color: '#b80000' }}></i> <span className='ms-2 d-none d-sm-inline'>Update</span></Link>
              </li>
              <li className='w-100'>
                <Link style={{ textDecoration: 'none' }}  to={'/'} className='nav-link px-0 align-middle text-white' >
                  <i className="fa-solid fa-right-from-bracket fa-beat-fade" style={{ color: '#b80000' }}></i> <span className='ms-2 d-none d-sm-inline'>Logout</span></Link>
              </li>
            </ul>

          </div>

          </div>

        </Col>
      
      </Row>



    </>
  )
}

export default Admin