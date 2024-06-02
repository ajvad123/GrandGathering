import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';


function Landing() {
  return (
    <>
      <Row style={{
        backgroundImage: `url("https://media.licdn.com/dms/image/D4D12AQFX1y60cPf68w/article-cover_image-shrink_720_1280/0/1691043937456?e=2147483647&v=beta&t=HIKfJdxI-6jrtnXKuFuHDt-CX5r8_QNqJwDTOlY0oEg")`, backgroundRepeat: 'no-repeat', backgroundSize: '100%'
      }} >

        <Col className='mt-5' style={{marginTop:'150px'}} >

          <div className='' style={{ margin: '120px' }}>

            <h3 className='text-success ' style={{ fontSize: '40px' }}> <span className='text-white' style={{ fontSize: '35px' }}>Welcome to</span>   G<span className='text-white' style={{ fontSize: '30px' }}>rand</span>G<span className='text-white' style={{ fontSize: '30px' }}>athering,</span></h3>
            <p className='text-white mt-3' style={{ fontSize: '20px', alignItems: 'justify' }}>"your ultimate destination for seamlessly <br /> organizing and promoting a diverse array of events..!"</p>

            <Link className=' btn btn-success mt-3' state={{ pading: '10px' }} to={'/Auth'}>Start to Explore</Link>

          </div>




        </Col>


        <Col className='' style={{marginTop:'150px'}}>

          <div style={{ marginTop: '70px', marginLeft: '30px' }} className='w-75'>


            <div className='d-flex justify-content-evenly  ' style={{ marginBottom: '50px' }} >

              <Card style={{ width: '1000%', backgroundColor:''}} className='ms-3 mb-3'>
                <Card.Img variant="top" />
                <Card.Body className='d-flex flex-row justify-content-between'>
                  <Card.Title><iframe width="853" height="400" style={{ width: '500px' }} src="https://www.youtube.com/embed/jLRXicRdNCQ" title="Stretch Leadership and Management Conference is back! - Promo Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></Card.Title>
                </Card.Body>
              </Card>

            </div>


          </div>



        </Col>


      </Row>


    </>

  )
}

export default Landing