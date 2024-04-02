import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ItemModal from './ItemModal';

const ItemList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleSave = (itemName) => {
        if (selectedItem) {
            // Update existing item
            const updatedItems = items.map(item => {
                if (item.id === selectedItem.id) {
                    return { ...item, name: itemName };
                }
                return item;
            });
            setItems(updatedItems);
        } else {
            // Add new item
            const newItem = { id: Date.now(), name: itemName };
            setItems([...items, newItem]);
        }
        handleCloseModal();
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (itemId) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
    };

    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Item List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>
            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Item Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td className="d-flex">
                                <Button className="mx-2" variant="info" onClick={() => handleEditClick(item)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ItemModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                item={selectedItem}
            />
        </div>
    );
};

export default ItemList;
