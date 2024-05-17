import css from "./ImageCard.module.css";
import { Image } from "../../Types";

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div>
      <img
        onClick={onClick}
        className={css.galleryImage}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
