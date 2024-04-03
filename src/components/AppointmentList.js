import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import AppointmentModal from './AppointmentModal';

const AppointmentList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            itemName: 'John Doe',
            gender: 'male',
            doctorName: 'Dr. Smith',
            specialty: 'Cardiology',
            education: 'MD'
        },
        {
            id: 2,
            itemName: 'Jane Doe',
            gender: 'female',
            doctorName: 'Dr. Johnson',
            specialty: 'Dermatology',
            education: 'MD'
        }
    ]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleAddClick = () => {
        setSelectedAppointment(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleSaveAppointment = (appointmentData) => {
        if (selectedAppointment) {
            // Update existing appointment
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.id === selectedAppointment.id) {
                    return { ...appointment, ...appointmentData };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);
        } else {
            // Add new appointment
            const newAppointment = {
                id: appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1,
                ...appointmentData
            };
            setAppointments([...appointments, newAppointment]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteAppointment = (appointmentId) => {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
    };

    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Appointment List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Doctor Name</th>
                        <th>Specialty</th>
                        <th>Education</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                            <td>{index + 1}</td>
                            <td>{appointment.itemName}</td>
                            <td>{appointment.gender}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.specialty}</td>
                            <td>{appointment.education}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEditClick(appointment)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <AppointmentModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSaveAppointment}
                appointment={selectedAppointment}
            />
        </div>
    );
};

export default AppointmentList;
