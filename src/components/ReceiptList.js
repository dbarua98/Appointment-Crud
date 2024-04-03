// ReceiptList.js
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReceiptModal from './ReceiptModal';

const ReceiptList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [receipts, setReceipts] = useState([
        { id: 1, receiptNo: 'R001', receiptDate: '2024-04-03', personName: 'John Doe', totalQty: 3, netAmount: 150, remarks: 'Paid' },
        { id: 2, receiptNo: 'R002', receiptDate: '2024-04-03', personName: 'Jane Smith', totalQty: 2, netAmount: 100, remarks: 'Pending' },
        { id: 3, receiptNo: 'R003', receiptDate: '2024-04-02', personName: 'Alice Johnson', totalQty: 1, netAmount: 50, remarks: 'Paid' }
    ]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [billData, setBillData] = useState({
      billNumber: `${new Date().getFullYear()}${Math.floor(
        Math.random() * 10000
      )}`,
      billDate: new Date().toLocaleDateString("en-CA"),
      customerID: "",
      netAmount: "",
      totalDiscountAmount: "0",
      Remarks: "",
      billItems: [
        {
          descr: "",
          rate: 0,
          qty: 0,
          amount: 0,
        },
      ],
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReceipt(null);
    };

    const handleAddClick = () => {
        setSelectedReceipt(null); // Clear selected receipt
        setIsModalOpen(true);
    };

    const handleSave = (updatedReceipt) => {
      console.log('updatedReceipt', billData);
      // setReceipts({...receipts,billData})
        // if (updatedReceipt.id) {
        //     // Update existing receipt
        //     const updatedReceipts = receipts.map(item =>
        //         item.id === updatedReceipt.id ? updatedReceipt : item
        //     );
        //     setReceipts(updatedReceipts);
        // } else {
        //     // Add new receipt
        //     setReceipts([...receipts, { ...updatedReceipt, id: new Date().getTime() }]);
        // }
        handleCloseModal();
    };

    const handleEditClick = (receipt) => {
        setSelectedReceipt(receipt);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const updatedReceipts = receipts.filter(item => item.id !== id);
        setReceipts(updatedReceipts);
    };

    return (
        <div className="container" style={{ height: '100vh' }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Receipt List</h3>
                <Button variant="primary" onClick={handleAddClick}>
                    Add
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Receipt No</th>
                        <th>Receipt Date</th>
                        <th>Person Name</th>
                        <th>Total Qty</th>
                        <th>Net Amount</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.receiptNo}</td>
                            <td>{item.receiptDate}</td>
                            <td>{item.personName}</td>
                            <td>{item.totalQty}</td>
                            <td>{item.netAmount}</td>
                            <td>{item.remarks}</td>
                            <td className="d-flex">
                                <Button
                                    className="mx-2"
                                    variant="info"
                                    onClick={() => handleEditClick(item)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteClick(item.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ReceiptModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                receipt={selectedReceipt} 
                billData={billData}
                setBillData={setBillData}
            />
        </div>
    );
};

export default ReceiptList;
