import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ItemModal = ({ show, handleClose, handleSave, item }) => {
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        if (item) {
            setItemName(item.name);
        }
    }, [item]);

    const handleInputChange = (e) => {
        setItemName(e.target.value);
    };

    const handleSaveItem = () => {
        handleSave(itemName);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item ? 'Edit' : 'Add'} Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="itemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" value={itemName} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveItem}>{item ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemModal;
