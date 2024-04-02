import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SpecialtyModal = ({ show, handleClose, handleSave,specialtyName,description, handleChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{specialtyName ? 'Edit' : 'Add'} Specialty</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="specialtyName">
                        <Form.Label>Specialty Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={specialtyName}
                            onChange={handleChange}
                            name="specialtyName"
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={handleChange}
                            name="description"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SpecialtyModal;
