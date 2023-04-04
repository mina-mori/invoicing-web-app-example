import './Modal.scss';

const Modal = (props: {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='modal-close' onClick={props.onClose}>
          X
        </button>
        <div className='modal-content'>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
