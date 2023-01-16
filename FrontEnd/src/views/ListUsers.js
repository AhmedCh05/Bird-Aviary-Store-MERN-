import React from "react";
import axios from "axios";
import User from "./Users";
import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import {faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";



function ListUsers() {
  const history = useHistory();
  const [response,setResponse] = useState();
  useEffect(()=>{
  axios.get("http://localhost:3000/allUsers").then((res)=>
  {
    setResponse(res.data);
  }
  )
  });
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <Card.Title as="h4">List of Users</Card.Title>
                <FontAwesomeIcon title = "Add User" style={{textAlign:"right",fontSize:"20px"}} icon={faUserPlus} onClick={()=>{history.push("/admin/adduser")}}/>
                </div>
                <p className="card-category">
                  ALL USERS REGISTERED
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                  <tr style={{border:"2px solid black"}}>
                    <th className="border-0">Fname</th>
                    <th className="border-0">Lname</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">PhoneNo</th>
                  </tr>
                  </thead>
                  <tbody>
                    <>
                    {response?.map((i)=>{
                      return(
                        <>
                        <User obj = {i}>

                        </User>
                        </>
                      )
                    }
                    
                    )}
                    </>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListUsers;
