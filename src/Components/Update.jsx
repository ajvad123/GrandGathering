import React, { useEffect, useState,useContext } from 'react'
import Table from 'react-bootstrap/Table';
import { allEvents, deleteEvent } from '../Services/allApies';
import { allCompanies } from '../Services/allApies';
import { editEventResponseContext } from '../ContextApi/ContextApi';
import Edit from './Edit';
import { toast } from 'react-toastify';
import { deleteCompany } from '../Services/allApies';

function Update() {

    const {eventResponse,setEventResponse}=useContext(editEventResponseContext)


    useEffect(() => {
        getAllEvents()
        getAllCompanies()

    }, [eventResponse])
    const [events, setEvents] = useState([])
    const [company, setCompany] = useState([])

    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }


    const getAllEvents = async () => {


        const result = await allEvents(header)

        if (result.status == 200) {

            setEvents(result.data)

        } else {
            console.log(result.response.data);
        }



    }

    const getAllCompanies = async () => {

        const results = await allCompanies(header)

        // console.log(results);

        if (results.status == 200) {

            setCompany(results.data)

        } else {
            console.log(results.response.data);
        }
    }

    console.log(company);


    const handleDeleteEvents=async(id)=>{


        const token=sessionStorage.getItem('token')

        const header={
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }

        const result=await deleteEvent(id,header)
        console.log(result);
        if (result.status==200) {

            toast.success("Event Deleted SuccessFully..!!")
            getAllEvents()
        }else{
            console.log(result);
            toast.error(result.response.data)
        }


    }

    const handleDeleteCompany=async(id)=>{

        const token = sessionStorage.getItem("token")

        const header={
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }

          const result= await deleteCompany(id,header)

          if (result.status==200) {
            
             toast.success("Company Deleted Successfully..!!")
          }else{
            toast.error(result.response.data)
          }
  

    }

    return (

        <>

            <div >
                <h2 className='text-center aline-items-center text-dark' >Events</h2>
                {

                    events.length > 0 ?
                        events.map(items => (
                            <Table striped bordered hover >

                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Event Name</th>
                                        <th>Event Type</th>
                                        <th>Location</th>
                                        <th>Event Time</th>
                                        <th>Ticket prize</th>
                                        <th>Images</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{items._id}</td>
                                        <td>{items.etitle}</td>
                                        <td>{items.etype}</td>
                                        <td>{items.elocation}</td>
                                        <td>{items.etime}</td>
                                        <td>{items.eticket}</td>
                                        <td>{items.eimage}</td>
                                        <td><Edit event={items}/></td>
                                        <td><button onClick={()=>{handleDeleteEvents(items?._id)}} className='btn btn-outline'><i className="fa-solid fa-trash" style={{ color: '#ff0000' }}></i></button></td>

                                    </tr>

                                </tbody>

                            </Table>
                        )) :
                        <h1>No events Availabl</h1>
                }





            </div>

            <div>
                <h2 className='text-center aline-items-center text-dark' >Event Management Companies</h2>


                {

                    company.length > 0 ?
                        company.map(item => (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Company Name</th>
                                        <th>Company Details</th>
                                        <th>Location</th>
                                        <th>Rating</th>
                                        <th>Web link</th>
                                        <th>image</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item._id}</td>
                                        <td>{item.ctitle}</td>
                                        <td>{item.cdescription}</td>
                                        <td>{item.clocation}</td>
                                        <td>{item.ccontact}</td>
                                        <td>{item.clink}</td>
                                        <td>{item.cimage}</td>
                                        <td><Edit company={item}/></td>
                                        <td><button onClick={()=>{handleDeleteCompany(item?._id)}} className='btn btn-outline'><i className="fa-solid fa-trash" style={{ color: '#ff0000' }}></i></button></td>

                                    </tr>

                                </tbody>
                            </Table>


                        )) :

                        <h3>No Companies Available</h3>


                }

             
            </div>



        </>


    )
}

export default Update