import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addCompany } from '../Services/allApies';
import { Link } from 'react-router-dom';

function AddEcompanies() {

  const [cmpData, setCmpData] = useState(
    {
      ctitle: "", cdescription: "", clocation: "", ccontact: "", clink: "", cimage: ""
    }

  )
  const [preview, setPreview] = useState("")
  const [imageStatus, setImageStatus] = useState(false)

  useEffect(() => {
    if (cmpData.cimage.type == "image/png" || cmpData.cimage.type == "image/jpg" || cmpData.cimage.type == "image/jpeg") {
      console.log("Image is correct formate");
      setPreview(URL.createObjectURL(cmpData.cimage))
      setImageStatus(false)

    } else {


      setImageStatus(true)

      console.log("Invalid file formate !! image should be png,jpgor jpeg");
    }
  }, [cmpData.cimage])


  console.log(cmpData);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddEcompany = async () => {

    const { ctitle, cdescription, clocation, ccontact, clink, cimage } = cmpData

    if (!ctitle || !cdescription || !clocation || !ccontact || !clink || !cimage) {

      toast.warning("Please Fill The Field Successfully..!!!")

    }
    else {
      const formData = new FormData()

      formData.append("ctitle", ctitle)
      formData.append("cdescription", cdescription)
      formData.append("clocation", clocation)
      formData.append("ccontact", ccontact)
      formData.append("clink", clink)
      formData.append("cimage", cimage)

      const token = sessionStorage.getItem('token')

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }


      const result = await addCompany(formData, reqHeader)

      console.log(result);

      if (result.status == 200) {

        toast.success("Company Added Successfully..!!")
        setCmpData({

          ctitle: "", cdescription: "", clocation: "", ccontact: "", clink: "", cimage: ""

        })

        handleClose()

      }
      else {
        toast.error(result.response.data)
      }


    }

  }




  return (
    <div>

      <div>

        <Row className='' style={{ backgroundImage: `url("https://aaft.edu.in/wp-content/uploads/2023/04/RISK-MANAGEMENT-1568x1045.jpg")`, backgroundSize: '100%' }}>

          <Col className=''>

            <div className='bg-dark ' style={{ width: '300px', height: '600px' }} >

              <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                <Link style={{ textDecoration: 'none' }} to='/dash' className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white'>
                  <span className='fs-5 fw-bolder d-none d-sm-inline text-danger'>ADMIN</span></Link>

                <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu' >
                  <li className='w-100'>
                    <Link style={{ textDecoration: 'none' }} to={'/dash/addevnt'} className='nav-link text-white px-0 align-middle'>
                      <i className="fa-solid fa-plus fa-beat-fade" style={{ color: '#b80000' }}></i> <span className='ms-2 d-none d-sm-inline'>Add Events</span></Link>
                  </li>
                  <li className='w-100'>
                    <Link style={{ textDecoration: 'none' }} to={'/dash/addeCmpny'} className='nav-link px-0 align-middle text-white'>
                      <i className="fa-solid fa-user-plus fa-beat-fade" style={{ color: "#b80000" }}></i> <span className='ms-2 d-none d-sm-inline'>Add Event Companies</span></Link>
                  </li>
                  <li className='w-100'>
                    <Link style={{ textDecoration: 'none' }} to={'/dash/edit'} className='nav-link px-0 align-middle text-white' >
                      <i className="fa-solid fa-square-pen fa-beat-fade" style={{ color: '#b80000' }}></i> <span className='ms-2 d-none d-sm-inline'>Update</span></Link>
                  </li>
                  <li className='w-100'>
                    <Link style={{ textDecoration: 'none' }} to={'/'} className='nav-link px-0 align-middle text-white' >
                      <i className="fa-solid fa-right-from-bracket fa-beat-fade" style={{ color: '#b80000' }}></i> <span className='ms-2 d-none d-sm-inline'>Logout</span></Link>
                  </li>
                </ul>

              </div>

            </div>

          </Col>

          <Col className='w-50' style={{ marginLeft: '80px', marginTop: '150px' }}>
          <div className='shadow border  w-50 p-5 '  >

            <h3 className='mt-5 text-white'>Add Event Management Companies</h3>
            <Button className="btn btn-danger mb-4 mt-3" style={{ marginLeft: "200px" }} onClick={handleShow}>
              Add

            </Button>

          </div>
          </Col>



        </Row>





        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Event Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>

              <Col>
                <label>
                  <input type="file" name='' onChange={e => { setCmpData({ ...cmpData, cimage: e.target.files[0] }) }} style={{ display: 'none' }} />
                  <img className='img-fluid' src={preview ? preview : "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"} alt="" />
                  {
                    imageStatus &&
                    <p className='text-danger'>Invalid file formate !! image should be png,jpgor jpeg</p>
                  }

                </label>


              </Col>

              <Col>
                <div>
                  <FloatingLabel controlId="titleinp" label="Company Title" className='mb-3' >
                    <Form.Control type="text" onChange={e => { setCmpData({ ...cmpData, ctitle: e.target.value }) }} placeholder="company Name" />
                  </FloatingLabel>
                  <FloatingLabel controlId="overviewinp" label="Company description" className='mb-3'  >
                    <Form.Control type="text" onChange={e => { setCmpData({ ...cmpData, cdescription: e.target.value }) }} placeholder="small description about company" />
                  </FloatingLabel>
                  <FloatingLabel controlId="langinp" label="Location" className='mb-3' >
                    <Form.Control type="text" onChange={e => { setCmpData({ ...cmpData, clocation: e.target.value }) }} placeholder="company Location " />
                  </FloatingLabel>
                  <FloatingLabel controlId="githubinp" label="contact" className='mb-3'  >
                    <Form.Control type="text" onChange={e => { setCmpData({ ...cmpData, ccontact: e.target.value }) }} placeholder="contact " />
                  </FloatingLabel>


                </div>


              </Col>
              <FloatingLabel controlId="demoinp" label="web link" className='mb-3'  >
                <Form.Control type="text" onChange={e => { setCmpData({ ...cmpData, clink: e.target.value }) }} placeholder="Company website url" />
              </FloatingLabel>

            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddEcompany} >Save</Button>
          </Modal.Footer>
        </Modal>


      </div>


    </div>
  )
}

export default AddEcompanies