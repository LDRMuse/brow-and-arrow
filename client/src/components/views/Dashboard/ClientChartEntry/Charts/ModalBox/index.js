import PropTypes from "prop-types";
import React, { useState } from "react";

import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "./Modal.scss";

Modal.setAppElement(document.getElementById("root"));

export const ModalBox = ({ image }) => {
  const [modalActive, setModalActive] = useState(false);

  const handleClick = () => {
    setModalActive((prev) => !prev);
  };

  return (
    <div>
      <button className="button is-small" onClick={handleClick}>
        View Photos
      </button>
      <Modal isOpen={modalActive} contentLabel="view photo">
        <div className="close-icon">
          <FontAwesomeIcon
            icon={faWindowClose}
            className="has-text-warning-dark"
            onClick={handleClick}
            size="2x"
          />
        </div>
        <div className="control">
          <figure>
            <img
              className="image is-256x256"
              src={image}
              alt="Current Client"
            />
          </figure>
        </div>
      </Modal>
    </div>
  );
};

ModalBox.propTypes = {
  image: PropTypes.string,
};
