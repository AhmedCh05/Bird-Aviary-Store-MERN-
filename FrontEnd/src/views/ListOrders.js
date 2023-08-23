import React from "react";
import axios from "axios";
import Order from "./Orders";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";

function ListOrders() {
	const history = useHistory();
	const [response, setResponse] = useState();

	useEffect(() => {
		axios.get("http://localhost:3000/allOrders").then((res) => {
			setResponse(res.data);
		});
	}, []);

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Header>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}>
									<Card.Title as="h4">
										List of Orders
									</Card.Title>
								</div>
								<p className="card-category">
									ALL ORDERS REGISTERED
								</p>
							</Card.Header>
							<Card.Body className="table-full-width table-responsive px-0">
								<Table className="table-hover table-striped">
									<thead>
										<tr
											style={{
												border: "2px solid black",
											}}>
											<th className="border-0">
												Product Name
											</th>
											<th className="border-0">
												Quantity
											</th>
											<th className="border-0">
												Address
											</th>
											<th className="border-0">
												PhoneNo
											</th>
											<th className="border-0">Status</th>
											<th className="border-0">
												User Name
											</th>
										</tr>
									</thead>
									<tbody>
										<>
											{response?.map((i) => {
												return (
													<>
														<Order obj={i}></Order>
													</>
												);
											})}
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

export default ListOrders;
