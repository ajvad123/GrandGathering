// src/TicketBookingForm.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { bookTickets } from '../Services/allApies';
import { toast } from 'react-toastify';

const EventTicket = () => {
    const [ticketData, setTicketData] = useState({
        Ename: '',
        Email: '',
        Eticket: '',
        Sname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData({
            ...ticketData,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Ename, Sname, Email, Eticket } = ticketData
        console.log(Ename, Sname, Email, Eticket);

        if (!Ename || !Sname || !Email || !Eticket) {

            toast.warning("Please Fill The Field Properly")
        } else {


            try {
                const token = sessionStorage.getItem('token')

                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await bookTickets(ticketData, header)

                console.log(result);

                if (result.status == 200) {
                    toast.success("Successfully Booked Your Tikets ")
                    toast.info("We will send the ticket through Email...!")
                } else {
                    toast.error("Already Booked the ticket using this email ,you may please change your email address")
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

        <div style={{backgroundColor:'black'}}>
            <div style={{
                backgroundImage: "url('https://www.shutterstock.com/image-photo/woman-holding-smartphone-buying-movie-600nw-2156185629.jpg')", backgroundRepeat: '', width: '100%', height: '100%'
            }}>
                <Container className=''>
                    < Row className="justify-content-md-center">
                        <Col className='p-3' md="6">
                            <h2 className="text-center text-white">Ticket Booking</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label className='text-white'>Name</Form.Label>
                                    <Form.Control
                                        type="Ename"
                                        name="Ename"
                                        value={ticketData.Ename}
                                        onChange={handleChange}
                                        placeholder='Enter Your Name'

                                    />
                                </Form.Group>
                                <Form.Group controlId="formSname">
                                    <Form.Label className='text-white'>Event Name</Form.Label>
                                    <Form.Control
                                        type="Sname"
                                        name="Sname"
                                        value={ticketData.Sname}
                                        onChange={handleChange}
                                        placeholder='Enter Event Name'


                                    />
                                </Form.Group>


                                <Form.Group controlId="formEmail">
                                    <Form.Label className='text-white'>Email</Form.Label>
                                    <Form.Control
                                        type="Email"
                                        name="Email"
                                        value={ticketData.Email}
                                        onChange={handleChange}
                                        placeholder='Enter Your Email'


                                    />
                                </Form.Group>

                                <Form.Group controlId="formTickets">
                                    <Form.Label className='text-white'>Number of Tickets</Form.Label>
                                    <Form.Control
                                        type="Eticket"
                                        name="Eticket"
                                        value={ticketData.Eticket}
                                        onChange={handleChange}
                                        min="1"
                                        placeholder='Enter Ticket Count'

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

export default EventTicket;
