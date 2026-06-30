import React from "react";

const ConfirmModel = ({ open, title, message, onConfirm, onCancel }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="confirm-modal card">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-modal-actions">
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Delete
                    </button>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModel;
const ConfirmModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) => {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-actions">

                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmModal;