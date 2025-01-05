import { useState, useEffect } from 'react';

import { Bars } from 'react-loader-spinner';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

import { fetchImagesByTitle } from './services/api';

import styles from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchImagesByTitle(query, page);
        const data = response.data.results;
        if (page === 1) {
          setImages(data);
        } else {
          setImages((prevState) => {
            return [...prevState, ...data];
          });
        }
        setTotalPage(response.data.total_pages);
      } catch (error) {
        setError((prevState) => {
          return {
            ...prevState,
            errorMessage: error.message,
            isError: true,
          };
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  function onSearchHandler(searchValue) {
    setQuery(searchValue);
    setPage(1);
  }

  function onLoadMoreHandler() {
    setPage(page + 1);
  }

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function modalDataHandler(data) {
    setModalData(data);
  }

  return (
    <>
      <SearchBar onSearch={onSearchHandler} />
      {error.isError ? (
        <p className={styles.error}>{error.errorMessage}</p>
      ) : (
        <ImageGallery images={images} onModalData={modalDataHandler} onOpenModal={openModalHandler} />
      )}
      {loading && (
        <div className={styles.barsWrapper}>
          <Bars
            height='80'
            width='80'
            color='#4fa94d'
            ariaLabel='bars-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
      {images.length > 0 && page < totalPage && !error.isError && <LoadMoreBtn onLoadMore={onLoadMoreHandler} />}
      <ImageModal modalIsOpen={modalIsOpen} onCloseModal={closeModalHandler} modalData={modalData} />
    </>
  );
}

export default App;