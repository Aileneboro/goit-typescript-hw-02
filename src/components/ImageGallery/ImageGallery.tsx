import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../../Types";

type ImageGalleryProps = {
  images: Image[];
  onClick: (image: Image) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li className={css.galleryItem} key={image.id}>
          <ImageCard image={image} onClick={() => onClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
