import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import base_url from '../Services/server_url';
import { dashAllCompanies } from '../Services/allApies';
import { useNavigate } from 'react-router-dom';



function EventCompanies() {
  const [search,setSearch]=useState("")


  useEffect(() => {

    handleAddCompany()


  },[search])


  const [company, setCompany] = useState([])





  const handleAddCompany = async () => {

    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }

    const result = await dashAllCompanies(header,search)
    console.log(result);

    if (result.status == 200) {

      setCompany(result.data)

    } else {
      console.log(result.response.data);
    }

  }
  const navigate=useNavigate()

  const handleNavigate=()=>{

    navigate('/Cbooking')

  }


  return (
    <>

      <Row style={{ backgroundColor: '#240636' }}>

        <div className='m-5 d-flex justify-content-between'>
          <input type="text" name="" onChange={(e)=>{setSearch(e.target.value)}} className='form-control w-25' placeholder='Enter Title for Event Search' id="" />
          <button onClick={handleNavigate} className='btn btn-outline' style={{color: "#FFD43B",marginRight:'155px'}}> <i className="fa-solid fa-backward" style={{color: "#FFD43B"}}></i> Back  </button>

        </div>
        {

          company.length > 0 ?
            company.map(item => (

              <Col className='m-5'>

                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" style={{ width: '100%', height: '250px' }} src={item.cimage ? `${base_url}/Uploads/${item.cimage}` : "holder.js/100px180"} />
                  <Card.Body>
                    <Card.Title>  <h4 className='text-danger'>{item.ctitle}</h4>
                    </Card.Title>
                    <Card.Text>

                      <p  className='text-dark'>{item.cdescription}</p>

                      <h6>Location:{item.clocation}</h6>

                      <h6>Contact:{item.ccontact}</h6>

                      <h6>Web-link: <a href= {item.clink}> {item.clink}</a> </h6>



                    </Card.Text>
                    <Button onClick={handleNavigate} variant="primary">To touch with us</Button>
                  </Card.Body>
                </Card>


              </Col>


            ))

            :

            <h3>No Events Availbale</h3>


        }


      </Row>



    </>
  )
}

export default EventCompanies