import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import styles from '../styles/carousel.css';
import PhotoCollage from './photoCollage';
import Modal from './modal';


class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      displayModal: false,
      clickedIdx: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClickedImage = this.handleClickedImage.bind(this);
    this.handleModalNextButton = this.handleModalNextButton.bind(this);
    this.handleModalPreviousButton = this.handleModalPreviousButton.bind(this);
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    const reqId = Number(window.location.pathname.split('/')[1]);
    let id = _.random(1, 100);
    if (reqId > 0 && reqId <= 100) {
      id = reqId;
    }
    $.ajax({
      url: `/photosandcomments/${id}`,
      method: 'GET',
      contentType: 'application/json',
      error: (err) => {
        console.log('GET ERR: ', err);
      },
      success: (data) => {
        // console.log(data);
        this.setState({ data });
      },
    });
  }

  toggleModal() {
    const { displayModal: display } = this.state;
    this.setState({
      displayModal: !display,
    });
  }

  handleClickedImage(clickedIndex, callback) {
    this.setState({
      clickedIdx: clickedIndex,
    }, callback);
  }

  handleModalNextButton() {
    let { clickedIdx: idx } = this.state;
    const { data: dataArr } = this.state;
    if (String(idx) === String(dataArr.photosAndComments.length - 1)) {
      this.setState({
        clickedIdx: 0,
      });
    } else {
      this.setState({
        clickedIdx: idx += 1,
      });
    }
  }

  handleModalPreviousButton() {
    let { clickedIdx: idx } = this.state;
    const { data: dataArr } = this.state;
    if (String(idx) === String(0)) {
      this.setState({
        clickedIdx: dataArr.photosAndComments.length - 1,
      });
    } else {
      this.setState({
        clickedIdx: idx -= 1,
      });
    }
  }

  render() {
    const { data, displayModal, clickedIdx } = this.state;
    if (!data) {
      return (
        <div className={styles.loading}>Loading...</div>
      );
    }
    return (
      <div>
        <PhotoCollage
          dataArr={data}
          toggleModal={this.toggleModal}
          handleClickedImage={this.handleClickedImage}
        />
        <Modal
          dataArr={data}
          toggleModal={this.toggleModal}
          displayModal={displayModal}
          clickedIdx={clickedIdx}
          handleModalNextButton={this.handleModalNextButton}
          handleModalPreviousButton={this.handleModalPreviousButton}
        />
      </div>
    );
  }
}


export default Carousel;
