import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from "../components/Navigationbar"

const About = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token') == null){
            navigate("/login");
        }
        },[]);
    return (
        <>
        <Navbar/>
        <Fragment>
            <div style={{width:"60%",marginLeft:"270px"}} id="about" className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                        <h1>About Company Page</h1><br />
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <br/><Button style={{backgroundColor:"black",border:"3px solid white",color:"white",fontSize:"18px",borderRadius:"8px",paddingBottom:"10px"}} onClick={()=>{navigate("/contact");}}>Contact Us</Button>
                    </div>
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-signal logo"></span>
                    </div>
                </div>
            </div>

            <div style={{marginTop:"2%",width:"60%",marginLeft:"270px"}} className="container-fluid bg-grey">
                <div className="row">
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-globe logo slideanim"></span>
                    </div>
                    <div className="col-sm-8">
                        <h1>Our Values</h1>
                        <h4><strong>MISSION:</strong> Our mission lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4>
                        <p><strong>VISION:</strong> Our vision Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    </>
    )
};

export default About;