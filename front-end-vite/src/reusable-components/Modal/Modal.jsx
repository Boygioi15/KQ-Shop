import React from 'react';
import './style.css'; // Add your modal styles here
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <ImCancelCircle className='cancel-icon'/>
                <p>{message}</p>
                <button style={{fontSize:"16px", padding: "5px 15px"}}className= " small-font standard-button-1 "onClick={onClose}>OK</button>
            </div>
        </div>
    );
};
const SuccessModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <FaRegCheckCircle className='check-icon'/>
                <p>{message}</p>
                <button style={{fontSize:"16px", padding: "5px 15px"}}className= " small-font standard-button-1 "onClick={onClose}>OK</button>
            </div>
        </div>
    );
};
const NotifyModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <FaExclamationCircle className='check-icon'/>
                <p>{message}</p>
                <button style={{fontSize:"16px", padding: "5px 15px"}}className= " small-font standard-button-1 "onClick={onClose}>OK</button>
            </div>
        </div>
    );
};
export { ErrorModal, SuccessModal, NotifyModal };