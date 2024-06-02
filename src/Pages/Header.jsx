import React,{useEffect,useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function Header() {

  const [token ,setToken]=useState("")

  const navigate=useNavigate()


  useEffect(()=>{

    setToken(sessionStorage.getItem("token"))

  },[])

  const handleLogout=()=>{


    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigate('/')

  }
  


  return (
    <>

    


      <div className=''>

        <Navbar className="bg-primary">
          <Container >
            <Navbar.Brand href="#home">
             
                <div className='d-flex '>

                  <div className='mt-2'>
                    <img
                      alt=""
                      src="https://seeklogo.com/images/G/gucci-logo-0D90EEB760-seeklogo.com.png"
                      width="50"
                      height="50"
                      className="d-inline-block align-top"
                    />{' '}
                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    <h3  style={{ fontSize: '50px' }}>G<span className='text-white' style={{ fontSize: '40px' }}>rand</span>G<span className='text-white' style={{ fontSize: '40px' }}>athering</span></h3>

                  </div>

                </div>
               


            </Navbar.Brand>

            {

              token &&

            <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                      <Button onClick={handleLogout} className='btn btn-outline-danger'> <i className="fa-solid fa-right-from-bracket" style={{color: "#ff0505"}}></i> LogOut  </Button>
                    </Nav.Item>
                    
                    
            </Nav>
            }
          </Container>
        </Navbar>

      </div>


          

    </>
  )
}

export default Header