import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import {faClipboardList,faRectangleList,faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core' // <-- import styles to be used



function ListProducts({ obj }) {
    const id = obj._id;
    const [show, setShow] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const history = useHistory();
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        return setShow(true);
    };
    function DeleteProduct({id}){ 
      axios.delete("http://localhost:3000/Product/"+id).then(function (response) {
        toast.success("Product Deleted",{position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",});
      });
    setDeleted(!deleted)
  }

	
    return (
		<>
			<tr style={{border:"2px solid black"}}>
				<td>{obj.title}</td>
				<td>{obj.price}</td>
				<td>{obj.quantity}</td>
				<td>{obj.category}</td>
				<td> {obj.description.slice(0, 30) } ...</td>
        <FontAwesomeIcon title="Show Description" style={{fontSize:"20px",paddingTop:"12px"}} icon={faClipboardList} onClick={handleShow}/>
        <FontAwesomeIcon title="Show Product Details" style={{fontSize:"20px",paddingLeft:"40px"}} icon={faRectangleList} onClick={()=>{history.push("/admin/product/"+id)}} />
        <td><FontAwesomeIcon title ="Delete Product" style={{color:"red",fontSize:"20px",marginRight:"20px"}} icon={faTrash} onClick={()=>{DeleteProduct({id}); setDeleted(`${id}`)}} /></td>
        </tr>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{paddingLeft:"8px",fontWeight:"bolder"}}>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"50px",paddingTop:"10px"}}>{obj.description}</Modal.Body>
      </Modal>

      <ToastContainer/>   
		</>
	);
}
export default ListProducts;
