import { useHistory } from "react-router";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faCircleInfo,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Orders({obj}){
    const id = obj._id;
    const history = useHistory();
    function DeleteOrder({id}){  
        axios.delete("http://localhost:3000/Order/"+id).then(function (response) {
            toast.success("Order Deleted",{position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",});
        })
    }
    return (
        <>
        <tr style={{border:"2px solid black"}}>
            <td>{obj?.productID?.title}</td>
            <td>{obj?.quantity}</td>
            <td>{obj?.address}</td>
            <td>{obj?.phoneno}</td>
            <td>{obj?.status}</td>
            <td>{obj?.userID?.fname} {obj?.userID?.lname}</td>
            <td><FontAwesomeIcon title ="Show Order Details" style={{fontSize:"20px"}} icon={faCircleInfo} onClick={()=>{history.push("/admin/Order/"+id)}} /></td>
            <td><FontAwesomeIcon title ="Delete Order" style={{color:"red",fontSize:"20px"}} icon={faTrash} onClick={()=>{DeleteOrder({id})}} /></td>
        </tr>
        <ToastContainer/>
        </>
    )
}

export default Orders;