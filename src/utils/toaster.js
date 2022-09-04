import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = {
    error: (mess, closeTime) => toast.error(mess, {autoClose: closeTime || 2000}),
    info: (mess, closeTime) => toast.info(mess, {autoClose: closeTime || 2000}),
    success: (mess, closeTime) => toast.success(mess, {autoClose: closeTime || 2000})

}

export default Toaster;