import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userRegister } from '../Services/allApies';
import { userLogin } from '../Services/allApies';
import { useNavigate } from 'react-router-dom';



function Auth() {

    const [status, setStatus] = useState(true)
    const [data, setData] = useState({
        fulname: "", username: "", email: "", password: ""
    })

    const navigate = useNavigate()
    const handleRegister = async () => {

        const { fulname, username, email, password } = data

        console.log(data);

        if (!fulname || !username || !email || !password) {

            toast.warning("Plaease fill the field properly");

        } else {

            const result = await userRegister(data)

            console.log(result);

            if (result.status == 201) {
                toast.success("User Registration Successfully..!")
                setData({
                    fulname: "", username: "", email: "", password: ""
                })
                setStatus(true)

            } else {
                toast.error(result.response.data)
            }

        }

    }


    const handleLogin = async () => {
        const { email, password } = data


        if (!email || !password) {

            toast.warning("Plaease fill the field properly");


        } else {

            const result = await userLogin({ email, password })

            console.log(result);

            if (result.status == 200) {
              

                if (email == "admin@123" || password == "123") {

                    sessionStorage.setItem("token", result.data.token)
                    sessionStorage.setItem("username", result.data.user)

                    toast.success("Admin Login Successfull")
                    navigate('/admin')


                } else {

                    sessionStorage.setItem("token", result.data.token)
                    sessionStorage.setItem("username", result.data.user)
                    toast.success("Login Successfull")
                    navigate('/dash')



                }
            }else{

                toast.error(result.response.data)
            }




        }
    }




    const changeStatus = () => {
        setStatus(!status)
    }
    


    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100  ' style={{ height: '100vh', backgroundImage:`url("https://wallpapercave.com/wp/wp7488230.jpg")` }}>
                <div className='shadow border  w-50 p-4  ' >
                    <Row className='' >
                        <Col sm={12} md={6} style={{ marginTop: '50px' }} >




                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-with-google-11638621-9472343.png" alt="" className='img-fluid' />
                        </Col>
                        <Col sm={12} md={6} className=''>

                            {
                                status ?
                                    <h3 className='text-dark'>Login</h3>
                                    :
                                    <h3 className='text-dark'>Register</h3>
                            }


                            <div className='mt-4 '>

                                {
                                    !status &&
                                    <>
                                        <FloatingLabel controlId="floatingName" style={{color:'dark'}} label="Fullname" className="mb-3">
                                            <Form.Control  onChange={(e) => { setData({ ...data, fulname: e.target.value }) }} type="text" placeholder="FullName" />
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingUser" style={{color:'dark'}} label="Username" className="mb-3">
                                            <Form.Control  onChange={(e) => { setData({ ...data, username: e.target.value }) }} type="text" placeholder="username" />
                                        </FloatingLabel>

                                    </>
                                }

                                <FloatingLabel controlId="floatingInput" style={{color:'dark'}} label="Email address" className="mb-3">
                                    <Form.Control  onChange={(e) => { setData({ ...data, email: e.target.value }) }} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" style={{color:'dark'}} label="Password">
                                    <Form.Control  onChange={(e) => { setData({ ...data, password: e.target.value }) }} type="password" placeholder="Password" />
                                </FloatingLabel>

                            </div>

                            <div className='mt-3 d-flex justify-content-between'>

                                {
                                    status ?

                                        <button className='btn  btn-info' onClick={handleLogin}>

                                            <span>Login</span>

                                        </button>
                                        :
                                        <button className='btn  btn-info' onClick={handleRegister}  >

                                            <span>Register</span>

                                        </button>


                                }



                                <button className='btn btn-link text-decoration-none' onClick={changeStatus} >
                                    {

                                        status ?

                                            <span className='text-danger'>Are you new?</span>
                                            :
                                            <span className='text-danger'>Already A User?</span>

                                    }

                                </button>

                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default Auth