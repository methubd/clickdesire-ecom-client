import React from 'react';

const Modal = ({ showModal, closeModal }) => {
    return (
        <dialog open={showModal} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <button className="btn btn-sm" onClick={closeModal}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
