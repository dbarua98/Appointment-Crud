import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SpecialtyModal from './SpecialtyModal';

const SpecialtyList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specialties, setSpecialties] = useState([
        { id: 1, specialtyName: 'Specialty 1', description: 'Description 1' },
        { id: 2, specialtyName: 'Specialty 2', description: 'Description 2' },
        { id: 3, specialtyName: 'Specialty 3', description: 'Description 3' },
    ]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [specialtyName, setSpecialtyName] = useState('');
    const [description, setDescription] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSpecialty(null);
        setSpecialtyName('');
        setDescription('');
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (selectedSpecialty) {
            // Update existing specialty
            const updatedSpecialties = specialties.map(specialty => {
                if (specialty.id === selectedSpecialty.id) {
                    return { ...specialty, specialtyName, description };
                }
                return specialty;
            });
            setSpecialties(updatedSpecialties);
        } else {
            // Add new specialty
            const newSpecialty = {
                id: Date.now(),
                specialtyName,
                description,
            };
            setSpecialties([...specialties, newSpecialty]);
        }
        handleCloseModal();
    };

    const handleEditClick = (specialty) => {
        setSelectedSpecialty(specialty);
        setSpecialtyName(specialty.specialtyName);
        setDescription(specialty.description);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const updatedSpecialties = specialties.filter(specialty => specialty.id !== id);
        setSpecialties(updatedSpecialties);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'specialtyName') {
            setSpecialtyName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Specialty List</h3>
                <Button variant="primary" onClick={handleAddClick}>
                    Add
                </Button>
            </div>
            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Specialty Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {specialties.map((specialty, index) => (
                        <tr key={specialty.id}>
                            <td>{index + 1}</td>
                            <td>{specialty.specialtyName}</td>
                            <td>{specialty.description}</td>
                            <td className="d-flex">
                                <Button className="mx-2" variant="info" onClick={() => handleEditClick(specialty)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(specialty.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SpecialtyModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                specialtyName={specialtyName}
                description={description}
                handleChange={handleChange}
            />
        </div>
    );
};

export default SpecialtyList;
