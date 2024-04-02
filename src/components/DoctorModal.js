import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DoctorModal = ({ show, handleClose, handleSave, doctor }) => {
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [education, setEducation] = useState('');

    useEffect(() => {
        if (doctor) {
            setDoctorName(doctor.doctorName);
            setSpecialty(doctor.specialty);
            setEducation(doctor.education);
        }
    }, [doctor]);

    const handleSaveDoctor = () => {
        handleSave({
            doctorName,
            specialty,
            education
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{doctor ? 'Edit' : 'Add'} Doctor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="doctorName">
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="specialty">
                        <Form.Label>Specialty</Form.Label>
                        <Form.Control as="select" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                            <option value="">Select Specialty</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Endocrinology">Endocrinology</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="education">
                        <Form.Label>Education</Form.Label>
                        <Form.Control type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveDoctor}>{doctor ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DoctorModal;
