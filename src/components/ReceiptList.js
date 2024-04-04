// ReceiptList.js
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReceiptModal from "./ReceiptModal";
import axios from "axios";

const ReceiptList = () => {
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [itemList,setItemList] = useState([]);

  const initialData = {
    receiptID: 0,
    receiptNo: `${new Date().getFullYear()}${Math.floor(
      Math.random() * 10000
    )}`,
    personName: "",
    receiptDate: "2024-04-03T12:47:38.383Z",
    doctorID: 14,
    netAmount: 0,
    remarks: "",
    receiptDetail: [
      {
        receiptDetailID: 0,
        receiptID: 0,
        itemID: 0,
        quantity: 0,
        rate: 0,
        discount: 0,
        amount: 0,
        itemName: "",
        unit: "",
        grossAmount: 0,
        discountPercent: 0,
      },
    ],
  }

  const [receiptData, setReceiptData] = useState(initialData);

  const fetchReceiptList = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7137/api/Receipt/GetList",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const receiptList = response.data;
      setReceipts(receiptList);
      console.log("Receipt list:", receiptList);
    } catch (error) {
      console.error("Error fetching receipt list:", error.message);
    }
  };

  const fetchItemsList=async()=>{
    try {
      const response = await axios.get('https://localhost:7137/api/Item/GetList', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const itemList = response.data;
      console.log('Item list:', itemList);
      setItemList(itemList)
    } catch (error) {
      console.error('Error fetching item list:', error.message);
    }
  }

  useEffect(() => {
    fetchReceiptList();
    fetchItemsList();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReceipt(null);
    setReceiptData(initialData)
  };

  const handleAddClick = () => {
    setSelectedReceipt(null); // Clear selected receipt
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    debugger;
    if (selectedReceipt) {
      const extractReceiptDetailItems = () => {
        const extractedItems = receiptData.receiptDetail.map((detail) => ({
          receiptDetailID: detail.receiptDetailID,
          receiptID: detail.receiptID,
          itemID: detail.itemID,
          quantity: parseInt(detail.quantity),
          rate: parseInt(detail.rate),
          discount: detail.discount,
          amount: detail.amount,
        }));

        return extractedItems;
      };
      const extractedItems = extractReceiptDetailItems();
      const updatedReceiptData = {
        receiptID: selectedReceipt.receiptID,
        receiptNo: parseInt(receiptData.receiptNo),
        receiptDate: receiptData.receiptDate,
        doctorID: 14,
        netAmount: parseInt(receiptData.netAmount),
        remarks: receiptData.remarks,
        receiptDetail: extractedItems,
      };
      try {
        const response = await axios.put(
          `https://localhost:7137/api/Receipt/Update/`,
          updatedReceiptData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        console.log("Receipt updated successfully:");
        setReceiptData(initialData)
        fetchReceiptList();
      } catch (error) {
        console.error("Error updating receipt:", error.message);
      }
    } else {
      console.log("dataAdd", receiptData);

      const extractReceiptDetailItems = () => {
        const extractedItems = receiptData.receiptDetail.map((detail) => ({
          receiptDetailID: detail.receiptDetailID,
          receiptID: detail.receiptID,
          itemID: detail.itemID,
          quantity: parseInt(detail.quantity),
          rate: parseInt(detail.rate),
          discount: detail.discount,
          amount: detail.amount,
        }));

        return extractedItems;
      };
      const extractedItems = extractReceiptDetailItems();

      const receiptAddData = {
        receiptID: 0,
        receiptNo: parseInt(receiptData.receiptNo),
        receiptDate: receiptData.receiptDate,
        doctorID: 14,
        netAmount: parseInt(receiptData.netAmount),
        remarks: receiptData.remarks,
        receiptDetail: extractedItems,
      };

      try {
        const response = await axios.post(
          "https://localhost:7137/api/Receipt/Insert",
          receiptAddData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log("Receipt inserted successfully:", data);
        setReceiptData(initialData)
        fetchReceiptList();
      } catch (error) {
        console.error("Error inserting receipt:", error.message);
        throw error;
      }
    }
    handleCloseModal();
  };

  const fetchReceiptById = async (receiptId) => {
    try {
      const response = await axios.get(
        `https://localhost:7137/api/Receipt/GetById/${receiptId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assuming the response contains receipt data
      const receiptData = response.data;
     
      setSelectedReceipt({ ...receiptData, receiptID: receiptId });
      console.log("Receiptby id data:", receiptData);
    } catch (error) {
      console.error("Error fetching receipt data:", error.message);
    }
  };

  const handleEditClick = (receipt) => {
    console.log("id recdeipt", receipt.ReceiptID);
    fetchReceiptById(receipt.ReceiptID);

    setIsModalOpen(true);
  };

  const handleDeleteClick = async(id) => {
    try {
      const response = await axios.delete(`https://localhost:7137/api/Receipt/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      console.log('Receipt deleted successfully:', data);
      fetchReceiptList();
    } catch (error) {
      console.error('Error deleting receipt:', error.message);
    }
  };

  const handleDateChange = (value) => {
    setReceiptData({ ...receiptData, receiptDate: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReceiptData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setPatientAppointmentError({
    //     ...patientAppointmentError, [name]: false
    // })
  };
  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setReceiptData((prevState) => ({
      ...prevState,
      receiptDetail: {
        ...prevState.receiptDetail,
        [name]: value,
      },
    }));
  };

//   const handleItemChange = (selectedOption) => {
//     setReceiptData({ ...receiptData});
//     // setPatientAppointmentError({...patientAppointmentError,specialityID:false})
// };
  return (
    <div className="container" style={{ height: "100vh" }}>
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
              <td>{item.ReceiptNo}</td>
              <td>{item.ReceiptDate}</td>
              <td>{item.personName}</td>
              <td>{item.totalQty}</td>
              <td>{item.NetAmount}</td>
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
                  onClick={() => handleDeleteClick(item.ReceiptID)}
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
        selectedReceipt={selectedReceipt}
        receiptData={receiptData}
        setReceiptData={setReceiptData}
        handleDateChange={handleDateChange}
        handleChange={handleChange}
        // handleItemChange={handleItemChange}
        itemList={itemList}
      />
    </div>
  );
};

export default ReceiptList;
