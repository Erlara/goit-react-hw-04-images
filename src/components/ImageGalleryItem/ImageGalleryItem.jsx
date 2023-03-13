import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <Item>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
