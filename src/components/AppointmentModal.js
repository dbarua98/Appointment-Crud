import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AppointmentModal = ({ show, handleClose, handleSave, appointment }) => {
    const [itemName, setItemName] = useState('');
    const [gender, setGender] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [education, setEducation] = useState('');

    // Set the initial values when editing appointment
    useEffect(() => {
        if (appointment) {
            setItemName(appointment.itemName);
            setGender(appointment.gender);
            setDoctorName(appointment.doctorName);
            setSpecialty(appointment.specialty);
            setEducation(appointment.education);
        }
    }, [appointment]);

    const handleSaveAppointment = () => {
        const appointmentData = {
            itemName,
            gender,
            doctorName,
            specialty,
            education
        };
        handleSave(appointmentData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{appointment ? 'Edit' : 'Add'} Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="itemName">
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </Form.Control>
                    </Form.Group>
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
                <Button variant="primary" onClick={handleSaveAppointment}>{appointment ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentModal;
