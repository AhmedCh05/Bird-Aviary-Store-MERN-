import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faUserPen,faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core' // <-- import styles to be used


function Users({obj}){
    const id = obj._id;
    const history = useHistory();
    function DeleteUser({id}){  
        axios.delete("http://localhost:3000/User/"+id).then(function (response) {
            toast.success("User Deleted",{position: "top-right",
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
            <td>{obj.fname}</td>
            <td>{obj.lname}</td>
            <td>{obj.email}</td>
            <td>{obj.phoneno}</td>
            <td><FontAwesomeIcon title ="Show User Details" style={{fontSize:"20px"}} icon={faUserPen} onClick={()=>{history.push("/admin/user/"+id)}} /></td>
            <td><FontAwesomeIcon title ="Delete User" style={{color:"red",fontSize:"20px"}} icon={faUserXmark} onClick={()=>{DeleteUser({id})}} /></td>
        </tr>
        <ToastContainer/>
        </>
    )
}

export default Users;