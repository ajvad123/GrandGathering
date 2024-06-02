import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addEvent } from '../Services/allApies';
import { Link } from 'react-router-dom';

function AddEvents() {


    const [EvtData, setEvtData] = useState({
        etitle: "", etype: "", elocation: "", etime: "", etiket: "", eimage: ""
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [imageStatus, setImageStatus] = useState(false)
    const [preview, setPreview] = useState("")
    useEffect(() => {

        if (EvtData.eimage.type == "image/jpg" || EvtData.eimage.type == "image/jpeg" || EvtData.eimage.type == "image/png") {
            console.log("Image is correct Format");
            setPreview(URL.createObjectURL(EvtData.eimage))
            setImageStatus(false)
        } else {
            console.log("Invalid file formate !! image should be png,jpgor jpeg");
            setImageStatus(true)

        }
    }, [EvtData.eimage])


    const handleAddEvents = async () => {

        const { etitle, etype, elocation, etime, etiket, eimage } = EvtData

        if (!etitle || !etype || !elocation || !etime || !etiket || !eimage) {

            toast.warning("Please Fill the Field Correctly..!")
        }
        else {

            const formData = new FormData()

            formData.append("etitle", etitle)
            formData.append("etype", etype)
            formData.append("elocation", elocation)
            formData.append("etime", etime)
            formData.append("eticket", etiket)
            formData.append("eimage", eimage)

            const token = sessionStorage.getItem('token')

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result = await addEvent(formData, reqHeader)

            console.log(result);

            if (result.status == 200) {

                toast.success("Event Added Successfully..!!")
                setEvtData({
                    etitle: "", etype: "", elocation: "", etime: "", etiket: "", eimage: ""

                })
                handleClose()

            } else {
                toast.error(result.response.data)
            }



        }

    }





    return (

        <div  >

            <div >
                <Row style={{backgroundImage:`url("https://thumbs.dreamstime.com/z/event-management-creation-development-personal-corporate-events-223469404.jpg")`,backgroundRepeat:'no-repeat',backgroundSize:'100%'}}
>

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



                    <Col className='w-50' style={{ marginLeft: '80px', marginTop: '200px' }}>
                        <div className='shadow border  w-50 p-5 '  >

                            <h3 className='mt-5 text-white'>Add Your Events</h3>
                            <Button className="btn btn-danger mb-4 mt-3" style={{ marginLeft: "80px" }} onClick={handleShow}>
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
                        <Modal.Title>Add Events</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row >

                            <Col>
                                <label>
                                    <input type="file" name='' onChange={e => setEvtData({ ...EvtData, eimage: e.target.files[0] })} style={{ display: 'none' }} />
                                    <img className='img-fluid' src={preview ? preview : "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"} alt="" />
                                    {
                                        imageStatus &&
                                        <p className='text-danger'>Invalid file formate !! image should be png,jpgor jpeg</p>
                                    }
                                </label>


                            </Col>

                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Event Title" className='mb-3' >
                                        <Form.Control type="text" onChange={e => { setEvtData({ ...EvtData, etitle: e.target.value }) }} placeholder="Event Name" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overviewinp" label="Event Type" className='mb-3'  >
                                        <Form.Control type="text" onChange={e => { setEvtData({ ...EvtData, etype: e.target.value }) }} placeholder="Which type of event is conducted" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Location" className='mb-3' >
                                        <Form.Control type="text" onChange={e => { setEvtData({ ...EvtData, elocation: e.target.value }) }} placeholder="Event Location " />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" label="Time" className='mb-3'  >
                                        <Form.Control type="text" onChange={e => { setEvtData({ ...EvtData, etime: e.target.value }) }} placeholder="Event Time" />
                                    </FloatingLabel>


                                </div>


                            </Col>
                            <FloatingLabel controlId="demoinp" label="Tiket prize" className='mb-3'  >
                                <Form.Control type="text" onChange={e => { setEvtData({ ...EvtData, etiket: e.target.value }) }} placeholder=" Tikets Amount" />
                            </FloatingLabel>

                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddEvents} >Save</Button>
                    </Modal.Footer>
                </Modal>


            </div>



        </div>


    )
}

export default AddEvents