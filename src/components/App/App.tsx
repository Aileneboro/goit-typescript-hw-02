import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import fetchApi from "../../api";
import { ApiResponse, Image } from "../../Types";

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  const handleSearch = async (topic: string) => {
    setQuery(topic);
    setPage(1);
    setLoading(true);
    setError(null);

    try {
      const data: ApiResponse = await fetchApi(topic, 1);
      if (data.results.length === 0) {
        setError("Sorry... there are no images for your search!");
      } else {
        setImages(data.results);
        setShowBtn(data.total_pages > 1);
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
      const data: ApiResponse = await fetchApi(query, page + 1);
      setImages((prevImages: Image[]) => [...prevImages, ...data.results]);
      setShowBtn(data.total_pages > 1);
    } catch (error) {
      setError("Whoops... something went wrong");
    }

    setLoading(false);
  };

  const openModal = (image: Image) => {
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
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
