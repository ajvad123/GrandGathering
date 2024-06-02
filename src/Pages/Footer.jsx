import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Footer() {
  return (

    <div className='p-5 w-100 bg-dark'>

      <Row>




        <Col className='justify-content-center'>

          <h3 className='text-success ' style={{ fontSize: '50px' }}>G<span className='text-white' style={{ fontSize: '40px' }}>rand</span>G<span className='text-white' style={{ fontSize: '40px' }}>athering</span></h3>
          <p className='text-light align-items-center ' style={{ textAlign: 'justify' }}>Ensuring your event planning journey is nothing short of <br />   extraordinary. Join us at GrandGatherings and let's <br /> turn your visions into  unforgettable experiences...!</p>

        </Col>
        <Col className='align-items-center'>
          <div style={{marginLeft:'125px'}} >
          <img src="https://seeklogo.com/images/G/gucci-logo-0D90EEB760-seeklogo.com.png"  width={'200px'} alt="" />

          </div>
        
        </Col>
        <Col className='d-flex flex-column align-items-end'>
          <div className=''>

            <h3 className='text-light'>Contact Us</h3>
            <p className='text-light'>Submit your email , so we can contact you .... </p>
            <input type="email" placeholder='Enter Email Id' className='form-control' name="" id="" />
            <button className='btn btn-outline-light mt-3'>Submit</button>

          </div>

        </Col>


        <h6 className='text-center mt-5  text-light'>GrandGathering 2024 &copy; All right reserved.</h6>




      </Row>

    </div>

  )
}

export default Footer