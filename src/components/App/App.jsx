import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import fetchApi from "../../api";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  const handleSearch = async (topic) => {
    setQuery(topic);
    setPage(1);
    setImages([]);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchApi(topic, 1);
      if (data.results.length === 0) {
        setError("Sorry... there are no images for your search!");
      } else {
        setImages(data.results);
        setShowBtn(data.total_pages && data.total_pages !== 1);
      }
    } catch (error) {
      setError("Whoops... something went wrong");
    }

    setLoading(false);
  };

  const loadMoreImages = async () => {
    setPage(page + 1);
    setLoading(true);

    try {
      const data = await fetchApi(query, page + 1);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setShowBtn(data.total_pages && data.total_pages !== page + 1);
    } catch (error) {
      setError("Whoops... something went wrong");
    }

    setLoading(false);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!query) return;
    handleSearch(query);
  }, [query]);

  return (
    <div>
      <h1>Images Gallery</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <div>
          <ImageGallery images={images} onClick={openModal} />
          <LoadMoreBtn onClick={loadMoreImages} show={showBtn} />
        </div>
      )}
      {modalIsOpen && selectedImage && (
        <ImageModal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          imageSrc={selectedImage.urls.regular}
          imageAltDescription={selectedImage.alt_description}
          imageDescription={selectedImage.description}
          imageAuthor={selectedImage.user.name}
          imageLikes={selectedImage.likes}
        />
      )}
    </div>
  );
};

export default App;
