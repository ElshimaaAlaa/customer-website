import "./Modal.scss";
import { useEffect } from "react";

function SuccessModal({ isOpen, children, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modalContent modal-width rounded" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;