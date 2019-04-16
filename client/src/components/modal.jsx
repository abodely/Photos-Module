import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/modal.css';


const Modal = ({
  dataArr, toggleModal, displayModal, clickedIdx, handleModalNextButton, handleModalPreviousButton,
}) => {
  if (displayModal) {
    return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalImage}>
            <button className={styles.previousButton} onClick={handleModalPreviousButton} type="button">&#10094;</button>
            <img src={dataArr.photosAndComments[clickedIdx].imageUrl} alt="host home" />
            <button className={styles.nextButton} onClick={handleModalNextButton} type="button">&#10095;</button>
          </div>
          <div className={styles.modalComment}>
            <span>
              {clickedIdx + 1}
              /
              {dataArr.photosAndComments.length}
              {': '}
              {dataArr.photosAndComments[clickedIdx].comment}
            </span>
          </div>
        </div>
        <div className={styles.modalGallery}>
          {dataArr.photosAndComments.map((photoandcomment, idx) => (
            <img name={idx} src={photoandcomment.imageUrl} key={photoandcomment._id} alt="host home" />
          ))}
        </div>
        <button className={styles.closeButton} onClick={toggleModal} type="button">&#10005;</button>
      </div>,
      document.body,
    );
  }
  return null;
};


export default Modal;
