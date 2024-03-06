// ModalComponent.js
import React from 'react';

const ModalComponent = ({ message, onClose }) => {
  return (
    <div className="flex justify-center bg-slate-200 h-12">
      <p className="p-3 text-red-500 font-extrabold">{message}</p>
      <button className="m-3 bg-red-400 rounded-xl h-7 w-5 text-black" onClick={onClose}>X</button>
    </div>
  );
};

export default ModalComponent;

// position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
// backgroundColor: 'black', padding: '20px', zIndex: 1000,
// border: '1px solid #ccc', borderRadius: '5px',