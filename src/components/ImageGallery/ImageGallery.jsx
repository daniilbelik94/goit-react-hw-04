import ImageCard from '../ImageCard/ImageCard';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onModalData, modalData, onOpenModal }) => {
  return (
    <ul className={styles.galleryList}>
      {images.length > 0 &&
        images.map((image) => (
          <ImageCard
            key={image.id}
            onModalData={onModalData}
            modalData={modalData}
            onOpenModal={onOpenModal}
            altDescr={image.alt_description}
            urlSmall={image.urls.small}
            urlRegular={image.urls.regular}
            dateCreated={image.created_at}
            like={image.likes}
          />
        ))}
    </ul>
  );
};

export default ImageGallery;