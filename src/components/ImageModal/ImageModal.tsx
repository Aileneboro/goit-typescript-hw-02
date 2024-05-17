import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { Image } from "../../Types";

Modal.setAppElement("#root");

type ImageModalProps = {
  closeModal: () => void;
  modalIsOpen: boolean;
  image: Image;
};

const ImageModal: React.FC<ImageModalProps> = ({
  closeModal,
  modalIsOpen,
  image,
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
            src={image.urls.regular}
            alt={image.alt_description}
          />
        </div>
        <div className={css.modalText}>
          <p>{image.description}</p>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
