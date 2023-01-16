import React, { Fragment, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navigationbar";

const FAQ = () => {
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
                    <div style={{padding:"10px",marginLeft:"10px",marginRight:"10px"}} className="col-sm-8">
                        <br/><h2>Frequently Asked Questions</h2><br />
                        <h4>How do I place an ad on "Exotic Birds" ?</h4>
                        <p>It's very easy to place an ad: click on the button "Post free Ads" above right.</p><br/>
                        <h4>What does it cost to advertise?</h4>
                        <p>The publication is 100% free throughout the website.</p><br/>
                        <h4>If I post an ad, will I also get more spam e-mails?</h4>
                        <p>Absolutely not because your email address is not visible on the website.</p><br/>
                        <h4>How long will my ad remain on the website?</h4>
                        <p>In general, an ad is automatically deactivated from the website after 2 month. You will receive an email a week before D-Day and another on the day of deactivation. You have the ability to put them online in the following month by logging into your account on the site. After this delay, your ad will be automatically removed permanently from the website.</p><br/>
                    </div>
                </div>
                        <h3 style={{color:"#00CC33"}}>STILL UNANSWERED QUESTION</h3>
                        <Button style={{backgroundColor:"#3399CC",fontSize:"18px",borderRadius:"8px"}} onClick={()=>{navigate("/postquestion")}} >Post A Question</Button>{''}
            </div>
        </Fragment>
        </>
    )
};

export default FAQ;