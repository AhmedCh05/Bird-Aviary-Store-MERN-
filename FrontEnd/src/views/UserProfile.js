import React from "react";
import { useState,useEffect } from "react";
import { useParams,useHistory } from "react-router";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Badge,Button,Card,Form,Navbar,Nav,Container,Row,Col} from "react-bootstrap";
import {faArrowLeft,faUpload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core' // <-- import styles to be used

function User({id}) {
  
  const history = useHistory();
  const params = useParams();
  const userid = params.id;
  const [response,setResponse] = useState("");
  const [state,setState] = useState(null);
  const [imagePresent,setImagePresent] = useState("1.jpg");
  console.log(imagePresent)

  useEffect(()=>{
  axios.get("http://localhost:3000/User/"+(params.id)).then((res)=>
  {
    setResponse(res.data);
  })
  },[]);
  
  const handleFileSelect = (event) => {
    setState(event.target.files[0]);
  }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("upload", state);
      const response =await axios.post("http://localhost:3000/User/profileicon/"+userid,formData).then((res)=>{
        setTimeout(() => {
          setImagePresent(`${userid}.jpg`);
        }, 3000);
        toast.success("File Uploaded Successfully", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }).catch((error)=>{
        toast.error("Not Uploaded Successfully", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error.message);})
  }
    
  // function UpdateUser(event) {
  //   event.preventDefault();
  //   const data = {"_id":event.target[0].value,"fname":event.target[1].value,"lname":event.target[2].value,"email":event.target[3].value,"phoneno":event.target[4].value};
  //   console.log(data);
  //     axios.put("http://localhost:3000/User/"+(params.id),data)
	// 		.then(function (response) {
  //       setResponse(data);
  //       toast.success("User Updated", {
	// 				position: "top-right",
	// 				autoClose: 8000,
	// 				hideProgressBar: false,
	// 				closeOnClick: true,
	// 				pauseOnHover: true,
	// 				draggable: true,
	// 				progress: undefined,
	// 				theme: "dark",
	// 			});
	// 		});
  //}


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Row style={{display:"flex",flexDirection:"row",margin:"5px"}}>
                <FontAwesomeIcon style={{fontSize:"35px",marginRight:"15px"}} icon={faArrowLeft} onClick={()=>{history.push("/admin/allusers")}} Back To All Users/>
                <Card.Title as="h4">Profile Page</Card.Title>
                </Row>
              </Card.Header>
              <Card.Body>
                <Form /*onSubmit={UpdateUser}*/>
                  <Row>
                    <Col className="pr-1" md="7">
                      <Form.Group>
                        <label>User ID</label>
                        <Form.Control
                          value = {response._id}
                          disabled
                          placeholder="User ID"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          value = {response.fname}
                          placeholder="First Name"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          value = {response.lname}
                          placeholder="Last Name"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="7">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                        value = {response.email}
                        placeholder="Email"
                        type="email"
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Phone No</label>
                        <Form.Control
                          value = {response.phoneno}
                          placeholder="Cell No"
                          type="tel"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user" style={{textAlign:"center"}}>
              <Card.Body>
                <div>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      src = {require(`../displayPictures/${imagePresent}`)}
                      style={{height:"120px",width:"120px",borderRadius:"200%"}}
                    ></img>
                    <h5 style={{paddingTop:"10px"}} className="title">{response.fname} {response.lname}</h5>
                  </a>
                  <p className="description">{response.email}</p>
                  <div>
                  <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <input style={{padding:"10px",fontSize:"12px"}} name="upload" type="file" onChange={handleFileSelect}/>
                    <input style={{fontSize:"12px"}}type="submit" value="Submit" />
                  </form>                  
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default User;
