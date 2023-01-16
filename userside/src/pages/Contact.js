import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navigationbar';

const Contact = () => {
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
				<div
					style={{width: "60%", marginLeft: "270px" }}
					id="about"
					className="container-fluid">
					<div className="row">
						<div
							style={{
								padding: "10px",
								marginLeft: "10px",
								marginRight: "10px",
							}}
							className="col-sm-8">
							<br />
							<h1>Contact Us</h1>
							<br />
							<div>
								<h2>Email</h2>
								<p style={{ fontSize: "20px" }}>
									bird.enclave@gmail.com
								</p>
								<br />
							</div>
							<div>
								<h2>Phone Number</h2>
								<p style={{ fontSize: "20px" }}>001278965456</p>
								<br />
							</div>
							<div>
								<h2>Address</h2>
								<p style={{ fontSize: "20px" }}>
									2868 Cliffside Drive,New York
								</p>
								<br />
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		</>
	);
};

export default Contact;