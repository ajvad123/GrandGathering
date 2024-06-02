// src/TicketBookingForm.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BookingCompany } from '../Services/allApies';

const CompanyBooking = () => {
    const [bookingData, setBookingData] = useState({
        Cname: '',
        Email: '',
        Cdate: '',
        Clocation: '',
        Ename:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Cname, Cdate, Email, Clocation ,Ename } = bookingData
        console.log(Cname, Cdate, Email, Clocation,Ename);

        if (!Cname || !Cdate || !Email || !Clocation ||!Ename) {

            toast.warning("Please Fill The Field Properly")
        } else {


            try {
                const token = sessionStorage.getItem('token')

                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await BookingCompany(bookingData, header)

                console.log(result);

                if (result.status == 200) {
                    toast.success("Successfully Booked Slot ")
                    toast.info("We will send the Confirmation  through Email...!")
                    setBookingData({
                        Cname: '',
                        Email: '',
                        Cdate: '',
                        Clocation: '',
                        Ename:''
                    })

                } else {
                    toast.error(result.response.data)
                }

            } catch (err) {
                console.log(err);
            }

        }

        // alert(`Booking Details:\nName: ${ticketData.name}\nEvent Name: ${ticketData.Sname}\nEmail: ${ticketData.email}\nTickets: ${ticketData.tickets}`);
    };

    // const handleBookTicket = async (e) => {

    //     e.preventDefault();






    // }

    return (

        <div style={{ backgroundColor: 'black' }}>
            <div style={{
                backgroundImage: "url('https://www.shutterstock.com/image-photo/woman-holding-smartphone-buying-movie-600nw-2156185629.jpg')", backgroundRepeat: '', width: '100%', height: '100%'
            }}>
                <Container className=''>
                    < Row className="justify-content-md-center">
                        <Col className='p-3' md="6">
                            <h2 className="text-center text-white">Booking</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label className='text-white'>Name</Form.Label>
                                    <Form.Control
                                        type="Cname"
                                        name="Cname"
                                        value={bookingData.Cname}
                                        onChange={handleChange}
                                        placeholder='Enter Your Name'
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDate">
                                    <Form.Label className='text-white'>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="Cdate"
                                        value={bookingData.Cdate}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>


                                <Form.Group controlId="formEmail">
                                    <Form.Label className='text-white'>Email</Form.Label>
                                    <Form.Control
                                        type="Email"
                                        name="Email"
                                        value={bookingData.Email}
                                        onChange={handleChange}
                                        placeholder='Enter Your Email'

                                    />
                                </Form.Group>

                                <Form.Group controlId="formTickets">
                                    <Form.Label className='text-white'>Location</Form.Label>
                                    <Form.Control
                                        type="Clocation"
                                        name="Clocation"
                                        value={bookingData.Eticket}
                                        onChange={handleChange}
                                        min="1"
                                        placeholder='Enter Your Location'

                                    />
                                </Form.Group>
                                <Form.Group controlId="formEtype">
                                    <Form.Label className='text-white'>Event Type</Form.Label>
                                    <Form.Control
                                        type="Ename"
                                        name="Ename"
                                        value={bookingData.Ename}
                                        onChange={handleChange}
                                        placeholder='Enter Event Type'
                                    />
                                </Form.Group>

                                <Button className='mt-3' variant="primary" type="submit">
                                    Book Tickets
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container >

            </div >
        </div>

    );
};

export default CompanyBooking;
