// ModalComponent.js
import React from 'react';

const ModalComponent = ({ message, onClose }) => {
  return (
    <div className="flex justify-center bg-red-950 ">
      <p>{message}</p>
      <button className="bg-red-400 rounded-md text-white" onClick={onClose}>X</button>
    </div>
  );
};

export default ModalComponent;

// position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
// backgroundColor: 'black', padding: '20px', zIndex: 1000,
// border: '1px solid #ccc', borderRadius: '5px',