/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Col,
  ModalBody,
  Modal,
  Button,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

export default function Photo({ photo }) {
  const [modal, setModal] = useState(false);
  const [openedPhoto, openPhoto] = useState();
  const toggle = (imageUrl) => {
    setModal(!modal);
    openPhoto(imageUrl);
  };
  return (
    <>
      <Col xs="6" sm="4" md="3">
        <Card className="photo-card">
          <CardImg
            alt="Card image caption"
            src={photo.thumbnailUrl}
            top
            width="100%"
            onClick={() => {
              toggle(photo.thumbnailUrl);
            }}
            className="card-image"
          />
          <CardBody>
            <CardTitle tag="h5">{photo.title}</CardTitle>
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={modal} toggle={toggle} className="bg-secondary">
        <ModalHeader toggle={toggle} />
        <ModalBody width="100%" className="modal-body">
          <img
            src={openedPhoto}
            alt="openedImage"
            className="modal-image"
            width="80%"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="mx-auto"
            color="danger"
            onClick={() => {
              toggle(photo.thumbnailUrl);
            }}
          >
            Cancel
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
}
