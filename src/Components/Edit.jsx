import React, { useState, useEffect ,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../Services/server_url';
import { editEvents } from '../Services/allApies';
import { toast } from 'react-toastify';
import { editEventResponseContext } from '../ContextApi/ContextApi';



function Edit({ event, company }) {


    const {eventResponse, setEventResponse}=useContext(editEventResponseContext)



    const [EvtData, setEvtData] = useState({

      id:event?._id  ,etitle: event?.etitle, etype: event?.etype, elocation: event?.elocation, etime: event?.etime, eticket: event?.eticket, eimage: ""
    })

    const [EcamData, setEcamCmpData] = useState(
        {
            ctitle: company?.ctitle, cdescription: company?.cdescription, clocation: company?.clocation, ccontact: company?.ccontact, clink: company?.clink, cimage: ""
        }

    )

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setPreview("")
        setEvtData({
            etitle: event?.etitle, etype: event?.etype, elocation: event?.elocation, etime: event?.etime, eticket: event?.eticket, eimage: ""

        })
        setEcamCmpData({
            ctitle: company?.ctitle, cdescription: company?.cdescription, clocation: company?.clocation, ccontact: company?.ccontact, clink: company?.clink, cimage: ""

        })

    };
    const handleShow = () => setShow(true);


    const handleUpdate = async () => {


        if (EvtData) {
            console.log("INSIDE",EvtData);

            const { etitle, etype, elocation, etime, eticket } = EvtData

            // console.log(etitle,etype,elocation,etime,);

            if (!etitle || !etype || !elocation || !etime || !eticket) {

                toast.warning("Please Fill the Field Correctly..!")
            }
            else {

                console.log("inside");
                const formData = new FormData()

                formData.append("etitle",etitle)
                formData.append("etype", etype)
                formData.append("elocation", elocation)
                formData.append("etime", etime)
                formData.append("eticket", eticket)
                preview ? formData.append("eimage", EvtData?.eimage) : formData.append("eimage", event?.eimage)

                const token = sessionStorage.getItem('token')

                    console.log(token);

                if (preview) {
                    const reqheader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`

                    }
                        console.log(EvtData.id);
                        console.log(reqheader);
                    const result=await editEvents(EvtData.id,formData,reqheader)

                    console.log(result);

                    if (result.status==200) {

                        toast.success(`Events${EvtData.etitle}is added Successfully..!!`)
                        setEventResponse(result)
                        handleClose()
                        
                    }
                    else{
                        console.log(result.response.data);
                        toast.error(result.response.data)
                    }

                } else {
                    const reqheader = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                    console.log(EvtData.id);
                    console.log(reqheader);


                    const result=await editEvents(EvtData.id,formData,reqheader)

                    console.log(result);

                    if (result.status==200) {

                        toast.success(`Events${EvtData.etitle}is added Successfully..!!`)
                        setEventResponse(result)
                        handleClose()


                    }
                    else{
                        console.log(result.response.data);

                        
                        toast.error(result.response.data)
                    }

                }



            }
        } else {

            const { ctitle, cdescription, clocation, ccontact, clink, cimage } = cmpData

            if (!ctitle || !cdescription || !clocation || !ccontact || !clink || !cimage) {

                toast.warning("Please Fill The Field Successfully..!!!")

            }
            else {
                const { ctitle, cdescription, clocation, ccontact, clink, cimage } = cmpData

                if (!ctitle || !cdescription || !clocation || !ccontact || !clink || !cimage) {

                    toast.warning("Please Fill The Field Successfully..!!!")

                }
                else {
                    const formData = new FormData()

                    formData.append("ctitle", company.ctitle)
                    formData.append("cdescription", company.cdescription)
                    formData.append("clocation", company.clocation)
                    formData.append("ccontact", company.ccontact)
                    formData.append("clink", company.clink)
                    preview ? formData.append("cimage", cmpData.cimage) : formData.append("cimage", company.cimage)

                    const token = sessionStorage.getItem('token')
                    if (preview) {
                        const reqHeader = {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`
                        }


                    } else {
                        const reqHeader = {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }


                    }

                }





            }
        }
    }
    const [imageStatus, setImageStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {

        if (EvtData ? EvtData.eimage.type == 'image/png' || EvtData.eimage.type == 'image/jpg' || EvtData.eimage.type == 'image/jpeg' : cmpData.cimage.type == "image/png" || cmpData.cimage.type == "image/jpg" || cmpData.cimage.type == "image/jpeg") {
            setImageStatus(false)
            setPreview(URL.createObjectURL(EvtData ? EvtData.eimage : cmpData.cimage))
        }
        else {
            setImageStatus(true)
        }

    }, [EvtData ? EvtData.eimage : cmpData.cimage])


    console.log(event);
    console.log(company);





    // console.log(EvtData);


    return (
        <>




            <Button className="btn bg-light me-3" style={{ color: 'black' }} onClick={handleShow} >
                <i className='fa-solid fa-pen-to-square fa-2xl' />
            </Button>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{event ? "Update Events" : 'Update Event Company'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>

                        <Col>
                            <label>
                                <input type="file" name='' onChange={e => event ? setEvtData({ ...EvtData, eimage: e.target.files[0] }) : (e) => setCmpData({ ...cmpData, cimage: e.target.files[0] })} style={{ display: 'none' }} />
                                <img className='img-fluid' src={preview ? preview : event ? `${base_url}/Uploads/${event.eimage}` : `${base_url}/Uploads/${company.cimage}`} alt="" />
                                {
                                    imageStatus &&

                                    <p className='text-danger'>Invalid file formate !! image should be png,jpgor jpeg</p>

                                }
                            </label>


                        </Col>

                        <Col>
                            <div>
                                <FloatingLabel controlId="titleinp" label={event ? "Event Title" : "Company Title"} className='mb-3' >
                                    <Form.Control type="text" value={event ? EvtData?.etitle : company?.ctitle} onChange={e => event ? setEvtData({ ...EvtData, etitle: e.target.value }) : (e) => setCmpData({ ...cmpData, ctitle: e.target.value })} placeholder={event ? "Event Name" : "Company Name"} />
                                </FloatingLabel>
                                <FloatingLabel controlId="overviewinp" label={event ? "Event Type" : "Company Description"} className='mb-3'  >
                                    <Form.Control type="text" value={event ? EvtData?.etype : company?.cdescription} onChange={e => event ? setEvtData({ ...EvtData, etype: e.target.value }) : (e) => setCmpData({ ...cmpData, cdescription: e.target.value })} placeholder={event ? "type of the event" : "small description about company"} />
                                </FloatingLabel>
                                <FloatingLabel controlId="langinp" label="Location" className='mb-3' >
                                    <Form.Control type="text" value={event ? EvtData?.elocation : company?.clocation} onChange={e => event ? setEvtData({ ...EvtData, elocation: e.target.value }) : setCmpData({ ...cmpData, clocation: e.target.value })} placeholder="Event Location " />
                                </FloatingLabel>
                                <FloatingLabel controlId="githubinp" label={event ? "Time" : "Contact"} className='mb-3'  >
                                    <Form.Control type="text" value={event ? EvtData?.etime : company?.ccontact} onChange={e => event ? setEvtData({ ...EvtData, etime: e.target.value }) : setCmpData({ ...cmpData, ccontact: e.target.value })} placeholder={event ? "Event time" : "contact"} />
                                </FloatingLabel>


                            </div>


                        </Col>
                        <FloatingLabel controlId="demoinp" label={event ? "Ticket Price" : "Web Link"} className='mb-3'  >
                            <Form.Control type="text" value={event ? EvtData?.eticket : company?.clink} onChange={e => event ? setEvtData({ ...EvtData, eticket: e.target.value }) : setCmpData({ ...cmpData, clink: e.target.value })} placeholder={event ? "Ticket Price" : "company web site link"} />
                        </FloatingLabel>

                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} >Update</Button>
                </Modal.Footer>
            </Modal>





        </>

    )
}



export default Edit