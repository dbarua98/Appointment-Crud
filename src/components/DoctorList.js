import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DoctorModal from './DoctorModal';

const DoctorList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([
        { id: 1, doctorName: 'Dr. John Doe', specialty: 'Cardiology', education: 'MD, PhD' },
        { id: 2, doctorName: 'Dr. Jane Smith', specialty: 'Dermatology', education: 'MD' },
        { id: 3, doctorName: 'Dr. David Johnson', specialty: 'Endocrinology', education: 'MD, MBBS' },
    ]);

    const handleAddClick = () => {
        setSelectedDoctor(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDoctor = (doctorData) => {
        if (selectedDoctor) {
            // Update existing doctor
            const updatedDoctors = doctors.map(doctor => {
                if (doctor.id === selectedDoctor.id) {
                    return { ...doctor, ...doctorData };
                }
                return doctor;
            });
            setDoctors(updatedDoctors);
        } else {
            // Add new doctor
            const newDoctor = { id: Date.now(), ...doctorData };
            setDoctors([...doctors, newDoctor]);
        }
        setIsModalOpen(false);
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleDeleteDoctor = (doctorId) => {
        const updatedDoctors = doctors.filter(doctor => doctor.id !== doctorId);
        setDoctors(updatedDoctors);
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Doctor List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>

            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Doctor Name</th>
                        <th>Specialty</th>
                        <th>Education</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={doctor.id}>
                            <td>{index + 1}</td>
                            <td>{doctor.doctorName}</td>
                            <td>{doctor.specialty}</td>
                            <td>{doctor.education}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEditDoctor(doctor)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DoctorModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSaveDoctor}
                doctor={selectedDoctor}
            />
        </div>
    );
};

export default DoctorList;
