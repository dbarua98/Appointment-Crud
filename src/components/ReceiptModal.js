// ReceiptModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReceiptModal = ({ show, handleClose, handleSave, receipt }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [items, setItems] = useState(receipt ? receipt.billItems : []);

    useEffect(() => {
        if (receipt && receipt.totalDiscountAmount !== undefined) {
            const calculateTotalAmount = () => {
                const total = items.reduce((total, row) => total + row.amount, 0);
                setTotalAmount(total);
                setNetAmount(total - parseFloat(receipt.totalDiscountAmount));
            };
            calculateTotalAmount();
        }
    }, [receipt, items]);

    const handleRowChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleAddRow = () => {
        setItems([...items, { descr: '', rate: 0, qty: 0, amount: 0 }]);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formReceiptNo">
                        <Form.Label>Receipt No</Form.Label>
                        <Form.Control type="text" readOnly value={receipt ? receipt.billNumber : ''} />
                    </Form.Group>
                    <Form.Group controlId="formReceiptDate">
                        <Form.Label>Receipt Date</Form.Label>
                        {/* <DatePicker
                            selected={receipt ? new Date(receipt.billDate) : new Date()}
                            onChange={(date) => handleSave({ ...receipt, billDate: date.toLocaleDateString('en-CA') })}
                        /> */}
                    </Form.Group>
                    <Form.Group controlId="formPersonName">
                        <Form.Label>Person Name</Form.Label>
                        <Form.Control type="text" value={receipt ? receipt.personName : ''} onChange={(e) => handleSave({ ...receipt, personName: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formTotalQty">
                        <Form.Label>Total Qty</Form.Label>
                        <Form.Control type="number" value={receipt ? receipt.totalQty : 0} onChange={(e) => handleSave({ ...receipt, totalQty: parseInt(e.target.value) })} />
                    </Form.Group>
                    <Form.Group controlId="formNetAmount">
                        <Form.Label>Net Amount</Form.Label>
                        <Form.Control type="number" value={receipt ? receipt.netAmount : 0} onChange={(e) => handleSave({ ...receipt, netAmount: parseFloat(e.target.value) })} />
                    </Form.Group>
                    <Form.Group controlId="formRemarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control type="text" value={receipt ? receipt.remarks : ''} onChange={(e) => handleSave({ ...receipt, remarks: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formItems">
                        <Form.Label>Items</Form.Label>
                        {items.map((item, index) => (
                            <Row key={index}>
                                <Col>
                                    <Form.Control type="text" placeholder="Description" value={item.descr} onChange={(e) => handleRowChange(index, 'descr', e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleRowChange(index, 'rate', parseFloat(e.target.value))} />
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder="Qty" value={item.qty} onChange={(e) => handleRowChange(index, 'qty', parseInt(e.target.value))} />
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder="Amount" value={item.amount} onChange={(e) => handleRowChange(index, 'amount', parseFloat(e.target.value))} />
                                </Col>
                            </Row>
                        ))}
                        <Button variant="primary" onClick={handleAddRow}>
                            Add Item
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(receipt)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReceiptModal;
