import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({
  closeModal,
  modalIsOpen,
  imageSrc,
  imageAltDescription,
  imageDescription,
  imageAuthor,
  imageLikes,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.Modal}
      overlayClassName={css.Overlay}
    >
      <div>
        <div>
          <img
            className={css.modalImage}
            src={imageSrc}
            alt={imageAltDescription}
          />
        </div>
        <div className={css.modalText}>
          <p>{imageDescription}</p>
          <p>Author: {imageAuthor}</p>
          <p>Likes: {imageLikes}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
